interface Span {
    start: number;
    end: number;
}
type VisibilityKind = 'Unset' | 'Private' | 'Public' | 'Static';
interface VisibilityInfo {
    kind: VisibilityKind;
    span?: Span;
}
type MutabilityKind = 'Unset' | 'Mutable' | 'Immutable';
interface MutabilityInfo {
    kind: MutabilityKind;
    span?: Span;
}
type ComptimeKind = 'Unset' | 'Comptime' | 'Runtime';
interface ComptimeInfo {
    kind: ComptimeKind;
    span?: Span;
}
interface NameInfo {
    name: string;
    span: Span;
}
interface ModuleDocsInfo {
    name: string;
    desc: string;
    repo: string;
    docs: string;
    footer: string;
}
declare abstract class Node {
    abstract readonly level: number;
    abstract readonly kind: string;
    abstract readonly span: Span;
    findAll<U extends Node>(predicate: (node: Node) => node is U): U[];
    findAll(predicate: (node: Node) => boolean): Node[];
    find<U extends Node>(predicate: (node: Node) => node is U): U | null;
    find(predicate: (node: Node) => boolean): Node | null;
    traverse(visitor: (node: Node) => void | 'stop'): void;
    traversePreOrder(visitor: (node: Node) => void | 'stop'): void;
    traversePostOrder(visitor: (node: Node) => void | 'stop'): void;
    hasChildren(): boolean;
    isLeaf(): boolean;
    getDepth(): number;
    getNodeCount(): number;
    getNodeKinds(): Set<string>;
    deepClone(newSpan?: Span): Node;
    validate(): boolean;
    printTree(indent?: number): string;
    structurallyEquals(other: Node): boolean;
    abstract getChildrenNodes(): Node[];
    abstract clone(newSpan?: Span): Node;
}

declare class IdentNode extends Node {
    span: Span;
    name: string;
    builtin: boolean;
    kind: "Ident";
    level: number;
    constructor(span: Span, name: string, builtin: boolean);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): IdentNode;
    validate(): boolean;
    toString(): string;
    static create(span: Span, name: string, builtin?: boolean): IdentNode;
}

type LiteralKind = 'Unset' | 'Array' | 'String' | 'Character' | 'Integer' | 'Float' | 'Bool' | 'Null' | 'Undefined';
type LiteralValue = number | string | boolean | null | undefined | ExprNode[];
declare class LiteralNode extends Node {
    kind: LiteralKind;
    span: Span;
    value: LiteralValue;
    level: number;
    constructor(kind: LiteralKind, span: Span, value: LiteralValue);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): LiteralNode;
    is(kind: LiteralKind): boolean;
    static create(kind: LiteralKind, span: Span, value: LiteralValue): LiteralNode;
}

declare class PropNode extends Node {
    span: Span;
    key: IdentNode;
    val: ExprNode | undefined;
    kind: "Prop";
    level: number;
    constructor(span: Span, key: IdentNode, val: ExprNode | undefined);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): PropNode;
    static create(span: Span, key: IdentNode, val: ExprNode): PropNode;
}

declare class ObjectNode extends Node {
    span: Span;
    props: PropNode[];
    ident: IdentNode | undefined;
    kind: "Object";
    level: number;
    constructor(span: Span, props: PropNode[], ident: IdentNode | undefined);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): ObjectNode;
    static create(span: Span, props: PropNode[], ident: IdentNode | undefined): ObjectNode;
}

declare class ParenNode extends Node {
    span: Span;
    source: ExprNode;
    kind: "Paren";
    level: number;
    constructor(span: Span, source: ExprNode);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): ParenNode;
    static create(span: Span, source: ExprNode): ParenNode;
}

type PrimitiveKind = 'type' | 'void' | 'bool' | 'signed' | 'unsigned' | 'float' | 'und' | 'null' | 'cint' | 'cflt' | 'any' | 'err' | 'noreturn';
declare class PrimitiveTypeNode extends Node {
    kind: PrimitiveKind;
    span: Span;
    text?: string | undefined;
    width?: number | undefined;
    level: number;
    constructor(kind: PrimitiveKind, span: Span, text?: string | undefined, width?: number | undefined);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): PrimitiveTypeNode;
    toString(): string;
    is(kind: PrimitiveKind): boolean;
    isVoid(): boolean;
    isType(): boolean;
    isNull(): boolean;
    isUndefined(): boolean;
    isBool(): boolean;
    isSigned(): boolean;
    isUnsigned(): boolean;
    isFloat(): boolean;
    isInteger(): boolean;
    isComptimeInt(): boolean;
    isComptimeFloat(): boolean;
    isNumeric(): boolean;
    isAny(): boolean;
    isErr(): boolean;
    isNoreturn(): boolean;
    static calcWidth(prefix: string, text: string): number;
    static create(kind: PrimitiveKind, span: Span, text?: string, width?: number): PrimitiveTypeNode;
    static asVoid(span?: Span): PrimitiveTypeNode;
    static asType(span?: Span): PrimitiveTypeNode;
    static asNull(span?: Span): PrimitiveTypeNode;
    static asUndefined(span?: Span): PrimitiveTypeNode;
    static asAny(span?: Span): PrimitiveTypeNode;
    static asErr(span?: Span, text?: string): PrimitiveTypeNode;
    static asBool(span?: Span): PrimitiveTypeNode;
    static asSigned(span?: Span, text?: string, width?: number): PrimitiveTypeNode;
    static asUnsigned(span?: Span, text?: string, width?: number): PrimitiveTypeNode;
    static asFloat(span?: Span, text?: string, width?: number): PrimitiveTypeNode;
    static asComptimeInt(span?: Span, text?: string): PrimitiveTypeNode;
    static asComptimeFloat(span?: Span, text?: string): PrimitiveTypeNode;
    static asNoreturn(span?: Span): PrimitiveTypeNode;
}

declare class OptionalTypeNode extends Node {
    span: Span;
    target: TypeNode;
    kind: "optional";
    level: number;
    constructor(span: Span, target: TypeNode);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): OptionalTypeNode;
    toString(): string;
    static create(span: Span, target: TypeNode): OptionalTypeNode;
}

declare class PointerTypeNode extends Node {
    span: Span;
    target: TypeNode;
    mutable: boolean;
    kind: "pointer";
    level: number;
    constructor(span: Span, target: TypeNode, mutable: boolean);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): PointerTypeNode;
    toString(): string;
    static create(span: Span, target: TypeNode, mutable?: boolean): PointerTypeNode;
}

declare class ArrayTypeNode extends Node {
    span: Span;
    target: TypeNode;
    size: ExprNode | undefined;
    mutable: boolean;
    kind: "array";
    level: number;
    constructor(span: Span, target: TypeNode, size: ExprNode | undefined, mutable: boolean);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): ArrayTypeNode;
    toString(): string;
    isU8Array(): boolean;
    isU16Array(): boolean;
    isU32Array(): boolean;
    static create(span: Span, target: TypeNode, size?: ExprNode, mutable?: boolean): ArrayTypeNode;
}

declare class TupleTypeNode extends Node {
    span: Span;
    fields: TypeNode[];
    kind: "tuple";
    level: number;
    constructor(span: Span, fields: TypeNode[]);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): TupleTypeNode;
    toString(): string;
    static create(span: Span, fields: TypeNode[]): TupleTypeNode;
}

declare class FunctionTypeNode extends Node {
    span: Span;
    params: TypeNode[];
    returnType: TypeNode | undefined;
    errorType: TypeNode | undefined;
    kind: "function";
    level: number;
    constructor(span: Span, params: TypeNode[], returnType: TypeNode | undefined, errorType: TypeNode | undefined);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): FunctionTypeNode;
    toString(): string;
    static create(span: Span, params: TypeNode[], returnType?: TypeNode, errorType?: TypeNode): FunctionTypeNode;
}

declare class StructTypeNode extends Node {
    span: Span;
    members: StructMemberNode[];
    name: string;
    metadata: Record<string, unknown>;
    kind: "struct";
    level: number;
    constructor(span: Span, members: StructMemberNode[], name: string | undefined, metadata: Record<string, unknown>);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): StructTypeNode;
    toString(): string;
    static create(span: Span, members: StructMemberNode[], name?: string, metadata?: Record<string, unknown>): StructTypeNode;
}

declare class EnumTypeNode extends Node {
    span: Span;
    variants: EnumVariantNode[];
    name: string;
    metadata: Record<string, unknown>;
    kind: "enum";
    level: number;
    constructor(span: Span, variants: EnumVariantNode[], name: string | undefined, metadata: Record<string, unknown>);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): EnumTypeNode;
    toString(): string;
    static create(span: Span, variants: EnumVariantNode[], name?: string, metadata?: Record<string, unknown>): EnumTypeNode;
}

declare class UnionTypeNode extends Node {
    span: Span;
    types: TypeNode[];
    kind: "union";
    level: number;
    constructor(span: Span, types: TypeNode[]);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): UnionTypeNode;
    toString(): string;
    static create(span: Span, types: TypeNode[]): UnionTypeNode;
}

type StructMemberKind = 'Field' | 'Method';
type StructMemeberSourceType = FuncStmtNode | FieldNode;
declare class StructMemberNode extends Node {
    span: Span;
    kind: StructMemberKind;
    source: StructMemeberSourceType;
    level: number;
    constructor(span: Span, kind: StructMemberKind, source: StructMemeberSourceType);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): StructMemberNode;
    isField(): boolean;
    isMethod(): boolean;
    getField(): FieldNode | undefined;
    getMethod(): FuncStmtNode | undefined;
    static create(span: Span, source: StructMemeberSourceType): StructMemberNode;
    static createField(span: Span, structFieldNode: FieldNode): StructMemberNode;
    static createMethod(span: Span, funcNode: FuncStmtNode): StructMemberNode;
}

declare class EnumVariantNode extends Node {
    span: Span;
    ident: IdentNode;
    type?: TypeNode | undefined;
    kind: "EnumVariant";
    level: number;
    constructor(span: Span, ident: IdentNode, type?: TypeNode | undefined);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): EnumVariantNode;
    hasType(): boolean;
    isUnit(): boolean;
    static create(span: Span, ident: IdentNode, type?: TypeNode): EnumVariantNode;
}

declare class ErrsetTypeNode extends Node {
    span: Span;
    members: NameInfo[];
    kind: "errset";
    level: number;
    constructor(span: Span, members: NameInfo[]);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): ErrsetTypeNode;
    toString(): string;
    static create(span: Span, members: NameInfo[]): ErrsetTypeNode;
}

declare class ParenTypeNode extends Node {
    span: Span;
    type: TypeNode;
    kind: "paren";
    level: number;
    constructor(span: Span, type: TypeNode);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): ParenTypeNode;
    toString(): string;
    static create(span: Span, type: TypeNode): ParenTypeNode;
}

type TypeKind = 'unset' | 'primitive' | 'ident' | 'pointer' | 'array' | 'tuple' | 'function' | 'optional' | 'struct' | 'enum' | 'union' | 'errset' | 'paren';
type UnsetSource = null;
type TypeTypes = UnsetSource | PrimitiveTypeNode | IdentNode | OptionalTypeNode | PointerTypeNode | ArrayTypeNode | TupleTypeNode | FunctionTypeNode | StructTypeNode | EnumTypeNode | UnionTypeNode | ErrsetTypeNode | ParenTypeNode;
declare class TypeNode extends Node {
    span: Span;
    kind: TypeKind;
    source: TypeTypes;
    level: number;
    constructor(span: Span, kind: TypeKind, source: TypeTypes);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): TypeNode;
    toString(): string;
    is(kind: TypeKind): boolean;
    isPrimitive(): boolean;
    isVoid(): boolean;
    isType(): boolean;
    isNull(): boolean;
    isUndefined(): boolean;
    isAny(): boolean;
    isErr(): boolean;
    isSigned(): boolean;
    isUnsigned(): boolean;
    isComptimeInt(): boolean;
    isInteger(): boolean;
    isComptimeFloat(): boolean;
    isFloat(): boolean;
    isNumeric(): boolean;
    isBool(): boolean;
    isNoreturn(): boolean;
    isIdent(): boolean;
    isPointer(): boolean;
    isOptional(): boolean;
    isArray(): boolean;
    isU8Array(): boolean;
    isU16Array(): boolean;
    isU32Array(): boolean;
    isTuple(): boolean;
    isFunction(): boolean;
    isStruct(): boolean;
    isErrset(): boolean;
    isEnum(): boolean;
    isUnion(): boolean;
    isParen(): boolean;
    getPrimitive(): PrimitiveTypeNode | undefined;
    getOptional(): OptionalTypeNode | undefined;
    getPointer(): PointerTypeNode | undefined;
    getArray(): ArrayTypeNode | undefined;
    getTuple(): TupleTypeNode | undefined;
    getFunction(): FunctionTypeNode | undefined;
    getStruct(): StructTypeNode | undefined;
    getErrset(): ErrsetTypeNode | undefined;
    getEnum(): EnumTypeNode | undefined;
    getUnion(): UnionTypeNode | undefined;
    getParen(): ParenTypeNode | undefined;
    getIdent(): IdentNode | undefined;
    getErrName(): string | undefined;
    getErrSpan(): Span | undefined;
    getWidth(): number | undefined;
    static asUnset(span?: Span): TypeNode;
    static asPrimitive(span: Span | undefined, kind: PrimitiveKind, text?: string, width?: number): TypeNode;
    static asVoid(span?: Span): TypeNode;
    static asBool(span?: Span): TypeNode;
    static asSigned(span: Span | undefined, text: string, width?: number): TypeNode;
    static asUnsigned(span: Span | undefined, text: string, width?: number): TypeNode;
    static asFloat(span: Span | undefined, text: string, width?: number): TypeNode;
    static asNull(span?: Span): TypeNode;
    static asUndefined(span?: Span): TypeNode;
    static asAny(span?: Span): TypeNode;
    static asErr(span?: Span, text?: string): TypeNode;
    static asType(span?: Span): TypeNode;
    static asComptimeInt(span: Span | undefined, text: string): TypeNode;
    static asComptimeFloat(span: Span | undefined, text: string): TypeNode;
    static asNoreturn(span?: Span): TypeNode;
    static asIdentifier(span: Span | undefined, name: string): TypeNode;
    static asPointer(span: Span | undefined, target: TypeNode, mutable?: boolean): TypeNode;
    static asOptional(span: Span | undefined, target: TypeNode): TypeNode;
    static asArray(span: Span | undefined, target: TypeNode, size?: ExprNode, mutable?: boolean): TypeNode;
    static asU8Array(span: Span | undefined, mutable?: boolean): TypeNode;
    static asU16Array(span: Span | undefined, mutable?: boolean): TypeNode;
    static asU32Array(span: Span | undefined, mutable?: boolean): TypeNode;
    static asTuple(span: Span | undefined, fields: TypeNode[]): TypeNode;
    static asFunction(span: Span | undefined, params: TypeNode[], returnType?: TypeNode, errorType?: TypeNode): TypeNode;
    static asErrset(span: Span | undefined, members: NameInfo[]): TypeNode;
    static asStruct(span: Span | undefined, members: StructMemberNode[], name?: string): TypeNode;
    static asEnum(span: Span | undefined, variants: EnumVariantNode[], name?: string): TypeNode;
    static asUnion(span: Span | undefined, types: TypeNode[]): TypeNode;
    static asParen(span: Span | undefined, type: TypeNode): TypeNode;
}

type PrimaryKind = 'literal' | 'ident' | 'paren' | 'object' | 'tuple' | 'type' | 'unreachable';
type PrimaryTypes = IdentNode | LiteralNode | ParenNode | ObjectNode | ExprTupleNode | TypeNode;
declare class PrimaryNode extends Node {
    kind: PrimaryKind;
    span: Span;
    source?: PrimaryTypes | undefined;
    level: number;
    constructor(kind: PrimaryKind, span: Span, source?: PrimaryTypes | undefined);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): PrimaryNode;
    is(kind: PrimaryKind): boolean;
    getLiteral(): LiteralNode;
    getIdent(): IdentNode;
    getObject(): ObjectNode;
    getParen(): ParenNode;
    getTuple(): ExprTupleNode;
    getType(): TypeNode;
    static create(kind: PrimaryKind, span: Span, source?: PrimaryTypes): PrimaryNode;
    static asIdent(span: Span, name: string, builtin?: boolean): PrimaryNode;
    static asLiteral(kind: LiteralKind, span: Span, value: LiteralValue): PrimaryNode;
    static asParen(span: Span, source: ExprNode): PrimaryNode;
    static asObject(span: Span, props: PropNode[], ident: IdentNode | undefined): PrimaryNode;
    static asTuple(span: Span, exprs: ExprNode[]): PrimaryNode;
    static asType(span: Span, type: TypeNode): PrimaryNode;
    static asUnreachable(span: Span): PrimaryNode;
}

declare class MemberAccessNode extends Node {
    span: Span;
    base: ExprNode;
    target: ExprNode;
    optional: boolean;
    kind: "MemberAccess";
    level: number;
    constructor(span: Span, base: ExprNode, target: ExprNode, optional: boolean);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): MemberAccessNode;
    toString(): string;
    static create(span: Span, base: ExprNode, target: ExprNode, optional?: boolean): MemberAccessNode;
}

declare class ArrayAccessNode extends Node {
    span: Span;
    base: ExprNode;
    index: ExprNode;
    kind: "ArrayAccess";
    level: number;
    constructor(span: Span, base: ExprNode, index: ExprNode);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): ArrayAccessNode;
    toString(): string;
    static create(span: Span, base: ExprNode, index: ExprNode): ArrayAccessNode;
}

declare class CallNode extends Node {
    span: Span;
    base: ExprNode;
    args: ExprNode[];
    kind: "Call";
    level: number;
    constructor(span: Span, base: ExprNode, args: ExprNode[]);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): CallNode;
    toString(): string;
    static create(span: Span, base: ExprNode, args: ExprNode[]): CallNode;
}

type PostfixKind = 'increment' | 'decrement' | 'dereference' | 'memberAccess' | 'call' | 'arrayAccess';
type PostfixTypes = ExprNode | MemberAccessNode | ArrayAccessNode | CallNode;
declare class PostfixNode extends Node {
    kind: PostfixKind;
    span: Span;
    expr: PostfixTypes;
    level: number;
    constructor(kind: PostfixKind, span: Span, expr: PostfixTypes);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): PostfixNode;
    is(kind: PostfixKind): boolean;
    getCall(): CallNode;
    getMemberAccess(): MemberAccessNode;
    getArrayAccess(): ArrayAccessNode;
    getAsExprNode(): ExprNode | undefined;
    toString(): string;
    static create(kind: PostfixKind, span: Span, expr: PostfixTypes): PostfixNode;
    static asIncrement(span: Span, base: ExprNode): PostfixNode;
    static asDecrement(span: Span, base: ExprNode): PostfixNode;
    static asDereference(span: Span, base: ExprNode): PostfixNode;
    static asMember(span: Span, base: ExprNode, target: ExprNode, optional?: boolean): PostfixNode;
    static asArrayAccess(span: Span, base: ExprNode, index: ExprNode): PostfixNode;
    static asCall(span: Span, base: ExprNode, args: ExprNode[]): PostfixNode;
}

type PrefixKind = 'increment' | 'decrement' | 'reference' | 'unaryMinus' | 'unaryPlus' | 'logicalNot' | 'bitwiseNot';
declare class PrefixNode extends Node {
    kind: PrefixKind;
    span: Span;
    expr: ExprNode;
    level: number;
    constructor(kind: PrefixKind, span: Span, expr: ExprNode);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): PrefixNode;
    is(kind: PrefixKind): boolean;
    static create(kind: PrefixKind, span: Span, expr: ExprNode): PrefixNode;
}

type BinaryKind = 'unset' | 'power' | 'additive' | 'multiplicative' | 'shift' | 'relational' | 'equality' | 'bitwise' | 'logical' | 'bitwiseAnd' | 'bitwiseOr' | 'bitwiseXor' | 'logicalAnd' | 'logicalOr' | 'conditional' | 'assignment';
declare class BinaryNode extends Node {
    kind: BinaryKind;
    span: Span;
    left: ExprNode;
    operator: string;
    right: ExprNode;
    level: number;
    constructor(kind: BinaryKind, span: Span, left: ExprNode, operator: string, right: ExprNode);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): BinaryNode;
    is(kind: BinaryKind): boolean;
    static create(span: Span, left: ExprNode, operator: string, right: ExprNode): BinaryNode;
}

declare class ConditionalNode extends Node {
    span: Span;
    condExpr: ExprNode;
    trueExpr: ExprNode;
    falseExpr: ExprNode;
    kind: "conditional";
    level: number;
    constructor(span: Span, condExpr: ExprNode, trueExpr: ExprNode, falseExpr: ExprNode);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): ConditionalNode;
    static create(span: Span, condExpr: ExprNode, trueExpr: ExprNode, falseExpr: ExprNode): ConditionalNode;
}

declare class IfNode extends Node {
    span: Span;
    condExpr: ExprNode;
    thenStmt: StmtNode;
    elseStmt: StmtNode | null;
    kind: "if";
    level: number;
    constructor(span: Span, condExpr: ExprNode, thenStmt: StmtNode, elseStmt: StmtNode | null);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): IfNode;
    static create(span: Span, condExpr: ExprNode, thenStmt: StmtNode, elseStmt: StmtNode | null): IfNode;
}

declare class CaseNode extends Node {
    span: Span;
    expr: ExprNode;
    stmt: StmtNode | null;
    hasBreak: boolean | undefined;
    kind: "Case";
    level: number;
    constructor(span: Span, expr: ExprNode, stmt: StmtNode | null, hasBreak: boolean | undefined);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): CaseNode;
    static create(span: Span, expr: ExprNode, stmt: StmtNode | null, hasBreak?: boolean | undefined): CaseNode;
}

declare class DefaultNode extends Node {
    span: Span;
    stmt: StmtNode;
    hasBreak: boolean | undefined;
    kind: "Default";
    level: number;
    constructor(span: Span, stmt: StmtNode, hasBreak: boolean | undefined);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): DefaultNode;
    static create(span: Span, stmt: StmtNode, hasBreak?: boolean | undefined): DefaultNode;
}

declare class MatchNode extends Node {
    span: Span;
    condExpr: ExprNode;
    cases: CaseNode[];
    defCase: DefaultNode | null;
    kind: "match";
    level: number;
    constructor(span: Span, condExpr: ExprNode, cases: CaseNode[], defCase: DefaultNode | null);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): MatchNode;
    static create(span: Span, condExpr: ExprNode, cases: CaseNode[], defCase: DefaultNode | null): MatchNode;
}

declare class CatchNode extends Node {
    span: Span;
    leftExpr: ExprNode;
    tag: ExprNode | null;
    rightStmt: StmtNode;
    kind: "catch";
    level: number;
    constructor(span: Span, leftExpr: ExprNode, tag: ExprNode | null, rightStmt: StmtNode);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): CatchNode;
    static create(span: Span, leftExpr: ExprNode, tag: ExprNode | null, rightStmt: StmtNode): CatchNode;
}

declare class TryNode extends Node {
    span: Span;
    expr: ExprNode;
    kind: "try";
    level: number;
    constructor(span: Span, expr: ExprNode);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): TryNode;
    static create(span: Span, leftExpr: ExprNode): TryNode;
}

declare class RangeNode extends Node {
    span: Span;
    leftExpr: ExprNode | null;
    rangeType: string;
    rightExpr: ExprNode | null;
    kind: "range";
    level: number;
    constructor(span: Span, leftExpr: ExprNode | null, rangeType: string, rightExpr: ExprNode | null);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): RangeNode;
    static create(span: Span, leftExpr: ExprNode | null, rangeType: string, elseStmt: ExprNode | null): RangeNode;
}

declare class OrelseNode extends Node {
    span: Span;
    left: ExprNode;
    right: ExprNode;
    level: number;
    kind: string;
    constructor(span: Span, left: ExprNode, right: ExprNode);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): OrelseNode;
    static create(span: Span, left: ExprNode, right: ExprNode): OrelseNode;
}

declare class AsNode extends Node {
    span: Span;
    base: ExprNode;
    type: TypeNode;
    level: number;
    kind: string;
    constructor(span: Span, base: ExprNode, type: TypeNode);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): AsNode;
    static create(span: Span, left: ExprNode, type: TypeNode): AsNode;
}

declare class ExprTupleNode extends Node {
    span: Span;
    fields: ExprNode[];
    kind: "Tuple";
    level: number;
    constructor(span: Span, fields: ExprNode[]);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): ExprTupleNode;
    toString(): string;
    static create(span: Span, fields: ExprNode[]): ExprTupleNode;
}

declare class TypeofNode extends Node {
    span: Span;
    expr: ExprNode;
    level: number;
    kind: string;
    constructor(span: Span, expr: ExprNode);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): TypeofNode;
    static create(span: Span, expr: ExprNode): TypeofNode;
}

declare class SizeofNode extends Node {
    span: Span;
    expr: ExprNode;
    level: number;
    kind: string;
    constructor(span: Span, expr: ExprNode);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): SizeofNode;
    static create(span: Span, expr: ExprNode): SizeofNode;
}

type ExprKind = 'unset' | 'primary' | 'postfix' | 'prefix' | 'binary' | 'cond' | 'if' | 'match' | 'catch' | 'try' | 'range' | 'orelse' | 'as' | 'typeof' | 'sizeof';
type ExprTypes = PrimaryNode | PostfixNode | PrefixNode | BinaryNode | ConditionalNode | IfNode | MatchNode | CatchNode | TryNode | RangeNode | OrelseNode | AsNode | TypeofNode | SizeofNode;
declare class ExprNode extends Node {
    kind: ExprKind;
    span: Span;
    data: ExprTypes;
    inferredType?: TypeNode | undefined;
    level: number;
    constructor(kind: ExprKind, span: Span, data: ExprTypes, inferredType?: TypeNode | undefined);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): ExprNode;
    getPrimary(): PrimaryNode | undefined;
    getPostfix(): PostfixNode | undefined;
    getPrefix(): PrefixNode | undefined;
    getBinary(): BinaryNode | undefined;
    getConditional(): ConditionalNode | undefined;
    getIf(): IfNode | undefined;
    getMatch(): MatchNode | undefined;
    getCatch(): CatchNode | undefined;
    getTry(): TryNode | undefined;
    getRange(): RangeNode | undefined;
    getOrelse(): OrelseNode | undefined;
    getAs(): AsNode | undefined;
    getTypeof(): TypeofNode | undefined;
    getSizeof(): SizeofNode | undefined;
    getLiteral(): LiteralNode | undefined;
    getIdent(): IdentNode | undefined;
    getParen(): ParenNode | undefined;
    getObject(): ObjectNode | undefined;
    getTuple(): ExprTupleNode | undefined;
    getType(): TypeNode | undefined;
    is(kind: ExprKind): boolean;
    isOrEndWith(kind: ExprKind): boolean;
    isIdent(): boolean;
    isLiteral(): boolean;
    isUnreachable(): boolean;
    isObject(): boolean;
    isParen(): boolean;
    isTuple(): boolean;
    isType(): boolean;
    isMemberAccess(): boolean;
    isArrayAccess(): boolean;
    isCall(): boolean;
    isOrelse(): boolean;
    isAs(): boolean;
    isTypeof(): boolean;
    isSizeof(): boolean;
    static asPrimary(span: Span, source: PrimaryNode): ExprNode;
    static asLiteral(span: Span, kind: LiteralNode["kind"], value: LiteralNode["value"]): ExprNode;
    static asIdent(span: Span, name: string, builtin?: boolean): ExprNode;
    static asUnreachable(span: Span): ExprNode;
    static asType(span: Span, type: TypeNode): ExprNode;
    static asInteger(span: Span, value: number): ExprNode;
    static asFloat(span: Span, value: number): ExprNode;
    static asBool(span: Span, value: boolean): ExprNode;
    static asNull(span: Span): ExprNode;
    static asUndefined(span: Span): ExprNode;
    static asString(span: Span, value: string): ExprNode;
    static asChar(span: Span, value: string): ExprNode;
    static asArray(span: Span, elements: ExprNode[]): ExprNode;
    static asObject(span: Span, props: PropNode[], ident?: IdentNode | undefined): ExprNode;
    static asParen(span: Span, expression: ExprNode): ExprNode;
    static asTuple(span: Span, fields: ExprNode[]): ExprNode;
    static asPostfix(span: Span, source: PostfixNode): ExprNode;
    static asPostIncrement(span: Span, base: ExprNode): ExprNode;
    static asPostDecrement(span: Span, base: ExprNode): ExprNode;
    static asDereference(span: Span, base: ExprNode): ExprNode;
    static asMemberAccess(span: Span, base: ExprNode, target: ExprNode, optional?: boolean): ExprNode;
    static asCall(span: Span, base: ExprNode, args: ExprNode[]): ExprNode;
    static asArrayAccess(span: Span, base: ExprNode, index: ExprNode): ExprNode;
    static asPrefix(span: Span, source: PrefixNode): ExprNode;
    static asPreIncrement(span: Span, base: ExprNode): ExprNode;
    static asPreDecrement(span: Span, base: ExprNode): ExprNode;
    static asReference(span: Span, base: ExprNode): ExprNode;
    static asUnaryMinus(span: Span, base: ExprNode): ExprNode;
    static asUnaryPlus(span: Span, base: ExprNode): ExprNode;
    static asLogicalNot(span: Span, base: ExprNode): ExprNode;
    static asxBitwiseNot(span: Span, base: ExprNode): ExprNode;
    static asBinary(span: Span, left: ExprNode, operator: string, right: ExprNode): ExprNode;
    static asConditional(span: Span, condExpr: ExprNode, trueExpr: ExprNode, falseExpr: ExprNode): ExprNode;
    static asIf(span: Span, condExpr: ExprNode, thenStmt: StmtNode, elseStmt: StmtNode | null): ExprNode;
    static asMatch(span: Span, condExpr: ExprNode, cases: CaseNode[], defCase: DefaultNode | null): ExprNode;
    static asCatch(span: Span, leftExpr: ExprNode, tag: ExprNode | null, rightStmt: StmtNode): ExprNode;
    static asTry(span: Span, expr: ExprNode): ExprNode;
    static asRange(span: Span, leftExpr: ExprNode | null, rangeType: string, rightExpr: ExprNode | null): ExprNode;
    static asOrelse(span: Span, left: ExprNode, right: ExprNode): ExprNode;
    static asAs(span: Span, base: ExprNode, type: TypeNode): ExprNode;
    static asTypeof(span: Span, type: ExprNode): ExprNode;
    static asSizeof(span: Span, type: ExprNode): ExprNode;
}

declare class BlockStmtNode extends Node {
    span: Span;
    stmts: StmtNode[];
    kind: "block";
    level: number;
    constructor(span: Span, stmts: StmtNode[]);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): BlockStmtNode;
    static create(span: Span, stmts?: StmtNode[]): BlockStmtNode;
}

declare class SectionStmtNode extends Node {
    span: Span;
    name: NameInfo;
    indent: number;
    stmts: StmtNode[];
    kind: "Section";
    level: number;
    constructor(span: Span, name: NameInfo, indent: number, stmts: StmtNode[]);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): SectionStmtNode;
    static create(span: Span, name: NameInfo, indent: number, stmts?: StmtNode[]): SectionStmtNode;
}

declare class LetStmtNode extends Node {
    span: Span;
    field: FieldNode;
    documents: string[];
    kind: "Let";
    level: number;
    constructor(span: Span, field: FieldNode, documents?: string[]);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): LetStmtNode;
    getField(): FieldNode;
    static create(span: Span, visibility: VisibilityInfo, comptime: ComptimeInfo, mutability: MutabilityInfo, ident: IdentNode, type?: TypeNode, initializer?: ExprNode, documents?: string[]): LetStmtNode;
}

declare class FieldNode extends Node {
    span: Span;
    visibility: VisibilityInfo;
    comptime: ComptimeInfo;
    mutability: MutabilityInfo;
    ident: IdentNode;
    type?: TypeNode | undefined;
    initializer?: ExprNode | undefined;
    documents: string[];
    level: number;
    kind: "Field";
    constructor(span: Span, visibility: VisibilityInfo, comptime: ComptimeInfo, mutability: MutabilityInfo, ident: IdentNode, type?: TypeNode | undefined, initializer?: ExprNode | undefined, documents?: string[]);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): FieldNode;
    getField(): FieldNode;
    static create(span: Span, visibility: VisibilityInfo, comptime: ComptimeInfo, mutability: MutabilityInfo, ident: IdentNode, type?: TypeNode, initializer?: ExprNode, documents?: string[]): FieldNode;
}

declare class FuncStmtNode extends Node {
    span: Span;
    visibility: VisibilityInfo;
    comptime: ComptimeInfo;
    isInline: boolean;
    ident: IdentNode;
    parameters: FieldNode[];
    body: StmtNode;
    errorType?: TypeNode | undefined;
    returnType?: TypeNode | undefined;
    documents: string[];
    kind: "Function";
    level: number;
    constructor(span: Span, visibility: VisibilityInfo, comptime: ComptimeInfo, isInline: boolean, ident: IdentNode, parameters: FieldNode[], body: StmtNode, errorType?: TypeNode | undefined, returnType?: TypeNode | undefined, documents?: string[]);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): FuncStmtNode;
    static create(span: Span, visibility: VisibilityInfo, comptime: ComptimeInfo, isInline: boolean, ident: IdentNode, parameters: FieldNode[], body: StmtNode, errorType?: TypeNode, returnType?: TypeNode, documents?: string[]): FuncStmtNode;
}

declare class UseStmtNode extends Node {
    span: Span;
    visibility: VisibilityInfo;
    targetArr: IdentNode[] | undefined;
    alias?: IdentNode | undefined;
    path?: string | undefined;
    pathSpan?: Span | undefined;
    documents: string[];
    kind: "Use";
    level: number;
    constructor(span: Span, visibility: VisibilityInfo, targetArr: IdentNode[] | undefined, alias?: IdentNode | undefined, path?: string | undefined, pathSpan?: Span | undefined, documents?: string[]);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): UseStmtNode;
    static create(span: Span, visibility: VisibilityInfo, targetArr: IdentNode[] | undefined, alias?: IdentNode, path?: string, pathSpan?: Span, documents?: string[]): UseStmtNode;
    isAllModule(): boolean;
}

declare class DefStmtNode extends Node {
    span: Span;
    visibility: VisibilityInfo;
    ident: IdentNode;
    type: TypeNode;
    documents: string[];
    kind: "Def";
    level: number;
    constructor(span: Span, visibility: VisibilityInfo, ident: IdentNode, type: TypeNode, documents?: string[]);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): DefStmtNode;
    static create(span: Span, visibility: VisibilityInfo, ident: IdentNode, type: TypeNode, documents?: string[]): DefStmtNode;
}

declare class ForStmtNode extends Node {
    span: Span;
    expr: ExprNode;
    stmt: StmtNode;
    level: number;
    kind: "for";
    constructor(span: Span, expr: ExprNode, stmt: StmtNode);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): ForStmtNode;
    static create(span: Span, expr: ExprNode, stmt: StmtNode): ForStmtNode;
}

declare class WhileStmtNode extends Node {
    span: Span;
    expr: ExprNode;
    stmt: StmtNode;
    level: number;
    kind: "while";
    constructor(span: Span, expr: ExprNode, stmt: StmtNode);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): WhileStmtNode;
    static create(span: Span, expr: ExprNode, stmt: StmtNode): WhileStmtNode;
}

declare class DoStmtNode extends Node {
    span: Span;
    expr: ExprNode;
    stmt: StmtNode;
    level: number;
    kind: "do";
    constructor(span: Span, expr: ExprNode, stmt: StmtNode);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): DoStmtNode;
    static create(span: Span, expr: ExprNode, stmt: StmtNode): DoStmtNode;
}

declare class TestStmtNode extends Node {
    span: Span;
    name: NameInfo | undefined;
    block: BlockStmtNode;
    documents: string[];
    kind: "Test";
    level: number;
    constructor(span: Span, name: NameInfo | undefined, block: BlockStmtNode, documents?: string[]);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): TestStmtNode;
    static create(span: Span, name: NameInfo | undefined, block: BlockStmtNode, documents?: string[]): TestStmtNode;
}

declare class BreakStmtNode extends Node {
    span: Span;
    level: number;
    kind: "break";
    constructor(span: Span);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): BreakStmtNode;
    static create(span: Span): BreakStmtNode;
}

declare class ContinueStmtNode extends Node {
    span: Span;
    level: number;
    kind: "continue";
    constructor(span: Span);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): ContinueStmtNode;
    static create(span: Span): ContinueStmtNode;
}

declare class ReturnStmtNode extends Node {
    span: Span;
    expr?: ExprNode | undefined;
    level: number;
    kind: "return";
    constructor(span: Span, expr?: ExprNode | undefined);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): ReturnStmtNode;
    static create(span: Span, expr?: ExprNode): ReturnStmtNode;
}

declare class DeferStmtNode extends Node {
    span: Span;
    expr: ExprNode;
    level: number;
    kind: "defer";
    constructor(span: Span, expr: ExprNode);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): DeferStmtNode;
    static create(span: Span, expr: ExprNode): DeferStmtNode;
}

declare class ThrowStmtNode extends Node {
    span: Span;
    expr: ExprNode;
    level: number;
    kind: "throw";
    constructor(span: Span, expr: ExprNode);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): ThrowStmtNode;
    static create(span: Span, expr: ExprNode): ThrowStmtNode;
}

type StmtKind = 'unset' | 'expression' | 'block' | 'use' | 'def' | 'let' | 'func' | 'for' | 'while' | 'return' | 'break' | 'continue' | 'defer' | 'throw' | 'do' | 'test' | 'section';
type StmtTypes = ExprNode | BlockStmtNode | TestStmtNode | LetStmtNode | FuncStmtNode | UseStmtNode | DefStmtNode | ForStmtNode | WhileStmtNode | DoStmtNode | BreakStmtNode | ContinueStmtNode | ReturnStmtNode | DeferStmtNode | ThrowStmtNode | SectionStmtNode;
declare class StmtNode extends Node {
    kind: StmtKind;
    span: Span;
    source: StmtTypes;
    level: number;
    constructor(kind: StmtKind, span: Span, source: StmtTypes);
    getChildrenNodes(): Node[];
    clone(newSpan?: Span): StmtNode;
    getExpr(): ExprNode | undefined;
    getBlock(): BlockStmtNode | undefined;
    getSection(): SectionStmtNode | undefined;
    getTest(): TestStmtNode | undefined;
    getUse(): UseStmtNode | undefined;
    getDef(): DefStmtNode | undefined;
    getLet(): LetStmtNode | undefined;
    getFunc(): FuncStmtNode | undefined;
    getFor(): ForStmtNode | undefined;
    getWhile(): WhileStmtNode | undefined;
    getDo(): DoStmtNode | undefined;
    getReturn(): ReturnStmtNode | undefined;
    getDefer(): DeferStmtNode | undefined;
    getThrow(): ThrowStmtNode | undefined;
    getBreak(): BreakStmtNode | undefined;
    getContinue(): ContinueStmtNode | undefined;
    getStmtName(): string | undefined;
    getStmtNameSpan(): Span | undefined;
    static create(kind: StmtKind, span: Span, data: StmtTypes): StmtNode;
    static asExpr(span: Span, expr: ExprNode): StmtNode;
    static asBlock(span: Span, stmts: StmtNode[]): StmtNode;
    static asSection(span: Span, nameInfo: NameInfo, indent: number, stmts: StmtNode[]): StmtNode;
    static asUse(span: Span, visibility: VisibilityInfo, targetArr: IdentNode[] | undefined, alias?: IdentNode, path?: string, pathSpan?: Span, documents?: string[]): StmtNode;
    static asDefine(span: Span, visibility: VisibilityInfo, ident: IdentNode, type: TypeNode, documents?: string[]): StmtNode;
    static asLet(span: Span, visibility: VisibilityInfo, comptime: ComptimeInfo, mutability: MutabilityInfo, ident: IdentNode, type?: TypeNode, initializer?: ExprNode, documents?: string[]): StmtNode;
    static asFunc(span: Span, visibility: VisibilityInfo, comptime: ComptimeInfo, isInline: boolean, ident: IdentNode, parameters: FieldNode[], errorType: TypeNode | undefined, returnType: TypeNode | undefined, body: StmtNode, documents?: string[]): StmtNode;
    static asFor(span: Span, expr: ExprNode, stmt: StmtNode): StmtNode;
    static asWhile(span: Span, expr: ExprNode, stmt: StmtNode): StmtNode;
    static asDo(span: Span, expr: ExprNode, stmt: StmtNode): StmtNode;
    static asReturn(span: Span, expr?: ExprNode): StmtNode;
    static asDefer(span: Span, expr: ExprNode): StmtNode;
    static asThrow(span: Span, expr: ExprNode): StmtNode;
    static asBreak(span: Span): StmtNode;
    static asContinue(span: Span): StmtNode;
    static asTest(span: Span, nameInfo: NameInfo | undefined, block: BlockStmtNode, documents?: string[]): StmtNode;
    is(kind: StmtKind): boolean;
}

interface ModuleMetadata {
    name?: string;
    path: string;
    [key: string]: unknown;
}
declare class Module {
    name: string;
    stmts: StmtNode[];
    metadata: ModuleMetadata;
    docs: ModuleDocsInfo;
    constructor(name: string, stmts: StmtNode[], metadata: ModuleMetadata, docs: ModuleDocsInfo);
    static create(name: string, stmts: StmtNode[], metadata: ModuleMetadata, docs: ModuleDocsInfo): Module;
    validate(): boolean;
    findStatements(predicate: (stmt: StmtNode) => boolean): StmtNode[];
    findStatement(predicate: (stmt: StmtNode) => boolean): StmtNode | undefined;
    findStatementsByKind(kind: StmtKind): StmtNode[];
    findFunction(name: string): FuncStmtNode | undefined;
    removeStatement(index: number): Module;
    insertStatement(index: number, statement: StmtNode): Module;
    replaceStatement(index: number, statement: StmtNode): Module;
    isEmpty(): boolean;
    hasStatement(statement: StmtNode): boolean;
    getStatementCount(): number;
    getTotalNodes(): number;
    getStatementAt(index: number): StmtNode | undefined;
    getStatementIndex(statement: StmtNode): number;
    getPublicStatements(): StmtNode[];
    getPath(): string;
}

interface ProgramMetadata {
    name?: string;
    desc?: string;
    version?: string;
    path: string;
    [key: string]: unknown;
}
declare class Program {
    modules: Map<string, Module>;
    metadata: ProgramMetadata;
    constructor(modules: Map<string, Module>, metadata: ProgramMetadata);
    static create(modules: Module[], metadata: ProgramMetadata): Program;
    findModules(predicate: (module: Module, name: string) => boolean): [string, Module][];
    findModule(predicate: (module: Module, name: string) => boolean): [string, Module] | undefined;
    removeModule(name: string): Program;
    isEmpty(): boolean;
    hasModule(name: string): boolean;
    getModule(name: string): Module | undefined;
    getModuleNames(): string[];
    getTotalModules(): number;
    getTotalStatements(): number;
    getTotalNodes(): number;
}

export { ArrayAccessNode, ArrayTypeNode, AsNode, BinaryNode, BlockStmtNode, BreakStmtNode, CallNode, CaseNode, CatchNode, type ComptimeInfo, type ComptimeKind, ConditionalNode, ContinueStmtNode, DefStmtNode, DefaultNode, DeferStmtNode, DoStmtNode, EnumTypeNode, EnumVariantNode, ErrsetTypeNode, ExprNode, ExprTupleNode, FieldNode, ForStmtNode, FuncStmtNode, FunctionTypeNode, IdentNode, IfNode, LetStmtNode, LiteralNode, MatchNode, MemberAccessNode, Module, type ModuleDocsInfo, type MutabilityInfo, type MutabilityKind, type NameInfo, Node, ObjectNode, OptionalTypeNode, OrelseNode, ParenNode, ParenTypeNode, PointerTypeNode, PostfixNode, PrefixNode, PrimaryNode, PrimitiveTypeNode, Program, PropNode, RangeNode, ReturnStmtNode, SectionStmtNode, SizeofNode, type Span, StmtNode, StructMemberNode, StructTypeNode, TestStmtNode, ThrowStmtNode, TryNode, TupleTypeNode, TypeNode, TypeofNode, UnionTypeNode, UseStmtNode, type VisibilityInfo, type VisibilityKind, WhileStmtNode };
