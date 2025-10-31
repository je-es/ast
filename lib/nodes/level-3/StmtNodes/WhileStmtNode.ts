// WhileStmtNode.ts
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node }   from '../../node';
    import { ExprNode }     from '../../level-2/ExprNode';
    import { StmtNode }     from '../../level-1/StmtNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class WhileStmtNode extends Node {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public level = 3;
            public kind = 'while' as const

            constructor(
                public span : Span,
                public expr : ExprNode,
                public stmt : StmtNode,
            ) { super(); }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                return [this.expr, this.stmt];
            }

            clone(newSpan?: Span): WhileStmtNode {
                return new WhileStmtNode(
                    newSpan ?? this.span,
                    this.expr,
                    this.stmt
                );
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, expr: ExprNode, stmt: StmtNode): WhileStmtNode {
                return new WhileStmtNode(span, expr, stmt);
            }

        // └────────────────────────────────────────────────────────────────────┘

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝