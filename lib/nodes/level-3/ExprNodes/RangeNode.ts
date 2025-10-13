// ..?
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node }   from '../../node';
    import { ExprNode }         from '../../level-2/ExprNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class RangeNode extends Node  {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public kind = 'Range' as const;
            public level = 3;

            constructor(
                public span         : Span,
                public leftExpr     : ExprNode | null,
                public rangeType    : string,
                public rightExpr    : ExprNode | null
            ) {
                super();
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                const children: Node[] = [];

                if(this.leftExpr) { children.push(this.leftExpr);}
                if(this.rightExpr) { children.push(this.rightExpr);}

                return children;
            }

            clone(newSpan?: Span): RangeNode {
                const cloned = new RangeNode(newSpan || this.span, this.leftExpr, this.rangeType, this.rightExpr);
                return cloned;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, leftExpr: ExprNode | null, rangeType: string, elseStmt: ExprNode | null): RangeNode {
                return new RangeNode(span, leftExpr, rangeType, elseStmt);
            }

        // └────────────────────────────────────────────────────────────────────┘
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝