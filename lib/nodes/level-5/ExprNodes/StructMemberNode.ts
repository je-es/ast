// StructMemberNode.ts
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node } from '../../node';
    import { FieldNode, FuncStmtNode } from '../../../ast';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ TYPE ════════════════════════════════════════╗

    export type StructMemberKind = 'Field' | 'Method';

    export type StructMemberVisibility = 'Private' | 'Public' | 'Static';

    export type StructMemeberSourceType = FuncStmtNode | FieldNode

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class StructMemberNode extends Node {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public level = 5;

            constructor(
                public span         : Span,
                public kind         : StructMemberKind,
                public source       : StructMemeberSourceType
            ) { super(); }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                const children: Node[] = [];
                if (this.source) children.push(this.source);
                return children;
            }

            clone(newSpan?: Span): StructMemberNode {
                return new StructMemberNode(
                    newSpan ?? this.span,
                    this.kind,
                    this.source,
                );
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── HELP ──────────────────────────────┐

            isField(): boolean {
                return this.kind === 'Field';
            }

            isMethod(): boolean {
                return this.kind === 'Method';
            }

            getField(): FieldNode | undefined {
                if(this.isField()) return this.source as FieldNode;
                return undefined;
            }

            getMethod(): FuncStmtNode | undefined {
                if(this.isMethod()) return this.source as FuncStmtNode;
                return undefined;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, source: StructMemeberSourceType): StructMemberNode {
                return new StructMemberNode(span, source.kind === 'Function' ? 'Method' : 'Field', source);
            }

            static createField(span: Span, structFieldNode: FieldNode): StructMemberNode {
                return new StructMemberNode(span, 'Field', structFieldNode);
            }

            static createMethod(span: Span, funcNode: FuncStmtNode): StructMemberNode {
                return new StructMemberNode(span, 'Method', funcNode);
            }

        // └────────────────────────────────────────────────────────────────────┘

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝