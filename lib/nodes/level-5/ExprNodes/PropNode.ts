// ..?
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node }   from '../../node';
    import { ExprNode }     from '../../level-2/ExprNode';
    import { IdentNode }    from '../../../ast';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class PropNode extends Node {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public kind = 'Prop' as const;
            public level = 5;

            constructor(
                public span        : Span,
                public key         : IdentNode,
                public val         : ExprNode | undefined,
            ) { super(); }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                const children: Node[] = [];

                if (this.key) {children.push(this.key);}
                if (this.val) {children.push(this.val);}

                return children;
            }

            clone(newSpan?: Span): PropNode {
                const cloned = new PropNode(newSpan ?? this.span, this.key, this.val);
                return cloned;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, key: IdentNode, val: ExprNode): PropNode {
                return new PropNode(span, key, val);
            }

        // └────────────────────────────────────────────────────────────────────┘
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝