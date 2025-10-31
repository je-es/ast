// PrimaryNode.ts
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node }           from '../../node';
    import { IdentNode }            from '../../level-4/CommonNodes/IdentNode';
    import { LiteralNode, LiteralKind, LiteralValue }
                                    from '../../level-4/ExprNodes/LiteralNode';
    import { ObjectNode }           from '../../level-4/ExprNodes/ObjectNode';
    import { PropNode }             from '../../level-5/ExprNodes/PropNode';
    import { ParenNode }            from '../../level-4/ExprNodes/ParenNode';
    import { ExprNode }             from '../../level-2/ExprNode';
    import { ExprTupleNode }        from '../../../ast';
    import { TypeNode }             from '../../level-2/TypeNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ INIT ════════════════════════════════════════╗

    export type PrimaryKind = 'literal' | 'ident' | 'paren' | 'object' | 'tuple' | 'type' | 'unreachable';
    export type PrimaryTypes = IdentNode | LiteralNode | ParenNode | ObjectNode | ExprTupleNode | TypeNode;

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class PrimaryNode extends Node  {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public level = 3;

            constructor(
                public kind         : PrimaryKind,
                public span         : Span,
                public source       ?: PrimaryTypes,
            ) {
                super();
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                const children: Node[] = [];

                children.push(this.source!);

                return children;
            }

            clone(newSpan?: Span): PrimaryNode {
                const cloned = new PrimaryNode(this.kind, newSpan || this.span, this.source);
                return cloned;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── HELP ──────────────────────────────┐

            is(kind: PrimaryKind): boolean {
                return this.kind === kind;
            }

            getLiteral(): LiteralNode {
                return this.source as LiteralNode;
            }

            getIdent(): IdentNode {
                return this.source as IdentNode;
            }

            getObject(): ObjectNode {
                return this.source as ObjectNode;
            }

            getParen(): ParenNode {
                return this.source as ParenNode;
            }

            getTuple(): ExprTupleNode {
                return this.source as ExprTupleNode;
            }

            getType(): TypeNode {
                return this.source as TypeNode;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(kind: PrimaryKind, span: Span, source?: PrimaryTypes): PrimaryNode {
                // Validate
                if(kind === 'ident' && !(source instanceof IdentNode)) {
                    throw new Error(`Invalid kind for primary: ${kind}`);
                }
                if(kind === 'literal' && !(source instanceof LiteralNode)) {
                    throw new Error(`Invalid kind for primary: ${kind}`);
                }
                if(kind === 'object' && !(source instanceof ObjectNode)) {
                    throw new Error(`Invalid kind for primary: ${kind}`);
                }
                if(kind === 'paren' && !(source instanceof ParenNode)) {
                    throw new Error(`Invalid kind for primary: ${kind}`);
                }
                if(kind === 'tuple' && !(source instanceof ExprTupleNode)) {
                    throw new Error(`Invalid kind for primary: ${kind}`);
                }
                if(kind === 'type' && !(source instanceof TypeNode)) {
                    throw new Error(`Invalid kind for primary: ${kind}`);
                }

                // Create
                return new PrimaryNode(kind, span, source);
            }

            static asIdent(span:Span, name: string, builtin= false) : PrimaryNode {
                return this.create('ident', span, IdentNode.create(span, name, builtin));
            }

            static asLiteral(kind: LiteralKind, span:Span, value: LiteralValue) : PrimaryNode {
                return this.create('literal', span, LiteralNode.create(kind, span, value));
            }

            static asParen(span:Span, source: ExprNode) : PrimaryNode {
                return this.create('paren', span, ParenNode.create(span, source));
            }

            static asObject(span:Span, props: PropNode[], ident: IdentNode | undefined) : PrimaryNode {
                return this.create('object', span, ObjectNode.create(span, props, ident));
            }

            static asTuple(span:Span, exprs: ExprNode[]) : PrimaryNode {
                return this.create('tuple', span, ExprTupleNode.create(span, exprs));
            }

            static asType(span:Span, type: TypeNode) : PrimaryNode {
                return this.create('type', span, type);
            }

            static asUnreachable(span:Span) : PrimaryNode {
                return this.create('unreachable', span);
            }

        // └────────────────────────────────────────────────────────────────────┘
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝