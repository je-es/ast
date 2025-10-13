// ..?
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node }   from '../../node';
    import { TypeNode }     from '../../level-2/TypeNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class FunctionTypeNode extends Node  {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public kind = 'Function' as const;
            public level = 3;

            constructor(
                public span         : Span,
                public params       : TypeNode[],
                public returnType   : TypeNode | undefined,
                public errorType    : TypeNode | undefined,
            ) {
                super();
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                const children: Node[] = [];

                children.push(...this.params);
                if (this.returnType) {children.push(this.returnType);}
                if (this.errorType) {children.push(this.errorType);}

                return children;
            }

            clone(newSpan?: Span): FunctionTypeNode {
                const cloned = new FunctionTypeNode(newSpan || this.span, this.params, this.returnType, this.errorType);
                return cloned;
            }

            toString(): string {
                return `function`;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── HELP ──────────────────────────────┐


        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, params: TypeNode[], returnType?: TypeNode, errorType?: TypeNode): FunctionTypeNode {
                return new FunctionTypeNode(span, params, returnType, errorType);
            }

        // └────────────────────────────────────────────────────────────────────┘
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝