import { Page, expect } from "@playwright/test"
import { Helper } from "../utils/helper";
import { TestContext } from "../utils/test-context";

export class InventoryPage {
    constructor(
        readonly page: Page,
        readonly testContext: TestContext
    ) { }

    get cartButton() { return this.page.locator('[data-test="shopping-cart-link"]') }

    get pricesOfItems() { return this.page.locator('[data-test="inventory-item-price"]') }

    get addToCartButtons() { return this.page.getByRole('button', { name: "Add to cart" }) }

    get itemNames() { return this.page.locator('[data-test="inventory-item-name"]') }

    get sortingDropdown() { return this.page.locator('[data-test="product-sort-container"]') }

    async verifyInventoryPageIsLoaded(): Promise<void> {
        await expect(this.cartButton).toBeVisible();
        console.log("✅ Inventory Page is Loaded");
    }

    async listPricesOfItems() {
        const prices = (await this.pricesOfItems.allTextContents()).map(price => Number(price.replace('$', '')))
        console.log("✅ Prices of Items are: ", prices);
        this.testContext.set("ItemPrices", prices)
        return prices
    }

    async addMinAndMaxPriceItemsToCart() {
        const pricesOfItems = await this.listPricesOfItems();
        const { minIndex, maxIndex } = Helper.getIndexOfMinMaxPriceOfItems(...pricesOfItems)
        await this.addToCartButtons.nth(minIndex).click()
        await this.addToCartButtons.nth(maxIndex).click()
        console.log("✅ Min and Max Price Items added to Cart");
        this.testContext.appendToList("Prices", pricesOfItems[minIndex]);
        this.testContext.appendToList("Prices", pricesOfItems[maxIndex]);
        this.testContext.appendToList("ProductText", await this.itemNames.nth(minIndex).textContent());
        this.testContext.appendToList("ProductText", await this.itemNames.nth(maxIndex).textContent());
        this.testContext.set("MinPriceProductText", await this.itemNames.nth(minIndex).textContent());
        this.testContext.set("MaxPriceProductText", await this.itemNames.nth(maxIndex).textContent());
    }

    async clickOnCartButton() {
        await this.cartButton.click();
    }

    async sortProducts() {
        await this.sortingDropdown.click();
        await this.sortingDropdown.selectOption({ index: 2 })
        await this.listPricesOfItems();
    }





}