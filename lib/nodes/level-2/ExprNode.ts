// ExprNode.ts
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node, DEF_SPAN }                         from '../node';
    import { StmtNode }                                     from '../level-1/StmtNode';
    import { TypeNode }                                     from './TypeNode';

    import { PrimaryNode }                                  from '../level-3/ExprNodes/PrimaryNode';
    import { PostfixNode }                                  from '../level-3/ExprNodes/PostfixNode';
    import { PrefixNode }                                   from '../level-3/ExprNodes/PrefixNode';
    import { BinaryNode }                                   from '../level-3/ExprNodes/BinaryNode';
    import { ConditionalNode }                              from '../level-3/ExprNodes/ConditionalNode';
    import { IfNode }                                       from '../level-3/ExprNodes/IfNode';
    import { MatchNode }                                    from '../level-3/ExprNodes/MatchNode';
    import { CatchNode }                                    from '../level-3/ExprNodes/CatchNode';
    import { TryNode }                                      from '../level-3/ExprNodes/TryNode';
    import { RangeNode }                                    from '../level-3/ExprNodes/RangeNode';
    import { OrelseNode }                                   from '../level-3/ExprNodes/OrelseNode';
    import { AsNode }                                       from '../level-3/ExprNodes/AsNode';

    import { LiteralNode }                                  from '../level-4/ExprNodes/LiteralNode';
    import { IdentNode }                                    from '../level-4/CommonNodes/IdentNode';
    import { ParenNode }                                    from '../level-4/ExprNodes/ParenNode';
    import { ObjectNode }                                   from '../level-4/ExprNodes/ObjectNode';
    import { ExprTupleNode }                                from '../level-4/ExprNodes/ExprTupleNode';

    import { PropNode }                                     from '../level-5/ExprNodes/PropNode';
    import { CaseNode }                                     from '../level-5/ExprNodes/CaseNode';
    import { DefaultNode }                                  from '../level-5/ExprNodes/DefaultNode';
    import { TypeofNode }                                   from '../level-3/ExprNodes/TypeofNode';
    import { SizeofNode }                                   from '../level-3/ExprNodes/SizeofNode';

    export { PropNode, CaseNode, DefaultNode };

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ TYPE ════════════════════════════════════════╗

    export type ExprKind =
    | 'Unset'           | 'Primary'     | 'Postfix'     | 'Prefix'
    | 'Binary'          | 'Cond'        | 'If'          | 'Match'
    | 'Catch'           | 'Try'         | 'Range'       | 'Orelse'
    | 'As'              | 'Typeof'      | 'Sizeof';

    export type ExprTypes =
    | PrimaryNode       | PostfixNode   | PrefixNode    | BinaryNode
    | ConditionalNode   | IfNode        | MatchNode     | CatchNode
    | TryNode           | RangeNode     | OrelseNode    | AsNode
    | TypeofNode        | SizeofNode;

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class ExprNode extends Node {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public level = 2;

            constructor(
                public kind : ExprKind,
                public span : Span,
                public data : ExprTypes,
            ) { super(); }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                return this.data.getChildrenNodes();
            }

            clone(newSpan?: Span): ExprNode {
                const cloned = new ExprNode(this.kind, newSpan ?? this.span, this.data);
                return cloned;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── HELP ──────────────────────────────┐

            getPrimary()        : PrimaryNode       | undefined     { return this.is('Primary')     ? this.data as PrimaryNode      : undefined; }
            getPostfix()        : PostfixNode       | undefined     { return this.is('Postfix')     ? this.data as PostfixNode      : undefined; }
            getPrefix()         : PrefixNode        | undefined     { return this.is('Prefix')      ? this.data as PrefixNode       : undefined; }
            getBinary()         : BinaryNode        | undefined     { return this.is('Binary')      ? this.data as BinaryNode       : undefined; }
            getConditional()    : ConditionalNode   | undefined     { return this.is('Cond')        ? this.data as ConditionalNode  : undefined; }
            getIf()             : IfNode            | undefined     { return this.is('If')          ? this.data as IfNode           : undefined; }
            getMatch()          : MatchNode         | undefined     { return this.is('Match')       ? this.data as MatchNode        : undefined; }
            getCatch()          : CatchNode         | undefined     { return this.is('Catch')       ? this.data as CatchNode        : undefined; }
            getTry()            : TryNode           | undefined     { return this.is('Try')         ? this.data as TryNode          : undefined; }
            getRange()          : RangeNode         | undefined     { return this.is('Range')       ? this.data as RangeNode        : undefined; }
            getOrelse()         : OrelseNode        | undefined     { return this.is('Orelse')      ? this.data as OrelseNode       : undefined; }
            getAs()             : AsNode            | undefined     { return this.is('As')          ? this.data as AsNode           : undefined; }

            getTypeof()         : TypeofNode        | undefined     { return this.is('Typeof')      ? this.data as TypeofNode      : undefined; }
            getSizeof()         : SizeofNode        | undefined     { return this.is('Sizeof')      ? this.data as SizeofNode      : undefined; }

            getLiteral()        : LiteralNode       | undefined     { return this.is('Primary') && this.getPrimary()!.is('Literal') ? this.getPrimary()!.getLiteral() : undefined; }
            getIdent()          : IdentNode         | undefined     { return this.is('Primary') && this.getPrimary()!.is('Ident')   ? this.getPrimary()!.getIdent()   : undefined; }
            getParen()          : ParenNode         | undefined     { return this.is('Primary') && this.getPrimary()!.is('Paren')   ? this.getPrimary()!.getParen()   : undefined; }
            getObject()         : ObjectNode        | undefined     { return this.is('Primary') && this.getPrimary()!.is('Object')  ? this.getPrimary()!.getObject()  : undefined; }
            getTuple()          : ExprTupleNode     | undefined     { return this.is('Primary') && this.getPrimary()!.is('Tuple')   ? this.getPrimary()!.getTuple()   : undefined; }
            getType()           : TypeNode          | undefined     { return this.is('Primary') && this.getPrimary()!.is('Type')    ? this.getPrimary()!.getType()    : undefined; }

            is(kind: ExprKind)  { return this.kind === kind; }
            isOrEndWith(kind: ExprKind) : boolean { return (this.is(kind) || this.isParen() && this.getParen()!.source.isOrEndWith(kind)) || false; }

            isIdent()           { return this.is('Primary') && this.getPrimary()!.is('Ident'); }
            isLiteral()         { return this.is('Primary') && this.getPrimary()!.is('Literal'); }
            isUnreachable()     { return this.is('Primary') && this.getPrimary()!.is('Unreachable'); }
            isObject()          { return this.is('Primary') && this.getPrimary()!.is('Object'); }
            isParen()           { return this.is('Primary') && this.getPrimary()!.is('Paren'); }
            isTuple()           { return this.is('Primary') && this.getPrimary()!.is('Tuple'); }
            isType()            { return this.is('Primary') && this.getPrimary()!.is('Type'); }

            isMemberAccess()    { return this.is('Postfix') && this.getPostfix()!.is('MemberAccess'); }
            isArrayAccess()     { return this.is('Postfix') && this.getPostfix()!.is('ArrayAccess'); }
            isCall()            { return this.is('Postfix') && this.getPostfix()!.is('Call'); }
            isOrelse()          { return this.is('Orelse'); }
            isAs()              { return this.is('As'); }

            isTypeof()          { return this.is('Typeof'); }
            isSizeof()          { return this.is('Sizeof'); }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            // ────────────────────────── Primary ──────────────────────────

                static asPrimary(span: Span, source: PrimaryNode) : ExprNode {
                    return new ExprNode('Primary', span, source); }

                static asLiteral(span: Span, kind: LiteralNode["kind"], value: LiteralNode["value"]) : ExprNode {
                    return ExprNode.asPrimary(span || DEF_SPAN, PrimaryNode.asLiteral(kind, span, value)); }

                static asIdent(span: Span, name: string, builtin = false) : ExprNode {
                    return ExprNode.asPrimary(span || DEF_SPAN, PrimaryNode.asIdent(span || DEF_SPAN, name, builtin)); }

                static asUnreachable(span: Span) : ExprNode {
                    return ExprNode.asPrimary(span || DEF_SPAN, PrimaryNode.asUnreachable(span || DEF_SPAN)); }

                static asType(span: Span, type: TypeNode) : ExprNode {
                    return ExprNode.asPrimary(span || DEF_SPAN, PrimaryNode.asType(span || DEF_SPAN, type)); }

                static asInteger(span: Span, value: number) : ExprNode {
                    return this.asLiteral(span || DEF_SPAN, 'Integer', value); }

                static asFloat(span: Span, value: number) : ExprNode {
                    return this.asLiteral(span || DEF_SPAN, 'Float', value); }

                static asBool(span: Span, value: boolean) : ExprNode  { return this.asLiteral(span || DEF_SPAN, 'Bool', value); }

                static asNull(span: Span) : ExprNode {
                    return this.asLiteral(span || DEF_SPAN, 'Null', null); }

                static asUndefined(span: Span) : ExprNode {
                    return this.asLiteral(span || DEF_SPAN, 'Undefined', undefined); }

                static asString(span: Span, value: string) : ExprNode {
                    return this.asLiteral(span || DEF_SPAN, 'String', value); }

                static asChar(span: Span, value: string) : ExprNode {
                    return this.asLiteral(span || DEF_SPAN, 'Character', value); }

                static asArray(span: Span, elements: ExprNode[]) : ExprNode {
                    return this.asLiteral(span || DEF_SPAN, 'Array', [...elements]); }

                static asObject(span: Span, props: PropNode[], ident?: IdentNode | undefined) : ExprNode {
                    return ExprNode.asPrimary(span || DEF_SPAN, PrimaryNode.asObject(span || DEF_SPAN, props, ident)); }

                static asParen(span:Span, expression: ExprNode) : ExprNode {
                    return ExprNode.asPrimary(span || DEF_SPAN, PrimaryNode.asParen(span || DEF_SPAN, expression)); }

                static asTuple(span:Span, fields: ExprNode[]) : ExprNode {
                    return ExprNode.asPrimary(span || DEF_SPAN, PrimaryNode.asTuple(span || DEF_SPAN, fields)); }

            // ────────────────────────── Postfix ──────────────────────────

                static asPostfix(span: Span, source: PostfixNode) : ExprNode {
                    return new ExprNode('Postfix', span, source); }

                static asPostIncrement(span: Span, base: ExprNode) : ExprNode {
                    return ExprNode.asPostfix(span || DEF_SPAN, PostfixNode.asIncrement(span || DEF_SPAN, base)); }

                static asPostDecrement(span: Span, base: ExprNode) : ExprNode {
                    return ExprNode.asPostfix(span || DEF_SPAN, PostfixNode.asDecrement(span || DEF_SPAN, base)); }

                static asDereference(span: Span, base: ExprNode) : ExprNode {
                    return ExprNode.asPostfix(span || DEF_SPAN, PostfixNode.asDereference(span || DEF_SPAN, base)); }

                static asMemberAccess(span: Span, base: ExprNode, target: ExprNode, optional = false) : ExprNode {
                    return ExprNode.asPostfix(span || DEF_SPAN, PostfixNode.asMember(span || DEF_SPAN, base, target, optional)); }

                static asCall(span: Span, base: ExprNode, args: ExprNode[]) : ExprNode {
                    return ExprNode.asPostfix(span || DEF_SPAN, PostfixNode.asCall(span || DEF_SPAN, base, args)); }

                static asArrayAccess(span: Span, base: ExprNode, index: ExprNode) : ExprNode {
                    return ExprNode.asPostfix(span || DEF_SPAN, PostfixNode.asArrayAccess(span || DEF_SPAN, base, index)); }

            // ────────────────────────── Prefix ──────────────────────────

                static asPrefix(span: Span, source: PrefixNode) : ExprNode {
                    return new ExprNode('Prefix', span, source); }

                static asPreIncrement(span: Span, base: ExprNode) : ExprNode {
                    return ExprNode.asPrefix(span || DEF_SPAN, PrefixNode.create('Increment', span, base)); }

                static asPreDecrement(span: Span, base: ExprNode) : ExprNode {
                    return ExprNode.asPrefix(span || DEF_SPAN, PrefixNode.create('Decrement', span, base)); }

                static asReference(span: Span, base: ExprNode) : ExprNode {
                    return ExprNode.asPrefix(span || DEF_SPAN, PrefixNode.create('Reference', span, base)); }

                static asUnaryMinus(span: Span, base: ExprNode) : ExprNode {
                    return ExprNode.asPrefix(span || DEF_SPAN, PrefixNode.create('UnaryMinus', span, base)); }

                static asUnaryPlus(span: Span, base: ExprNode) : ExprNode {
                    return ExprNode.asPrefix(span || DEF_SPAN, PrefixNode.create('UnaryPlus', span, base)); }

                static asLogicalNot(span: Span, base: ExprNode) : ExprNode {
                    return ExprNode.asPrefix(span || DEF_SPAN, PrefixNode.create('LogicalNot', span, base)); }

                static asxBitwiseNot(span: Span, base: ExprNode) : ExprNode {
                    return ExprNode.asPrefix(span || DEF_SPAN, PrefixNode.create('BitwiseNot', span, base)); }

            // ────────────────────────── Rest ──────────────────────────

                static asBinary(span:Span, left: ExprNode, operator: string, right: ExprNode) : ExprNode {
                    return new ExprNode('Binary', span, BinaryNode.create(span || DEF_SPAN, left, operator, right)); }

                static asConditional(span: Span, condExpr: ExprNode, trueExpr: ExprNode, falseExpr: ExprNode) : ExprNode {
                    return new ExprNode('Cond', span, ConditionalNode.create(span || DEF_SPAN, condExpr, trueExpr, falseExpr)); }

                static asIf(span: Span, condExpr: ExprNode, thenStmt: StmtNode, elseStmt: StmtNode | null) : ExprNode {
                    return new ExprNode('If', span, IfNode.create(span || DEF_SPAN, condExpr, thenStmt, elseStmt)); }

                static asMatch(span: Span, condExpr: ExprNode, cases: CaseNode[], defCase: DefaultNode | null) : ExprNode {
                    return new ExprNode('Match', span, MatchNode.create(span || DEF_SPAN, condExpr, cases, defCase)); }

                static asCatch(span: Span, leftExpr: ExprNode, tag: ExprNode | null, rightStmt: StmtNode) : ExprNode {
                    return new ExprNode('Catch', span, CatchNode.create(span || DEF_SPAN, leftExpr, tag, rightStmt)); }

                static asTry(span: Span, expr: ExprNode) : ExprNode {
                    return new ExprNode('Try', span, TryNode.create(span || DEF_SPAN, expr)); }

                static asRange(span: Span, leftExpr: ExprNode | null, rangeType: string, rightExpr: ExprNode | null) : ExprNode {
                    return new ExprNode('Range', span, RangeNode.create(span || DEF_SPAN, leftExpr, rangeType, rightExpr)); }

                static asOrelse(span: Span, left: ExprNode, right: ExprNode) : ExprNode {
                    return new ExprNode('Orelse', span, OrelseNode.create(span || DEF_SPAN, left, right)); }

                static asAs(span: Span, base: ExprNode, type: TypeNode) : ExprNode {
                    return new ExprNode('As', span, AsNode.create(span || DEF_SPAN, base, type)); }

                static asTypeof(span: Span, type: ExprNode) : ExprNode {
                    return new ExprNode('Typeof', span, TypeofNode.create(span || DEF_SPAN, type)); }

                static asSizeof(span: Span, type: ExprNode) : ExprNode {
                    return new ExprNode('Sizeof', span, SizeofNode.create(span || DEF_SPAN, type)); }

        // └────────────────────────────────────────────────────────────────────┘

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝