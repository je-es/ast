// PostfixNode.ts
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node }           from '../../node';
    import { ExprNode }             from '../../level-2/ExprNode';
    import { MemberAccessNode }     from '../../level-5/ExprNodes/MemberAccessNode';
    import { ArrayAccessNode }      from '../../level-5/ExprNodes/ArrayAccessNode';
    import { CallNode }             from '../../level-5/ExprNodes/CallNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ INIT ════════════════════════════════════════╗

    export type PostfixKind =
    | 'increment'    | 'decrement'       | 'dereference' | 'memberAccess'
    | 'call'         | 'arrayAccess';

    export type PostfixTypes = ExprNode | MemberAccessNode | ArrayAccessNode | CallNode;

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class PostfixNode extends Node  {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public level = 3;

            constructor(
                public kind         : PostfixKind,
                public span         : Span,
                public expr         : PostfixTypes,
            ) {
                super();
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                const children: Node[] = [];

                children.push(this.expr);

                return children;
            }

            clone(newSpan?: Span): PostfixNode {
                const cloned = new PostfixNode(this.kind, newSpan || this.span, this.expr);
                return cloned;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── HELP ──────────────────────────────┐

            is(kind: PostfixKind): boolean {
                return this.kind === kind;
            }

            getCall(): CallNode {
                return this.expr as CallNode;
            }

            getMemberAccess(): MemberAccessNode {
                return this.expr as MemberAccessNode;
            }

            getArrayAccess(): ArrayAccessNode {
                return this.expr as ArrayAccessNode;
            }

            getAsExprNode(): ExprNode | undefined {
                if(this.is('increment') || this.is('decrement') || this.is('dereference')) {
                    return this.expr as ExprNode;
                }

                return undefined;
            }

            toString(): string {
                switch (this.kind) {
                    case 'increment':    return `${this.expr.toString()}++`;
                    case 'decrement':    return `${this.expr.toString()}--`;
                    case 'dereference':  return `*${this.expr.toString()}`;
                    case 'memberAccess': return this.getMemberAccess().toString();
                    case 'arrayAccess':  return this.getArrayAccess().toString();
                    case 'call':         return this.getCall().toString();
                    default:             return `${this.expr.toString()}/* unknown postfix */`;
                }
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(kind: PostfixKind, span: Span, expr: PostfixTypes): PostfixNode {
                return new PostfixNode(kind, span, expr);
            }

            static asIncrement(span: Span, base: ExprNode): PostfixNode {
                return PostfixNode.create('increment', span, base);
            }

            static asDecrement(span: Span, base: ExprNode): PostfixNode {
                return PostfixNode.create('decrement', span, base);
            }

            static asDereference(span: Span, base: ExprNode): PostfixNode {
                return PostfixNode.create('dereference', span, base);
            }

            static asMember(span:Span, base: ExprNode, target: ExprNode, optional= false) : PostfixNode {
                const memberExpr = MemberAccessNode.create(span, base, target, optional);
                return PostfixNode.create('memberAccess', span, memberExpr);
            }

            static asArrayAccess(span: Span, base: ExprNode, index: ExprNode): PostfixNode {
                const arrayExpr = ArrayAccessNode.create(span, base, index);
                const node = PostfixNode.create('arrayAccess', span, arrayExpr);
                return node;
            }

            static asCall(span: Span, base: ExprNode, args: ExprNode[]): PostfixNode {
                const callExpr = CallNode.create(span, base, args);
                return PostfixNode.create('call', span, callExpr);
            }

        // └────────────────────────────────────────────────────────────────────┘
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝