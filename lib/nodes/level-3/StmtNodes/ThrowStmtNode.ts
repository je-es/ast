// ThrowStmtNode.ts
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node }   from '../../node';
    import { ExprNode }     from '../../level-2/ExprNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class ThrowStmtNode extends Node {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public level = 3;
            public kind = 'throw' as const

            constructor(
                public span : Span,
                public expr : ExprNode
            ) { super(); }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                return [this.expr];
            }

            clone(newSpan?: Span): ThrowStmtNode {
                return new ThrowStmtNode(
                    newSpan ?? this.span,
                    this.expr
                );
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, expr: ExprNode): ThrowStmtNode {
                return new ThrowStmtNode(span, expr);
            }

        // └────────────────────────────────────────────────────────────────────┘

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝