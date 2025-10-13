// ..?
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node } from '../../node';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class IdentNode extends Node {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public kind = 'Ident' as const;
            public level = 4;

            constructor(
                public span         : Span,
                public name         : string,
                public builtin      : boolean,
            ) { super(); }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                const children: Node[] = [];
                return children;
            }

            clone(newSpan?: Span): IdentNode {
                const cloned = new IdentNode(newSpan ?? this.span, this.name, this.builtin);
                return cloned;
            }

            validate(): boolean {
                return this.name.trim().length > 0;
            }

            toString(): string {
                return `${this.builtin ? '@' : ''}${this.name}`;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, name: string, builtin = false): IdentNode {
                return new IdentNode(span, name, builtin);
            }

        // └────────────────────────────────────────────────────────────────────┘

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝