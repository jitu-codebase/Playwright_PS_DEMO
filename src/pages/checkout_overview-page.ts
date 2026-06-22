import { Page, expect } from "@playwright/test";
import { TestContext } from "../utils/test-context";


export class CheckoutOverviewPage {
    constructor(readonly page: Page, readonly testContext: TestContext) { };

    get itemNames() { return this.page.locator('[data-test="inventory-item-name"]') };

    get itemPrices() { return this.page.locator('[data-test="inventory-item-price"]') };

    get taxPrice() { return this.page.locator('[data-test="tax-label"]') };

    get totalPrice() { return this.page.locator('[data-test="total-label"]') };

    get finishButton() { return this.page.getByRole('button', { name: "Finish" }) };

    async getCartItemsDetails(): Promise<{ itemsNames: string[], itemPrices: number[] }> {
        const itemsNames = await this.itemNames.allTextContents();
        const itemPrices = (await this.itemPrices.allTextContents()).map(price => Number(price.replace('$', '')))
        return { itemsNames, itemPrices }
    }

    async getTotalPriceWithTax(): Promise<number> {
        const taxPrice = Number((await this.taxPrice.textContent())?.replace(/[^\d.]/g, ""));
        const itemPrices = this.testContext.get<number[]>("Prices");
        return parseFloat((taxPrice + itemPrices.reduce((a, b) => a + b, 0)).toFixed(2));
    }

    async getTotalPriceFromUI(): Promise<number> {
        const totalPrice = Number((await this.totalPrice.textContent())?.replace(/[^\d.]/g, ""));
        return parseFloat((totalPrice).toFixed(2));
    }

    async validateTotalItemPrice() {
        const expectedTotalPriceWithTax = await this.getTotalPriceWithTax();
        const actualTotalPriceFromUI = await this.getTotalPriceFromUI();
        console.log(`✅ Expected Total Price with Tax: ${expectedTotalPriceWithTax}`);
        console.log(`✅ Actual Total Price from UI: ${actualTotalPriceFromUI}`);
        expect(expectedTotalPriceWithTax).toEqual(actualTotalPriceFromUI);
        console.log('✅ Total Item Price validated successfully');
    }

    async clickFinishBtn() {
        await this.finishButton.click();
        console.log('✅ Finish button clicked');
    }

}