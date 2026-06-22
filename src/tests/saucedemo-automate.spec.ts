import { expect, test } from "../../fixture/test-fixture";
import { Helper } from "../utils/helper";
import { randomUserData } from "../testdata/user-data";

test.beforeEach(async ({ page, loginPage }) => {
    await page.goto("/", { waitUntil: 'domcontentloaded' })
    await loginPage.doLogin(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!)
})

test.afterEach(async ({ page }, testInfo) => {
    console.log(`✅ Test completed: ====== ${testInfo.title} ======`);
    await page.close();
})

test.describe("Automating Sauce Demo Websites E2E for PS_Demo", () => {
    test('Exercise 1: Automating a Login Flow', { tag: "@Sanity" }, async ({ page, inventroyPage }) => {
        console.log('✅ Logged in successfully')
        await page.screenshot({ path: `screenshots/login-${Date.now()}.png` })
        console.log('✅ Screenshot captured successfully of login')
        await inventroyPage.verifyInventoryPageIsLoaded();
    })

    test('Exercise 2: Add and Remove Items from Cart', { tag: "@Sanity" }, async ({ inventroyPage, testContext, cartPage, logOutPage }) => {
        await inventroyPage.addMinAndMaxPriceItemsToCart();
        await inventroyPage.clickOnCartButton();
        const { itemsNames, itemPrices } = await cartPage.getCartItemsDetails();
        expect(itemsNames).toEqual(testContext.get<string[]>("ProductText"))
        expect(itemPrices).toEqual(testContext.get<number[]>("Prices"))
        console.log(`✅ Validated selected products in cart`)
        await cartPage.removeItemsFromCart();
        const itemsList = await cartPage.getListOfItems();
        expect(itemsList).toEqual(1)
        console.log(`✅ Items available in cart after removal: ${itemsList}`)
        await logOutPage.logOut();
    })

    test('Exercise 3: Filtering and Sorting Products', { tag: "@Sanity" }, async ({ page, inventroyPage, testContext, logOutPage }) => {
        await inventroyPage.sortProducts();
        const ItemPrices = testContext.get<number[]>("ItemPrices")
        Helper.verifyItemsAreSorted(ItemPrices)
        console.log(`✅ Products are sorted`);
        await page.screenshot({ path: `screenshots/products-sorted-${Date.now()}.png` })
        console.log('✅ Screenshot captured successfully of sorted products');
        await logOutPage.logOut();
    })

    test('Exercise 4: Completing a Purchase', { tag: "@Sanity" }, async ({ page, logOutPage, cartPage, inventroyPage,
        testContext, checkoutUserInfoPage, checkoutOverviewPage, checkOutCompletePage }) => {
        await inventroyPage.addMinAndMaxPriceItemsToCart();
        await inventroyPage.clickOnCartButton();
        await cartPage.clickCheckoutButton();
        await checkoutUserInfoPage.addUserDetailsForCheckout(randomUserData());
        await checkoutUserInfoPage.clickContinueBtn();
        const { itemsNames, itemPrices } = await checkoutOverviewPage.getCartItemsDetails();
        expect(itemsNames).toEqual(testContext.get<string[]>("ProductText"))
        expect(itemPrices).toEqual(testContext.get<number[]>("Prices"))
        console.log(`✅ Validated selected products in cart`);
        await checkoutOverviewPage.validateTotalItemPrice();
        await page.screenshot({ path: `screenshots/checkout-${Date.now()}.png` })
        console.log('✅ Screenshot captured successfully of checkout overview');
        await checkoutOverviewPage.clickFinishBtn();
        await checkOutCompletePage.verifyCheckoutCompletePageIsLoaded();
        await checkOutCompletePage.clickBackToProductsBtn();
        await logOutPage.logOut();
        await page.screenshot({ path: `screenshots/checkoutComplete-${Date.now()}.png` })
        console.log('✅ Screenshot captured successfully of checkout complete');
    })
})