/* Page Object for the Checkout User Info page - handles filling in first name, last name, and postal code before proceeding to order overview */
import { Page } from "@playwright/test"
import { userData } from '../types/user-info'

export class CheckoutUserInfoPage {

    constructor(readonly page: Page) { }

    get firstNameInputTextBox() { return this.page.locator('[data-test="firstName"]') };
    get lastNameInputTextBox() { return this.page.locator('[data-test="lastName"]') };
    get postalCodeInputTextBox() { return this.page.locator('[data-test="postalCode"]') };
    get continurButton() { return this.page.locator('[data-test="continue"]') };

    async addUserDetailsForCheckout(userData: userData) {
        await this.firstNameInputTextBox.fill(userData.firstName);
        await this.lastNameInputTextBox.fill(userData.lastName);
        await this.postalCodeInputTextBox.fill(userData.postalCode);
        console.log('✅ User details added successfully');
    }

    async clickContinueBtn() {
        await this.continurButton.click();
        console.log('✅ Continue button clicked');
    }
}

