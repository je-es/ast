// ..?
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node } from '../../node';
    import { ExprNode } from '../../level-2/ExprNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class MemberAccessNode extends Node  {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public kind = 'MemberAccess' as const;
            public level = 5;

            constructor(
                public span         : Span,
                public base         : ExprNode,
                public target       : ExprNode,
                public optional     : boolean
            ) {
                super();
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                const children: Node[] = [];

                children.push(this.base);
                children.push(this.target);

                return children;
            }

            clone(newSpan?: Span): MemberAccessNode {
                const cloned = new MemberAccessNode(newSpan || this.span, this.base, this.target, this.optional);
                return cloned;
            }

            toString(): string {
                return `${this.base.toString()}${this.optional ? '?.' : '.'}${this.target.toString()}`;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── HELP ──────────────────────────────┐


        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, base: ExprNode, target: ExprNode, optional= false): MemberAccessNode {
                return new MemberAccessNode(span, base, target, optional);
            }

        // └────────────────────────────────────────────────────────────────────┘
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝