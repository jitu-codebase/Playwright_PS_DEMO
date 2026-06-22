/* Page Object for the Login page - handles filling in credentials and submitting the login form */
import { Page } from "@playwright/test"

export class LoginPage {
    constructor(readonly page: Page) { }

    get usernameInputBox() { return this.page.getByPlaceholder('Username') }

    get passwordInputBox() { return this.page.getByRole('textbox', { name: 'password' }) }

    get loginButton() { return this.page.locator('[data-test="login-button"]') }

    async doLogin(userName: string, password: string) {
        await this.usernameInputBox.fill(userName)
        await this.passwordInputBox.fill(password)
        await this.loginButton.click()
    }
}