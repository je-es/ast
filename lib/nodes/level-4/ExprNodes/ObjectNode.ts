// ..?
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node } from '../../node';
    import { PropNode } from '../../level-5/ExprNodes/PropNode';
import { IdentNode } from '../CommonNodes/IdentNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class ObjectNode extends Node  {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public kind = 'Object' as const;
            public level = 4;

            constructor(
                public span         : Span,
                public props        : PropNode[],
                public ident        : IdentNode | undefined
            ) {
                super();
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                const children: Node[] = [];

                children.push(...this.props);

                return children;
            }

            clone(newSpan?: Span): ObjectNode {
                const cloned = new ObjectNode(newSpan || this.span, this.props, this.ident);
                return cloned;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, props: PropNode[], ident: IdentNode | undefined): ObjectNode {
                return new ObjectNode(span, props, ident);
            }

        // └────────────────────────────────────────────────────────────────────┘
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝