// ..?
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node }   from '../../node';
    import { TypeNode }     from '../../level-2/TypeNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class PointerTypeNode extends Node  {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public kind = 'pointer' as const;
            public level = 3;

            constructor(
                public span         : Span,
                public target       : TypeNode,
                public mutable      : boolean
            ) {
                super();
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                return [this.target];
            }

            clone(newSpan?: Span): PointerTypeNode {
                const cloned = new PointerTypeNode(newSpan || this.span, this.target, this.mutable);
                return cloned;
            }

            toString(): string {
                return `*${this.mutable ? 'mut ' : ''}${this.target.toString()}`;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── HELP ──────────────────────────────┐


        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, target: TypeNode, mutable = false): PointerTypeNode {
                return new PointerTypeNode(span, target, mutable);
            }

        // └────────────────────────────────────────────────────────────────────┘
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝