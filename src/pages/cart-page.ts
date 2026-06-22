import { Page } from "@playwright/test";

export class CartPage {
    constructor(readonly page: Page) { }

    get itemNames() { return this.page.locator('[data-test="inventory-item-name"]') };

    get itemPrices() { return this.page.locator('[data-test="inventory-item-price"]') };

    get removeItemButtons() { return this.page.getByRole('button', { name: 'Remove' }) };

    get checkoutButton() { return this.page.getByRole('button', { name: 'Checkout' }) };



    async getCartItemsDetails(): Promise<{ itemsNames: string[], itemPrices: number[] }> {
        const itemsNames = await this.itemNames.allTextContents();
        const itemPrices = (await this.itemPrices.allTextContents()).map(price => Number(price.replace('$', '')))
        return { itemsNames, itemPrices }
    }

    async getListOfItems() {
        const itemCount = await this.itemNames.count();
        return itemCount;
    }

    async removeItemsFromCart() {
        await this.removeItemButtons.first().click();
    }

    async clickCheckoutButton() {
        await this.checkoutButton.click();
    }
}       