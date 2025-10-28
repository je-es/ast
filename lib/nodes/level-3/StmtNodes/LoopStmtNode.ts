// LoopStmtNode.ts
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node }   from '../../node';
    import { ExprNode }     from '../../level-2/ExprNode';
    import { StmtNode }     from '../../level-1/StmtNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ TYPE ════════════════════════════════════════╗

    export type LoopKind = 'For' | 'While' | 'Do';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class LoopStmtNode extends Node {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public level = 3;

            constructor(
                public span         : Span,
                public kind         : LoopKind,
                public expr         : ExprNode,
                public stmt         : StmtNode,
            ) { super(); }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                return [this.expr, this.stmt];
            }

            clone(newSpan?: Span): LoopStmtNode {
                return new LoopStmtNode(
                    newSpan ?? this.span,
                    this.kind,
                    this.expr,
                    this.stmt
                );
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── IS_X ──────────────────────────────┐

            isFor(): boolean {
                return this.kind === 'For';
            }

            isWhile(): boolean {
                return this.kind === 'While';
            }

            isDo(): boolean {
                return this.kind === 'While';
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static createFor(span: Span, expr: ExprNode, stmt: StmtNode): LoopStmtNode {
                return new LoopStmtNode(span, 'For', expr, stmt);
            }

            static createWhile(span: Span, expr: ExprNode, stmt: StmtNode): LoopStmtNode {
                return new LoopStmtNode(span, 'While', expr, stmt);
            }

            static createDo(span: Span, expr: ExprNode, stmt: StmtNode): LoopStmtNode {
                return new LoopStmtNode(span, 'Do', expr, stmt);
            }

        // └────────────────────────────────────────────────────────────────────┘

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝