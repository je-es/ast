// ..?
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node }   from '../../node';
    import { StmtNode }         from '../../level-1/StmtNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class DefaultNode extends Node  {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public kind = 'Default' as const;
            public level = 5;

            constructor(
                public span         : Span,
                public stmt         : StmtNode,
                public hasBreak     : boolean | undefined
            ) {
                super();
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                const children: Node[] = [];

                children.push(this.stmt);

                return children;
            }

            clone(newSpan?: Span): DefaultNode {
                const cloned = new DefaultNode(newSpan || this.span, this.stmt, this.hasBreak);
                return cloned;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, stmt: StmtNode, hasBreak: boolean | undefined = undefined): DefaultNode {
                return new DefaultNode(span, stmt, hasBreak);
            }

        // └────────────────────────────────────────────────────────────────────┘
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝