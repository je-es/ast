// ..?
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node }   from '../../node';
    import { ExprNode }     from '../../level-2/ExprNode';
    import { StmtNode }         from '../../level-1/StmtNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class CaseNode extends Node  {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public kind = 'Case' as const;
            public level = 5;

            constructor(
                public span         : Span,
                public expr         : ExprNode,
                public stmt         : StmtNode | null,
                public hasBreak     : boolean | undefined
            ) {
                super();
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                const children: Node[] = [];

                children.push(this.expr);

                if(this.stmt) { children.push(this.stmt); }

                return children;
            }

            clone(newSpan?: Span): CaseNode {
                const cloned = new CaseNode(newSpan || this.span, this.expr, this.stmt, this.hasBreak);
                return cloned;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, expr: ExprNode, stmt: StmtNode | null, hasBreak: boolean | undefined = undefined): CaseNode {
                return new CaseNode(span, expr, stmt, hasBreak);
            }

        // └────────────────────────────────────────────────────────────────────┘
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝