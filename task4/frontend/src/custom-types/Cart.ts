import {Product} from "@/custom-types/Product";

export class Cart {
    private readonly items: Product[] = [];
    private _totalQuantity: number = 0;

    constructor() {
        if (localStorage.cart) {
            const cart = JSON.parse(localStorage.cart);
            this.items = cart.items;
        }
    }

    public addToCart(product: Product) {
        if (!this.items) {
            this.addProductToCart(product)
            return;
        }
        const itemIndex = this.items.findIndex((item) => product.sku == item.sku);
        if (itemIndex === -1) {
            this.addProductToCart(product);
            return;
        }
        this.incrementProductQuantity( itemIndex);
        this._totalQuantity++;
    }

    private addProductToCart(product: Product) {
        product.quantity = 1;
        this.items.push(product);
        localStorage.cart = JSON.stringify(this);
    }

    private incrementProductQuantity(index: number) {
        const item: Product = this.items[index];
        item.quantity++;
        this.items[index] = item;
    }

    get totalQuantity(): number {
        return this._totalQuantity;
    }
}