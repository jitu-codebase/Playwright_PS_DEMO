import { test as base } from "@playwright/test";
import { LoginPage } from "../src/pages/login-page"
import { InventoryPage } from "../src/pages/inventory-page";
import { TestContext } from "../src/utils/test-context";
import { CartPage } from "../src/pages/cart-page";
import { LogOutPage } from "../src/pages/logout-page";
import { CheckoutUserInfoPage } from "../src/pages/checkout_userinfo-page";
import { CheckoutOverviewPage } from "../src/pages/checkout_overview-page"
import { CheckOutCompletePage } from "../src/pages/checkout_complete-page";

export const test = base.extend<{
    loginPage: LoginPage;
    inventroyPage: InventoryPage;
    testContext: TestContext;
    cartPage: CartPage;
    logOutPage: LogOutPage;
    checkoutUserInfoPage: CheckoutUserInfoPage;
    checkoutOverviewPage: CheckoutOverviewPage;
    checkOutCompletePage: CheckOutCompletePage;
}>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    inventroyPage: async ({ page, testContext }, use) => {
        await use(new InventoryPage(page, testContext));
    },
    testContext: async ({ }, use) => {
        await use(new TestContext());
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    logOutPage: async ({ page }, use) => {
        await use(new LogOutPage(page));
    },
    checkoutUserInfoPage: async ({ page }, use) => {
        await use(new CheckoutUserInfoPage(page));
    },
    checkoutOverviewPage: async ({ page, testContext }, use) => {
        await use(new CheckoutOverviewPage(page, testContext));
    },
    checkOutCompletePage: async ({ page }, use) => {
        await use(new CheckOutCompletePage(page));
    }
})

export const expect = test.expect;
