import {Product} from "@/custom-types/Product";

export class Cart {
    private readonly items: Product[] = [];
    private _totalQuantity: number = 0;
    private _totalValue: number = 0;

    constructor() {
        if (localStorage.cart) {
            const cart = JSON.parse(localStorage.cart);
            this.items = cart.items;
            this._totalQuantity = cart._totalQuantity;
            this._totalValue = cart._totalValue;
        }
    }

    public decrementItem(product: Product) {
        const itemIndex = this.items.findIndex((item) => product.sku == item.sku);
        if (itemIndex === -1) {
            return;
        }
        const item: Product = this.items[itemIndex];
        item.quantity--;
        if (item.quantity > 0) {
            this.items[itemIndex] = item;
        } else {
            this.items.splice(itemIndex, 1)
        }
        this.decrementPropertiesAndLocalStorage(item.unit_price);
    }

    public removeItem(product: Product) {
        const itemIndex = this.items.findIndex((item) => product.sku == item.sku);
        if (itemIndex === -1) {
            return;
        }
        const item: Product = this.items[itemIndex];
        this.items.splice(itemIndex, 1);
        this._totalQuantity -= item.quantity;
        this._totalValue -= item.quantity * item.unit_price;
        localStorage.cart = JSON.stringify(this);
    }

    public add(product: Product) {
        if (!this.items) {
            this.addProductToCart(product)
            return;
        }
        const itemIndex = this.items.findIndex((item) => product.sku == item.sku);
        if (itemIndex === -1) {
            this.addProductToCart(product);
            return;
        }
        this.incrementProductQuantity(itemIndex);
    }

    private addProductToCart(product: Product) {
        product.quantity = 1;
        this.items.push(product);
        this.incrementPropertiesAndLocalStorage(product.unit_price);
    }

    private incrementProductQuantity(index: number) {
        const item: Product = this.items[index];
        item.quantity++;
        this.items[index] = item;
        this.incrementPropertiesAndLocalStorage(item.unit_price);
    }

    private incrementPropertiesAndLocalStorage(price: number) {
        this._totalQuantity++;
        this._totalValue += price;
        localStorage.cart = JSON.stringify(this);
    }

    private decrementPropertiesAndLocalStorage(price: number) {
        this._totalQuantity--;
        this._totalValue -= price;
        localStorage.cart = JSON.stringify(this);
    }

    get totalQuantity(): number {
        return this._totalQuantity;
    }

    get totalValue(): number {
        return this._totalValue;
    }
}