/* Page Object for the Checkout Complete page - verifies the order confirmation message and navigates back to the products page */
import { Page, expect } from "@playwright/test";

export class CheckOutCompletePage {
    constructor(readonly page: Page) { };

    get checkoutCompleteMessage() { return this.page.locator('[data-test="complete-header"]') }

    get backToProductsBtn() { return this.page.getByRole("button", { name: "Back Home" }); }

    async verifyCheckoutCompletePageIsLoaded() {
        await expect(this.checkoutCompleteMessage).toBeVisible();   
        console.log("✅ Checkout Complete Page is Loaded");
    }

    async clickBackToProductsBtn() {
        await this.backToProductsBtn.click();
        console.log("✅ Back to Products button clicked");
    }

}