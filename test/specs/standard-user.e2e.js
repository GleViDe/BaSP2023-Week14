import LoginPage from '../pageobjects/login.page';
import UserPage from '../pageobjects/user.page'

describe('My Correct Login', () => {
    beforeAll('Visit Main Page', () => {
        LoginPage.open();
    });

    it('should retrieve the correct data from main title', async () => {
        await LoginPage.mainTitle.waitForDisplayed();
        await expect(LoginPage.mainTitle).toHaveTextContaining('Swag Labs');
        await expect(LoginPage.btnSubmit).toBeDisplayed();
    });

    it('should login with standard credentials', async () => {
        await LoginPage.login('standard_user', 'secret_sauce');
        const currentUrl = await browser.getUrl();
        expect(currentUrl).toEqual('https://www.saucedemo.com/inventory.html');
    });

    it('should retrieve the correct data from standard user view', async () => {
        await expect(UserPage.mainTitle).toHaveTextContaining('Swag Labs');
        await expect(UserPage.hambMenu).toBeDisplayed();
        await expect(UserPage.cartIcon).toBeDisplayed();
        await expect(UserPage.prdTitle).toHaveTextContaining('Products');
        await expect(UserPage.filterBar).toBeDisplayed();
        await expect(UserPage.invList).toBeDisplayed();
        await expect(UserPage.twitter).toBeDisplayed();
        await expect(UserPage.facebook).toBeDisplayed();
        await expect(UserPage.linkedin).toBeDisplayed();
        await expect(UserPage.footerText).toHaveTextContaining('© 2023 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy');
    });
});

describe('My Incorrect Login', () => {
    beforeAll('Visit Main Page', () => {
        LoginPage.open();
    });

    it('should show an error for fields required', async () => {
        await LoginPage.login('', '');
        await expect(LoginPage.fieldsRequired).toHaveTextContaining('Epic sadface: Username is required');
    });

    it('should show an error for password required', async () => {
        await LoginPage.login('manolo', '');
        await expect(LoginPage.fieldsRequired).toHaveTextContaining('Epic sadface: Password is required');
    });

    it('should show an error for username and password do not match', async () => {
        await LoginPage.login('manolo', 'password');
        await expect(LoginPage.fieldsRequired).toHaveTextContaining('Epic sadface: Username and password do not match any user in this service');
    });
});