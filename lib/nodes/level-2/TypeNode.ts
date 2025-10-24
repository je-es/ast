// ..?
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { DEF_SPAN, Node, Span }                     from '../node';
    import { ExprNode }                                 from './ExprNode';

    import { PrimitiveKind, PrimitiveTypeNode }         from '../level-3/TypeNodes/PrimitiveTypeNode';
    import { OptionalTypeNode }                         from '../level-3/TypeNodes/OptionalTypeNode';
    import { PointerTypeNode }                          from '../level-3/TypeNodes/PointerTypeNode';
    import { ArrayTypeNode }                            from '../level-3/TypeNodes/ArrayTypeNode';
    import { TupleTypeNode }                            from '../level-3/TypeNodes/TupleTypeNode';
    import { FunctionTypeNode }                         from '../level-3/TypeNodes/FunctionTypeNode';
    import { StructTypeNode }                           from '../level-3/TypeNodes/StructTypeNode';
    import { EnumTypeNode }                             from '../level-3/TypeNodes/EnumTypeNode';
    import { UnionTypeNode }                            from '../level-3/TypeNodes/UnionTypeNode';

    import { IdentNode }                                from '../level-4/CommonNodes/IdentNode';

    import { StructMemberNode }                         from '../level-5/ExprNodes/StructMemberNode';
    import { EnumVariantNode }                          from '../level-5/ExprNodes/EnumVariantNode';
    import { ErrsetTypeNode }                           from '../level-3/TypeNodes/ErrsetTypeNode';
    import { ParenTypeNode }                            from '../level-3/TypeNodes/ParenTypeNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ TYPE ════════════════════════════════════════╗

    export type TypeKind =
        | 'unset'       | 'primitive'   | 'ident'       | 'pointer'
        | 'array'       | 'tuple'       | 'function'    | 'optional'
        | 'struct'      | 'enum'        | 'union'       | 'errset'
        | 'paren';

    export type UnsetSource = null;

    export type TypeTypes =
    | UnsetSource           | PrimitiveTypeNode | IdentNode         | OptionalTypeNode
    | PointerTypeNode       | ArrayTypeNode     | TupleTypeNode     | FunctionTypeNode
    | StructTypeNode        | EnumTypeNode      | UnionTypeNode     | ErrsetTypeNode
    | ParenTypeNode;

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class TypeNode extends Node {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public level = 2;

            constructor(
                public span         : Span,
                public kind         : TypeKind,
                public source       : TypeTypes,
            ) { super(); }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            getChildrenNodes(): Node[] {
                return this.source ? this.source.getChildrenNodes() : []; }

            clone(newSpan?: Span): TypeNode {
                return new TypeNode(newSpan ?? this.span, this.kind, this.source); }

            toString(): string {
                return this.source?.toString() || `Type(${this.kind})`; }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── HELP ──────────────────────────────┐

            is(kind: TypeKind)  { return this.kind === kind; }
            isPrimitive()       { return this.is('primitive'); }
            isVoid()            { return this.isPrimitive() && this.getPrimitive()!.isVoid(); }
            isType()            { return this.isPrimitive() && this.getPrimitive()!.isType(); }
            isNull()            { return this.isPrimitive() && this.getPrimitive()!.isNull(); }
            isUndefined()       { return this.isPrimitive() && this.getPrimitive()!.isUndefined(); }
            isAny()             { return this.isPrimitive() && this.getPrimitive()!.isAny(); }
            isErr()             { return this.isPrimitive() && this.getPrimitive()!.isErr(); }
            isSigned()          { return this.isPrimitive() && this.getPrimitive()!.isSigned(); }
            isUnsigned()        { return this.isPrimitive() && this.getPrimitive()!.isUnsigned(); }
            isComptimeInt()     { return this.isPrimitive() && this.getPrimitive()!.isComptimeInt(); }
            isInteger()         { return this.isPrimitive() && this.getPrimitive()!.isInteger(); }
            isComptimeFloat()   { return this.isPrimitive() && this.getPrimitive()!.isComptimeFloat(); }
            isFloat()           { return this.isPrimitive() && this.getPrimitive()!.isFloat(); }
            isNumeric()         { return this.isPrimitive() && this.getPrimitive()!.isNumeric(); }
            isBool()            { return this.isPrimitive() && this.getPrimitive()!.isBool(); }
            isNoreturn()        { return this.isPrimitive() && this.getPrimitive()!.isNoreturn(); }
            isIdent()           { return this.is('ident'); }

            isPointer()         { return this.kind === 'pointer'; }
            isOptional()        { return this.kind === 'optional'; }
            isArray()           { return this.kind === 'array'; }
            isU8Array()         { return this.isArray() && this.getArray()!.isU8Array(); }
            isU16Array()        { return this.isArray() && this.getArray()!.isU16Array(); }
            isU32Array()        { return this.isArray() && this.getArray()!.isU32Array(); }
            isTuple()           { return this.kind === 'tuple'; }
            isFunction()        { return this.kind === 'function'; }
            isStruct()          { return this.kind === 'struct'; }
            isErrset()          { return this.kind === 'errset'; }
            isEnum()            { return this.kind === 'enum'; }
            isUnion()           { return this.kind === 'union'; }
            isParen()           { return this.kind === 'paren'; }

            getPrimitive()      : PrimitiveTypeNode | undefined { return this.is('primitive')   ? this.source as PrimitiveTypeNode  : undefined; }
            getOptional()       : OptionalTypeNode  | undefined { return this.is('optional')    ? this.source as OptionalTypeNode   : undefined; }
            getPointer()        : PointerTypeNode   | undefined { return this.is('pointer')     ? this.source as PointerTypeNode    : undefined; }
            getArray()          : ArrayTypeNode     | undefined { return this.is('array')       ? this.source as ArrayTypeNode      : undefined; }
            getTuple()          : TupleTypeNode     | undefined { return this.is('tuple')       ? this.source as TupleTypeNode      : undefined; }
            getFunction()       : FunctionTypeNode  | undefined { return this.is('function')    ? this.source as FunctionTypeNode   : undefined; }
            getStruct()         : StructTypeNode    | undefined { return this.is('struct')      ? this.source as StructTypeNode     : undefined; }
            getErrset()         : ErrsetTypeNode    | undefined { return this.is('errset')      ? this.source as ErrsetTypeNode     : undefined; }
            getEnum()           : EnumTypeNode      | undefined { return this.is('enum')        ? this.source as EnumTypeNode       : undefined; }
            getUnion()          : UnionTypeNode     | undefined { return this.is('union')       ? this.source as UnionTypeNode      : undefined; }
            getParen()          : ParenTypeNode     | undefined { return this.is('paren')       ? this.source as ParenTypeNode      : undefined; }
            getIdent()          : IdentNode         | undefined { return this.is('ident')       ? this.source as IdentNode          : undefined; }
            getErrName()        : string            | undefined { return this.is('primitive')   ? this.getPrimitive()!.text         : undefined; }
            getErrSpan()        : Span              | undefined { return this.is('primitive')   ? this.getPrimitive()!.span         : undefined; }
            getWidth()          : number            | undefined { return this.is('primitive')   ? this.getPrimitive()!.width        : undefined; }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static asUnset(span?: Span): TypeNode {
                return new TypeNode(span || DEF_SPAN, 'unset', null);
            }

            static asPrimitive(span: Span | undefined, kind: PrimitiveKind, text?: string, width?: number): TypeNode {
                return new TypeNode(span || DEF_SPAN, 'primitive', PrimitiveTypeNode.create(kind, span || DEF_SPAN, text, width));
            }

            static asVoid(span?: Span): TypeNode {
                return TypeNode.asPrimitive(span || DEF_SPAN, 'void');
            }

            static asBool(span?: Span): TypeNode {
                return TypeNode.asPrimitive(span || DEF_SPAN, 'bool');
            }

            static asSigned(span: Span | undefined, text: string, width?: number): TypeNode {
                return TypeNode.asPrimitive(span || DEF_SPAN, 'signed', text, width ?? PrimitiveTypeNode.calcWidth('i', text));
            }

            static asUnsigned(span: Span | undefined, text: string, width?: number): TypeNode {
                return TypeNode.asPrimitive(span || DEF_SPAN, 'unsigned', text, width ?? PrimitiveTypeNode.calcWidth('u', text));
            }

            static asFloat(span: Span | undefined, text: string, width?: number): TypeNode {
                return TypeNode.asPrimitive(span || DEF_SPAN, 'float', text, width ?? PrimitiveTypeNode.calcWidth('f', text));
            }

            static asNull(span?: Span): TypeNode {
                return TypeNode.asPrimitive(span || DEF_SPAN, 'null');
            }

            static asUndefined(span?: Span): TypeNode {
                return TypeNode.asPrimitive(span || DEF_SPAN, 'und');
            }

            static asAny(span?: Span): TypeNode {
                return TypeNode.asPrimitive(span || DEF_SPAN, 'any');
            }

            static asErr(span?: Span, text?: string): TypeNode {
                return TypeNode.asPrimitive(span || DEF_SPAN, 'err', text);
            }

            static asType(span?: Span): TypeNode {
                return TypeNode.asPrimitive(span || DEF_SPAN, 'type');
            }

            static asComptimeInt(span: Span | undefined, text: string): TypeNode {
                return TypeNode.asPrimitive(span || DEF_SPAN, 'cint', text, 64);
            }

            static asComptimeFloat(span: Span | undefined, text: string): TypeNode {
                return TypeNode.asPrimitive(span || DEF_SPAN, 'cflt', text, 64);
            }

            static asNoreturn(span?: Span): TypeNode {
                return TypeNode.asPrimitive(span || DEF_SPAN, 'noreturn');
            }

            static asIdentifier(span: Span | undefined, name: string): TypeNode {
                return new TypeNode(span || DEF_SPAN, 'ident', IdentNode.create(span || DEF_SPAN, name));
            }

            static asPointer(span: Span | undefined, target: TypeNode, mutable= false): TypeNode {
                return new TypeNode(span || DEF_SPAN, 'pointer', PointerTypeNode.create(span || DEF_SPAN, target, mutable));
            }

            static asOptional(span: Span | undefined, target: TypeNode): TypeNode {
                return new TypeNode(span || DEF_SPAN, 'optional', OptionalTypeNode.create(span || DEF_SPAN, target));
            }

            static asArray(span: Span | undefined, target: TypeNode, size?: ExprNode, mutable= false): TypeNode {
                return new TypeNode(span || DEF_SPAN, 'array', ArrayTypeNode.create(span || DEF_SPAN, target, size, mutable));
            }

            static asU8Array(span: Span | undefined, mutable= false): TypeNode {
                return new TypeNode(span || DEF_SPAN, 'array', ArrayTypeNode.create(span || DEF_SPAN, TypeNode.asUnsigned(span, 'u8', 8), undefined, mutable));
            }

            static asU16Array(span: Span | undefined, mutable= false): TypeNode {
                return new TypeNode(span || DEF_SPAN, 'array', ArrayTypeNode.create(span || DEF_SPAN, TypeNode.asUnsigned(span, 'u16', 16), undefined, mutable));
            }

            static asU32Array(span: Span | undefined, mutable= false): TypeNode {
                return new TypeNode(span || DEF_SPAN, 'array', ArrayTypeNode.create(span || DEF_SPAN, TypeNode.asUnsigned(span, 'u32', 32), undefined, mutable));
            }

            static asTuple(span: Span | undefined, fields: TypeNode[]): TypeNode {
                return new TypeNode(span || DEF_SPAN, 'tuple', TupleTypeNode.create(span || DEF_SPAN, fields));
            }

            static asFunction(span: Span | undefined, params: TypeNode[], returnType?: TypeNode, errorType?: TypeNode): TypeNode {
                return new TypeNode(span || DEF_SPAN, 'function', FunctionTypeNode.create(span || DEF_SPAN, params, returnType, errorType));
            }

            static asErrset(span: Span | undefined, members: IdentNode[]): TypeNode {
                return new TypeNode(span || DEF_SPAN, 'errset', ErrsetTypeNode.create(span || DEF_SPAN, members));
            }

            static asStruct(span: Span | undefined, members: StructMemberNode[], name: string = 'Anonymous'): TypeNode {
                return new TypeNode(span || DEF_SPAN, 'struct', StructTypeNode.create(span || DEF_SPAN, members, name));
            }

            static asEnum(span: Span | undefined, variants: EnumVariantNode[], name: string = 'Anonymous'): TypeNode {
                return new TypeNode(span || DEF_SPAN, 'enum', EnumTypeNode.create(span || DEF_SPAN, variants, name));
            }

            static asUnion(span: Span | undefined, types: TypeNode[]): TypeNode {
                return new TypeNode(span || DEF_SPAN, 'union', UnionTypeNode.create(span || DEF_SPAN, types));
            }

            static asParen(span: Span | undefined, type: TypeNode): TypeNode {
                return new TypeNode(span || DEF_SPAN, 'paren', ParenTypeNode.create(span || DEF_SPAN, type));
            }

        // └────────────────────────────────────────────────────────────────────┘
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝