// MatchNode.ts
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node }   from '../../node';
    import { ExprNode }     from '../../level-2/ExprNode';
    import { CaseNode }     from '../../level-5/ExprNodes/CaseNode';
    import { DefaultNode }  from '../../level-5/ExprNodes/DefaultNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class MatchNode extends Node  {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public kind = 'match' as const;
            public level = 3;

            constructor(
                public span         : Span,
                public condExpr     : ExprNode,
                public cases        : CaseNode[],
                public defCase      : DefaultNode | null
            ) {
                super();
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                const children: Node[] = [];

                children.push(this.condExpr);

                for (const caseItem of this.cases) {
                    children.push(...caseItem.getChildrenNodes());
                }

                if (this.defCase) {
                    children.push(...this.defCase.getChildrenNodes());
                }

                return children;
            }

            clone(newSpan?: Span): MatchNode {
                const cloned = new MatchNode(newSpan || this.span, this.condExpr, this.cases, this.defCase);
                return cloned;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, condExpr: ExprNode, cases: CaseNode[], defCase: DefaultNode | null): MatchNode {
                return new MatchNode(span, condExpr, cases, defCase);
            }

        // └────────────────────────────────────────────────────────────────────┘
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝