// ..?
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node }   from '../../node';
    import { ExprNode }         from '../../level-2/ExprNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class ConditionalNode extends Node  {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public kind = 'Conditional' as const;
            public level = 3;

            constructor(
                public span         : Span,
                public condExpr     : ExprNode,
                public trueExpr     : ExprNode,
                public falseExpr    : ExprNode,
            ) {
                super();
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                const children: Node[] = [];

                children.push(this.condExpr);
                children.push(this.trueExpr);
                children.push(this.falseExpr);

                return children;
            }

            clone(newSpan?: Span): ConditionalNode {
                const cloned = new ConditionalNode(newSpan || this.span, this.condExpr, this.trueExpr, this.falseExpr);
                return cloned;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, condExpr: ExprNode, trueExpr: ExprNode, falseExpr: ExprNode): ConditionalNode {
                return new ConditionalNode(span, condExpr, trueExpr, falseExpr);
            }

        // └────────────────────────────────────────────────────────────────────┘
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝