// ControlFlowStmtNode.ts
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node }   from '../../node';
    import { ExprNode }     from '../../level-2/ExprNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ TYPE ════════════════════════════════════════╗

    export type ControlFlowKind = 'return' | 'break' | 'continue' | 'defer' | 'throw';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class ControlFlowStmtNode extends Node {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public level = 3;

            constructor(
                public span         : Span,
                public kind         : ControlFlowKind,
                public value?       : ExprNode,
            ) { super(); }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                return this.value ? [this.value] : [];
            }

            clone(newSpan?: Span): ControlFlowStmtNode {
                return new ControlFlowStmtNode(
                    newSpan ?? this.span,
                    this.kind,
                    this.value
                );
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── IS_X ──────────────────────────────┐

            isReturn(): boolean {
                return this.kind === 'return';
            }

            isDefer(): boolean {
                return this.kind === 'defer';
            }

            isThrow(): boolean {
                return this.kind === 'throw';
            }

            isBreak(): boolean {
                return this.kind === 'break';
            }

            isContinue(): boolean {
                return this.kind === 'continue';
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static asReturn(span: Span, value?: ExprNode): ControlFlowStmtNode {
                return new ControlFlowStmtNode(span, 'return', value);
            }

            static asDefer(span: Span, value?: ExprNode): ControlFlowStmtNode {
                return new ControlFlowStmtNode(span, 'defer', value);
            }

            static asThrow(span: Span, value?: ExprNode): ControlFlowStmtNode {
                return new ControlFlowStmtNode(span, 'throw', value);
            }

            static asBreak(span: Span): ControlFlowStmtNode {
                return new ControlFlowStmtNode(span, 'break');
            }

            static asContinue(span: Span): ControlFlowStmtNode {
                return new ControlFlowStmtNode(span, 'continue');
            }

        // └────────────────────────────────────────────────────────────────────┘

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝