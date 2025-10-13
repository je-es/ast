// ..?
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node } from '../../node';
    import { ExprNode } from '../../level-2/ExprNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class CallNode extends Node  {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public kind = 'Call' as const;
            public level = 5;

            constructor(
                public span         : Span,
                public base         : ExprNode,
                public args         : ExprNode[],
            ) {
                super();
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                const children: Node[] = [];

                children.push(this.base);
                children.push(...this.args);

                return children;
            }

            clone(newSpan?: Span): CallNode {
                const cloned = new CallNode(newSpan || this.span, this.base, this.args);
                return cloned;
            }

            toString(): string {
                const argsStr = this.args.map(arg => arg.toString()).join(', ');
                return `${this.base.toString()}(${argsStr})`;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, base: ExprNode, args: ExprNode[]): CallNode {
                return new CallNode(span, base, args);
            }

        // └────────────────────────────────────────────────────────────────────┘
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝