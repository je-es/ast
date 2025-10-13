// ..?
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node }   from '../../node';
    import { TypeNode }     from '../../level-2/TypeNode';
    import { ExprNode }     from '../../level-2/ExprNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class ArrayTypeNode extends Node  {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public kind = 'Array' as const;
            public level = 3;

            constructor(
                public span         : Span,
                public target       : TypeNode,
                public size         : ExprNode | undefined,
                public mutable      : boolean
            ) {
                super();
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                const children: Node[] = [];

                children.push(this.target);
                if (this.size) {children.push(this.size);}

                return children;
            }

            clone(newSpan?: Span): ArrayTypeNode {
                const cloned = new ArrayTypeNode(newSpan || this.span, this.target, this.size, this.mutable);
                return cloned;
            }

            toString(): string {
                return `[]${this.target.toString()}`;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── HELP ──────────────────────────────┐

            isU8Array(): boolean {
                return (this.target.getPrimitive() && this.target.getPrimitive()!.kind === 'unsigned' && this.target.getPrimitive()!.width === 8) ?? false;
            }

            isU16Array(): boolean {
                return (this.target.getPrimitive() && this.target.getPrimitive()!.kind === 'unsigned' && this.target.getPrimitive()!.width === 16) ?? false;
            }

            isU32Array(): boolean {
                return (this.target.getPrimitive() && this.target.getPrimitive()!.kind === 'unsigned' && this.target.getPrimitive()!.width === 32) ?? false;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, target: TypeNode, size?: ExprNode, mutable = false): ArrayTypeNode {
                return new ArrayTypeNode(span, target, size, mutable);
            }

        // └────────────────────────────────────────────────────────────────────┘
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝