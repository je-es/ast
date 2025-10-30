// CatchNode.ts
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node }   from '../../node';
    import { StmtNode }     from '../../level-1/StmtNode';
    import { ExprNode }     from '../../level-2/ExprNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class CatchNode extends Node  {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public kind = 'Catch' as const;
            public level = 3;

            constructor(
                public span         : Span,
                public leftExpr     : ExprNode,
                public tag          : ExprNode | null,
                public rightStmt    : StmtNode,
            ) {
                super();
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                const children: Node[] = [];

                children.push(this.leftExpr);
                if(this.tag) { children.push(this.tag);}
                children.push(this.rightStmt);

                return children;
            }

            clone(newSpan?: Span): CatchNode {
                const cloned = new CatchNode(newSpan || this.span, this.leftExpr, this.tag, this.rightStmt);
                return cloned;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, leftExpr: ExprNode, tag: ExprNode | null, rightStmt: StmtNode): CatchNode {
                return new CatchNode(span, leftExpr, tag, rightStmt);
            }

        // └────────────────────────────────────────────────────────────────────┘
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝