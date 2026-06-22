/* Page Object for the Logout flow - opens the burger menu and clicks the logout link to sign out of the application */
import { Page } from "@playwright/test";

export class LogOutPage {
    constructor(readonly page: Page) { }

    get menuButton() { return this.page.getByRole('button', { name: 'open menu' }) }

    get logoutButton() { return this.page.locator('[data-test="logout-sidebar-link"]') }
    //logout-sidebar-link

    async logOut() {
        await this.menuButton.click()
        await this.logoutButton.click()
        console.log("✅ Logged Out Successfully")
    }

}