// ..?
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node }   from '../../node';
    import { ExprNode }     from '../../level-2/ExprNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ TYPE ════════════════════════════════════════╗

    export type LiteralKind =
    | 'Unset'         | 'Array'           | 'String'        | 'Character'
    | 'Integer'       | 'Float'           | 'Bool'          | 'Null'
    | 'Undefined';

    export type LiteralValue =
    | number          | string            | boolean       | null
    | undefined       | ExprNode[];

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class LiteralNode extends Node {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public level = 4;

            constructor(
                public kind         : LiteralKind,
                public span         : Span,
                public value        : LiteralValue,
            ) { super(); }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                const children: Node[] = [];
                if (this.kind === 'Array' && Array.isArray(this.value)) {
                    children.push(...(this.value as ExprNode[]));
                }
                return children;
            }

            clone(newSpan?: Span): LiteralNode {
                const cloned = new LiteralNode(this.kind, newSpan ?? this.span, this.value);
                return cloned;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── HHLP ──────────────────────────────┐

            is(kind: LiteralKind): boolean {
                return this.kind === kind;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(kind: LiteralKind, span: Span, value: LiteralValue): LiteralNode {
                return new LiteralNode(kind, span, value);
            }

        // └────────────────────────────────────────────────────────────────────┘

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝