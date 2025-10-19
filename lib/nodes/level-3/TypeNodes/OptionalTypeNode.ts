// ..?
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node }   from '../../node';
    import { TypeNode }     from '../../level-2/TypeNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class OptionalTypeNode extends Node  {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public kind = 'optional' as const;
            public level = 3;

            constructor(
                public span         : Span,
                public target       : TypeNode,
            ) {
                super();
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                return [this.target];
            }

            clone(newSpan?: Span): OptionalTypeNode {
                const cloned = new OptionalTypeNode(newSpan || this.span, this.target);
                return cloned;
            }

            toString(): string {
                return `?${this.target.toString()}`;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── HELP ──────────────────────────────┐


        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, target: TypeNode): OptionalTypeNode {
                return new OptionalTypeNode(span, target);
            }

        // └────────────────────────────────────────────────────────────────────┘
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝