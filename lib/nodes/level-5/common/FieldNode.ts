// FieldNode.ts
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node, VisibilityKind, VisibilityInfo, MutabilityInfo, ComptimeInfo }
                                        from '../../node';
    import { ExprNode }                 from '../../level-2/ExprNode';
    import { TypeNode }                 from '../../level-2/TypeNode';
    import { IdentNode }                from '../../level-4/CommonNodes/IdentNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class FieldNode extends Node {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public level = 5;
            public kind = 'Field' as const;

            constructor(
                public span             : Span,
                public visibility       : VisibilityInfo,
                public comptime         : ComptimeInfo,
                public mutability       : MutabilityInfo,
                public ident            : IdentNode,
                public type?            : TypeNode,
                public initializer      ?: ExprNode,
                public documents        : string[] = [],
            ) { super(); }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                const children: Node[] = [];

                if (this.type)          { children.push(this.type); }
                if (this.initializer)   { children.push(this.initializer); }

                return children;
            }

            clone(newSpan?: Span): FieldNode {
                return new FieldNode(
                    newSpan ?? this.span,
                    this.visibility,
                    this.comptime,
                    this.mutability,
                    this.ident,
                    this.type,
                    this.initializer
                );
            }

            // for factory
            getField(): FieldNode {
                return this;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, visibility: VisibilityInfo, comptime: ComptimeInfo, mutability: MutabilityInfo, ident: IdentNode, type?: TypeNode, initializer?: ExprNode, documents?: string[]): FieldNode {
                return new FieldNode(span, visibility, comptime, mutability, ident, type, initializer, documents);
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── HELP ──────────────────────────────┐


        // └────────────────────────────────────────────────────────────────────┘

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝