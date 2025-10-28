// DefStmtNode.ts
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node, VisibilityInfo } from '../../node';
    import { TypeNode }         from '../../level-2/TypeNode';
    import { IdentNode }        from '../../level-4/CommonNodes/IdentNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class DefStmtNode extends Node {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public kind = 'Def' as const;
            public level = 3;

            constructor(
                public span             : Span,
                public visibility       : VisibilityInfo,
                public ident            : IdentNode,
                public type             : TypeNode,
                public documents        : string[] = [],
            ) { super(); }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                return [this.type];
            }

            clone(newSpan?: Span): DefStmtNode {
                return new DefStmtNode(
                    newSpan ?? this.span,
                    this.visibility,
                    this.ident,
                    this.type
                );
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, visibility: VisibilityInfo, ident: IdentNode, type: TypeNode, documents?: string[]): DefStmtNode {
                return new DefStmtNode(span, visibility, ident, type, documents);
            }

        // └────────────────────────────────────────────────────────────────────┘

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝