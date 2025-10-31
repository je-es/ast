// IfNode.ts
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node }   from '../../node';
    import { ExprNode }     from '../../level-2/ExprNode';
    import { StmtNode }     from '../../level-1/StmtNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class IfNode extends Node  {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public kind = 'if' as const;
            public level = 3;

            constructor(
                public span         : Span,
                public condExpr     : ExprNode,
                public thenStmt     : StmtNode,
                public elseStmt     : StmtNode | null
            ) {
                super();
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                const children: Node[] = [];

                children.push(this.condExpr);
                children.push(this.thenStmt);
                if(this.elseStmt) { children.push(this.elseStmt);}

                return children;
            }

            clone(newSpan?: Span): IfNode {
                const cloned = new IfNode(newSpan || this.span, this.condExpr, this.thenStmt, this.elseStmt);
                return cloned;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, condExpr: ExprNode, thenStmt: StmtNode, elseStmt: StmtNode | null): IfNode {
                return new IfNode(span, condExpr, thenStmt, elseStmt);
            }

        // └────────────────────────────────────────────────────────────────────┘
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝