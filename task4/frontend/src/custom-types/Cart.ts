import {Product} from "@/custom-types/Product";

export class Cart {
    private _items: Product[] = [];
    private _totalQuantity: number = 0;
    private _totalValue: number = 0;

    constructor() {
        if (localStorage.cart) {
            const cart = JSON.parse(localStorage.cart);
            this._items = cart._items;
            this._totalQuantity = cart._totalQuantity;
            this._totalValue = cart._totalValue;
        }
    }

    public cartChangeMultiple(newNumber: number, product: Product) {
        const quantity = product.quantity;
        if (newNumber > quantity) {
            this.addMultiple(newNumber - quantity, product)
        } else if (newNumber < quantity) {
            this.decrementMultiple(quantity - newNumber, product)
        }
    }

    public decrementMultiple(numToAdd: number, product: Product) {
        for (let i = 0; i < numToAdd; i++) {
            this.decrementItem(product)
        }
    }

    public decrementItem(product: Product) {
        const itemIndex = this._items.findIndex((item) => product.sku == item.sku);
        if (itemIndex === -1) {
            return;
        }
        const item: Product = this._items[itemIndex];
        item.quantity--;
        if (item.quantity > 0) {
            this._items[itemIndex] = item;
        } else {
            this._items.splice(itemIndex, 1)
        }
        this.decrementPropertiesAndLocalStorage(item.unit_price);
    }

    public removeItem(product: Product) {
        const itemIndex = this._items.findIndex((item) => product.sku == item.sku);
        if (itemIndex === -1) {
            return;
        }
        const item: Product = this._items[itemIndex];
        this._items.splice(itemIndex, 1);
        this._totalQuantity -= item.quantity;
        this._totalValue -= item.quantity * item.unit_price;
        localStorage.cart = JSON.stringify(this);
    }

    public addMultiple(numToAdd: number, product: Product) {
        for (let i = 0; i < numToAdd; i++) {
            this.add(product)
        }
    }

    public add(product: Product) {
        if (!this._items) {
            this.addProductToCart(product)
            return;
        }
        const itemIndex = this._items.findIndex((item) => product.sku == item.sku);
        if (itemIndex === -1) {
            this.addProductToCart(product);
            return;
        }
        this.incrementProductQuantity(itemIndex);
    }

    public clear() {
        localStorage.removeItem('cart');
        this._items = [];
        this._totalQuantity = 0;
        this._totalValue = 0;
    }

    private addProductToCart(product: Product) {
        product.quantity = 1;
        this._items.push(product);
        this.incrementPropertiesAndLocalStorage(product.unit_price);
    }

    private incrementProductQuantity(index: number) {
        const item: Product = this._items[index];
        item.quantity++;
        this._items[index] = item;
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

    public calculateTotalQuantityAndValue() {
        this._totalQuantity = 0;
        this._totalValue = 0;
        this.items.forEach(item => {
            this._totalQuantity += Number(item.quantity);
            this._totalValue += Number(item.unit_price) * Number(item.quantity);
            // @ts-ignore
            if (item.quantity !== '' && Number(item.quantity) === 0) {
                this.removeItem(item);
            }
            if (Number(item.quantity) === Number.NaN || Number(item.quantity) < 0) {
                this._totalQuantity = 0;
                this._totalValue = 0;
                return;
            }
        })
        localStorage.cart = JSON.stringify(this);
    }

    get totalQuantity(): number {
        return this._totalQuantity;
    }

    get totalValue(): number {
        return this._totalValue;
    }

    get items(): Product[] {
        return this._items;
    }
}
