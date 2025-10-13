// ..?
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
    | 'Increment'    | 'Decrement'       | 'Dereference' | 'MemberAccess'
    | 'Call'         | 'ArrayAccess';

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
                if(this.is('Increment') || this.is('Decrement') || this.is('Dereference')) {
                    return this.expr as ExprNode;
                }

                return undefined;
            }

            toString(): string {
                switch (this.kind) {
                    case 'Increment':    return `${this.expr.toString()}++`;
                    case 'Decrement':    return `${this.expr.toString()}--`;
                    case 'Dereference':  return `*${this.expr.toString()}`;
                    case 'MemberAccess': return this.getMemberAccess().toString();
                    case 'ArrayAccess':  return this.getArrayAccess().toString();
                    case 'Call':         return this.getCall().toString();
                    default:             return `${this.expr.toString()}/* unknown postfix */`;
                }
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(kind: PostfixKind, span: Span, expr: PostfixTypes): PostfixNode {
                return new PostfixNode(kind, span, expr);
            }

            static asIncrement(span: Span, base: ExprNode): PostfixNode {
                return PostfixNode.create('Increment', span, base);
            }

            static asDecrement(span: Span, base: ExprNode): PostfixNode {
                return PostfixNode.create('Decrement', span, base);
            }

            static asDereference(span: Span, base: ExprNode): PostfixNode {
                return PostfixNode.create('Dereference', span, base);
            }

            static asMember(span:Span, base: ExprNode, target: ExprNode, optional= false) : PostfixNode {
                const memberExpr = MemberAccessNode.create(span, base, target, optional);
                return PostfixNode.create('MemberAccess', span, memberExpr);
            }

            static asArrayAccess(span: Span, base: ExprNode, index: ExprNode): PostfixNode {
                const arrayExpr = ArrayAccessNode.create(span, base, index);
                const node = PostfixNode.create('ArrayAccess', span, arrayExpr);
                return node;
            }

            static asCall(span: Span, base: ExprNode, args: ExprNode[]): PostfixNode {
                const callExpr = CallNode.create(span, base, args);
                return PostfixNode.create('Call', span, callExpr);
            }

        // └────────────────────────────────────────────────────────────────────┘
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝