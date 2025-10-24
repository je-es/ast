// ..?
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node, DEF_SPAN }     from '../../node';
    import { IdentNode }                from '../../level-4/CommonNodes/IdentNode';
    import { LiteralNode }              from '../../level-4/ExprNodes/LiteralNode';
    import { ObjectNode }               from '../../level-4/ExprNodes/ObjectNode';
    import { ParenNode }                from '../../level-4/ExprNodes/ParenNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ INIT ════════════════════════════════════════╗

    export type PrimitiveKind =
        | 'type'        | 'void'            | 'bool'        | 'signed'
        | 'unsigned'    | 'float'           | 'und'         | 'null'
        | 'cint'        | 'cflt'            | 'any'         | 'err'
        | 'noreturn';

    export type PrimitiveTypes = IdentNode | LiteralNode | ParenNode | ObjectNode;

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class PrimitiveTypeNode extends Node  {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public level = 3;

            constructor(
                public kind         : PrimitiveKind,
                public span         : Span,
                public text         ?: string,
                public width        ?: number,
            ) {
                super();
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                return [];
            }

            clone(newSpan?: Span): PrimitiveTypeNode {
                const cloned = new PrimitiveTypeNode(this.kind, newSpan || this.span, this.text, this.width);
                return cloned;
            }

            toString(): string {
                switch(this.kind) {
                    case 'void':            return 'void';
                    case 'type':            return 'type';
                    case 'bool':            return 'bool';
                    case 'signed':          return 'i'+this.width;
                    case 'unsigned':        return 'u'+this.width;
                    case 'float':           return 'f'+this.width;
                    case 'und':             return 'undefined';
                    case 'null':            return 'null';
                    case 'cint':            return 'cint';
                    case 'cflt':            return 'cflt';
                    case 'any':             return 'any';
                    case 'err':             return 'err';
                    case 'noreturn':        return 'noreturn';
                }
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── HELP ──────────────────────────────┐

            is(kind: PrimitiveKind): boolean {
                return this.kind === kind;
            }

            isVoid()          { return this.is('void'); }
            isType()          { return this.is('type'); }
            isNull()          { return this.is('null'); }
            isUndefined()     { return this.is('und'); }
            isBool()          { return this.is('bool'); }
            isSigned()        { return this.is('signed'); }
            isUnsigned()      { return this.is('unsigned'); }
            isFloat()         { return this.is('float'); }
            isInteger()       { return this.is('signed') || this.is('unsigned') || this.is('cint'); }
            isComptimeInt()   { return this.is('cint'); }
            isComptimeFloat() { return this.is('cflt'); }
            isNumeric()       { return this.is('signed') || this.is('unsigned') || this.is('float') || this.is('cint') || this.is('cflt'); }
            isAny()           { return this.is('any'); }
            isErr()           { return this.is('err'); }
            isNoreturn()      { return this.is('noreturn'); }

            static calcWidth(prefix: string, text: string): number {
                // Check if text starts with the prefix
                if (!text.startsWith(prefix)) {return 0;}

                // Extract the numeric part after the prefix
                const numericPart = text.slice(prefix.length);

                // Convert to number
                const width = parseInt(numericPart, 10);

                // Check if the conversion was successful
                if (isNaN(width)) {return 0;}

                return width;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(kind: PrimitiveKind, span: Span, text?: string, width?: number): PrimitiveTypeNode {
                return new PrimitiveTypeNode(kind, span, text, width);
            }

            static asVoid(span?: Span): PrimitiveTypeNode {
                return PrimitiveTypeNode.create('void', span || DEF_SPAN);
            }

            static asType(span?: Span): PrimitiveTypeNode {
                return PrimitiveTypeNode.create('type', span || DEF_SPAN);
            }

            static asNull(span?: Span): PrimitiveTypeNode {
                return PrimitiveTypeNode.create('null', span || DEF_SPAN);
            }

            static asUndefined(span?: Span): PrimitiveTypeNode {
                return PrimitiveTypeNode.create('und', span || DEF_SPAN);
            }

            static asAny(span?: Span): PrimitiveTypeNode {
                return PrimitiveTypeNode.create('any', span || DEF_SPAN);
            }

            static asErr(span?: Span, text?: string): PrimitiveTypeNode {
                return PrimitiveTypeNode.create('err', span || DEF_SPAN, text);
            }

            static asBool(span?: Span): PrimitiveTypeNode {
                return PrimitiveTypeNode.create('bool', span || DEF_SPAN);
            }

            static asSigned(span?: Span, text?: string, width?: number): PrimitiveTypeNode {
                return PrimitiveTypeNode.create('signed', span || DEF_SPAN, text, width);
            }

            static asUnsigned(span?: Span, text?: string, width?: number): PrimitiveTypeNode {
                return PrimitiveTypeNode.create('unsigned', span || DEF_SPAN, text, width);
            }

            static asFloat(span?: Span, text?: string, width?: number): PrimitiveTypeNode {
                return PrimitiveTypeNode.create('float', span || DEF_SPAN, text, width);
            }

            static asComptimeInt(span?: Span, text?: string): PrimitiveTypeNode {
                return PrimitiveTypeNode.create('cint', span || DEF_SPAN, text, 64);
            }

            static asComptimeFloat(span?: Span, text?: string): PrimitiveTypeNode {
                return PrimitiveTypeNode.create('cflt', span || DEF_SPAN, text, 64);
            }

            static asNoreturn(span?: Span): PrimitiveTypeNode {
                return PrimitiveTypeNode.create('noreturn', span || DEF_SPAN);
            }

        // └────────────────────────────────────────────────────────────────────┘
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝