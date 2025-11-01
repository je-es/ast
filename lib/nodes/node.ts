// ..?
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ TYPE ════════════════════════════════════════╗

    export interface Span {
        start           : number;
        end             : number;
    }

    export type VisibilityKind = 'Unset' | 'Private' | 'Public' | 'Static';
    export interface VisibilityInfo {
        kind            : VisibilityKind;
        span?           : Span;
    }

    export type MutabilityKind = 'Unset' | 'Mutable' | 'Immutable';
    export interface MutabilityInfo {
        kind            : MutabilityKind;
        span?           : Span;
    }

    export type ComptimeKind = 'Unset' | 'Comptime' | 'Runtime';
    export interface ComptimeInfo {
        kind            : ComptimeKind;
        span?           : Span;
    }

    export interface NameInfo {
        name            : string;
        span            : Span;
    }

    export interface ModuleDocsInfo {
        name            : string;
        desc            : string;
        repo            : string;
        docs            : string;
        footer          : string;
    }

    export const DEF_SPAN : Span = { start: -1, end: -1 };

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export abstract class Node {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            abstract readonly level     : number;
            abstract readonly kind      : string;
            abstract readonly span      : Span;

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── FIND ──────────────────────────────┐

            // Find descendants matching predicate with proper type guard support
            findAll<U extends Node>(predicate: (node: Node) => node is U): U[];
            findAll(predicate: (node: Node) => boolean): Node[];
            findAll(predicate: (node: Node) => boolean): Node[] {
                const results: Node[] = [];
                this.traverse(node => {
                    if (predicate(node)) {results.push(node);}
                });
                return results;
            }

            // Find first descendant matching predicate with proper type guard support
            find<U extends Node>(predicate: (node: Node) => node is U): U | null;
            find(predicate: (node: Node) => boolean): Node | null;
            find(predicate: (node: Node) => boolean): Node | null {
                let result: Node | null = null;
                this.traverse(node => {
                    if (!result && predicate(node)) {
                        result = node;
                        return 'stop';
                    }
                });
                return result;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌────────────────────────────── TRAVERSE ────────────────────────────┐

            // Depth-first traversal with early termination support and enhanced error handling
            traverse(visitor: (node: Node) => void | 'stop'): void {
                try {
                    const result = visitor(this);
                    if (result === 'stop') {return;}

                    // Get children with proper error handling
                    let children: readonly Node[];
                    try {
                        children = this.getChildrenNodes();
                    } catch (error) {
                        throw new Error(`Failed to get children from ${this.kind} node: ${error}`);
                    }

                    // Validate children array
                    if (!Array.isArray(children)) {
                        throw new Error(`getChildrenNodes() returned non-array from ${this.kind} node: ${typeof children}`);
                    }

                    // Traverse each child with individual error handling
                    for (let i = 0; i < children.length; i++) {
                        const child = children[i];

                        // Validate child
                        if (!child) {
                            console.warn(`Child ${i} is null/undefined in ${this.kind} node`);
                            continue;
                        }

                        if (typeof child !== 'object') {
                            console.warn(`Child ${i} is not an object in ${this.kind} node: ${typeof child}`);
                            continue;
                        }

                        // Check if child is a proper Node
                        if (!('traverse' in child) || typeof child.traverse !== 'function') {
                            console.error(`Child ${i} (${child.constructor?.name || 'unknown'}) of ${this.kind} node is missing traverse method`);
                            console.error('Child object keys:', Object.keys(child));
                            console.error('Child prototype:', Object.getPrototypeOf(child));
                            throw new Error(`Child node ${child.constructor?.name || 'unknown'} missing traverse method`);
                        }

                        // Check if child is actually a Node instance
                        if (!(child instanceof Node)) {
                            console.error(`Child ${i} of ${this.kind} node is not a Node instance:`, child.constructor?.name);
                            throw new Error(`Child ${child.constructor?.name || 'unknown'} is not a Node instance`);
                        }

                        try {
                            child.traverse(visitor);
                        } catch (error) {
                            throw new Error(`Traversal failed at child ${i} (${child.constructor?.name || 'unknown'}) of ${this.kind} node: ${error}`);
                        }
                    }
                } catch (error) {
                    // Re-throw with context for better debugging
                    if (error instanceof Error && error.message.includes('Traversal failed')) {
                        throw error; // Already has context
                    }
                    throw new Error(`Traversal failed at ${this.kind} node: ${error}`);
                }
            }

            // Pre-order traversal (visit parent before children)
            traversePreOrder(visitor: (node: Node) => void | 'stop'): void {
                this.traverse(visitor);
            }

            // Post-order traversal (visit children before parent)
            traversePostOrder(visitor: (node: Node) => void | 'stop'): void {
                const visitPostOrder = (node: Node): void | 'stop' => {
                    // First traverse children
                    for (const child of node.getChildrenNodes()) {
                        const result = visitPostOrder(child);
                        if (result === 'stop') {return 'stop';}
                    }

                    // Then visit current node
                    return visitor(node);
                };

                visitPostOrder(this);
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── HELP ──────────────────────────────┐

            // Check if this node has any children
            hasChildren(): boolean {
                try {
                    return this.getChildrenNodes().length > 0;
                } catch {
                    return false;
                }
            }

            // Check if this node is a leaf (no children)
            isLeaf(): boolean {
                return !this.hasChildren();
            }

            // Get the depth of this node (maximum distance to any leaf)
            getDepth(): number {
                if (this.isLeaf()) {return 0;}

                let maxDepth = 0;
                try {
                    for (const child of this.getChildrenNodes()) {
                        maxDepth = Math.max(maxDepth, child.getDepth());
                    }
                } catch (error) {
                    console.warn(`Error getting depth for ${this.kind} node:`, error);
                    return 0;
                }

                return maxDepth + 1;
            }

            // Count total number of descendant nodes (including self)
            getNodeCount(): number {
                let count = 1; // Count self
                try {
                    this.traverse(node => {
                        if (node !== this) {count++;}
                    });
                } catch (error) {
                    console.warn(`Error counting nodes for ${this.kind} node:`, error);
                }
                return count;
            }

            // Get all ancestor kind's in the tree
            getNodeKinds(): Set<string> {
                const types = new Set<string>();
                try {
                    this.traverse(node => {
                        types.add(node.kind);
                    });
                } catch (error) {
                    console.warn(`Error getting node types for ${this.kind} node:`, error);
                    types.add(this.kind); // At least add this node's type
                }
                return types;
            }

            // Create a deep clone of the entire subtree
            deepClone(newSpan?: Span): Node {
                // This is a default implementation that subclasses can override for optimization
                const cloned = this.clone(newSpan);

                // Note: Subclasses should override this method to handle their specific child cloning
                // This is a fallback that just returns a shallow clone
                return cloned;
            }

            // Validation method that subclasses can override
            validate(): boolean {
                try {
                    // Basic validation: ensure all children are valid
                    const children = this.getChildrenNodes();
                    for (const child of children) {
                        if (!child || !child.validate()) {
                            return false;
                        }
                    }
                    return true;
                } catch (error) {
                    console.warn(`Validation error for ${this.kind} node:`, error);
                    return false;
                }
            }

            // Pretty print the AST structure with better error handling
            printTree(indent = 0): string {
                const spaces = '  '.repeat(indent);
                const nodeInfo = `${spaces}${this.kind} (${this.span.start}-${this.span.end})`;

                try {
                    if (this.isLeaf()) {
                        return nodeInfo;
                    }

                    const children = this.getChildrenNodes()
                        .map(child => {
                            try {
                                return child.printTree(indent + 1);
                            } catch (error) {
                                return `${spaces}  ERROR: ${child?.constructor?.name || 'unknown'} - ${error}`;
                            }
                        })
                        .join('\n');

                    return `${nodeInfo}\n${children}`;
                } catch (error) {
                    return `${nodeInfo} [ERROR: ${error}]`;
                }
            }

            // Check structural equality with another node (ignoring spans)
            structurallyEquals(other: Node): boolean {
                if (this.kind !== other.kind) {return false;}

                try {
                    const thisChildren = this.getChildrenNodes();
                    const otherChildren = other.getChildrenNodes();

                    if (thisChildren.length !== otherChildren.length) {return false;}

                    return thisChildren.every((child, index) =>
                        child.structurallyEquals(otherChildren[index])
                    );
                } catch {
                    return false;
                }
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌────────────────────────────── ABSTRACT ────────────────────────────┐

            // Get direct children (must be implemented by subclasses)
            abstract getChildrenNodes(): Node[];

            // Clone node (shallow copy with new span)
            abstract clone(newSpan?: Span): Node;

        // └────────────────────────────────────────────────────────────────────┘

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝