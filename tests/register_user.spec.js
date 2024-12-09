const { test,expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { PageHelper }  = require('../utils/PageHelper');
const { TestDataHelper }  = require('../utils/TestDataHelper');
const { RegisterPage } = require('../pages/RegisterPage');
const { AccountsOverview } = require('../pages/AccountsOverview');

test.describe('Login - Spec', ()=> {

    /** @type {import('@playwright/test').Page} */
    let page;
    let loginPage;
    let registerPage;
    let accountsOverviewPage;
    let userData

    test.beforeAll(async ({ browser, baseURL }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        await PageHelper.goTo(page,baseURL);
        loginPage = new LoginPage(page);
        registerPage = new RegisterPage(page);
        accountsOverviewPage = new AccountsOverview(page);
        userData = TestDataHelper.generateUserData();
    });

    test.afterAll(async ()=> {
        page.close();
    });

    test('Verify user is not able to login with invalid credentials', async ()=> {

        await test.step('Login with invalid credentials', async () => {
            await loginPage.login(TestDataHelper.generateUsername(),TestDataHelper.generatePassword());
            const errorMessage = await loginPage.getLoginError();
            expect(errorMessage).toEqual('The username and password could not be verified.', `Expected error message to be "The username and password could not be verified.", but received: ${errorMessage}`);
        });

    });

    test('Verify user is able to register a new user and login with the registered user', async ()=> {

        await test.step('Go to register page and register a new user', async () => {
            const expectedWelcomeMsg = 'Welcome ' + `${userData.username}`;
            await loginPage.clickRegisterLink();
            await registerPage.registerNewUser(userData);
            const welcomeMsg = await registerPage.getWelcomeText();
            console.log('the message is'+ welcomeMsg);
            expect(welcomeMsg).toEqual(expectedWelcomeMsg, `Expected welcome message to be "${expectedWelcomeMsg}", but received: ${welcomeMsg}`);
        });

        await test.step('Logout after registering a new user', async () => {
            await loginPage.clickLogout();
            const isPresent = await loginPage.verifyLogInButtonIsPresent();
            expect(isPresent).toBe(true, `Expected the login button to be present, but it was not found.`);;
        });

        await test.step('Login again with a registered user', async () => {
            await loginPage.login(userData.username,userData.password);
            const logOutButton = await loginPage.verifyLogOutButtonIsPresent();
            const accountOverviewTxt = await accountsOverviewPage.verifyAccountsOverviewIsPresent();
            expect(logOutButton).toBe(true, `Expected the logout button to be present, but it was not found.`);
            expect(accountOverviewTxt).toBe(true, `Expected the account overview text to be present, but it was not found.`);
        });

    });

});
