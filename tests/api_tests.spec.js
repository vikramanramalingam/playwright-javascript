const { test,expect,request } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { PageHelper }  = require('../utils/PageHelper');
const { TestDataHelper }  = require('../utils/TestDataHelper');
const { RegisterPage } = require('../pages/RegisterPage');
const { HomePage } = require('../pages/HomePage');
const { AccountsOverview } = require('../pages/AccountsOverview');
const { OpenNewAccount } = require('../pages/OpenNewAccount');
const { TransferFunds } = require('../pages/TransferFunds');
const { BillPay } = require('../pages/BillPay');
const { TransactionsApi } = require('../api/TransactionsApi');
const { AccountsApi } = require('../api/AccountsApi');
const { CustomerApi } = require('../api/CustomerApi');

test.describe('End to End tests - Spec', ()=> {

    /** @type {import('@playwright/test').Page} */
    let page;
    let apiRequestContext;
    let loginPage;
    let registerPage;
    let transactionsApi;
    let accountsApi;
    let customerApi
    let userData;
    let customerId;
    let oldAccountId;
    let newAccountId;
    const TRANSFER_AMOUNT = 10;


    test.beforeAll(async ({ browser, baseURL }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        await PageHelper.goTo(page,baseURL);
        loginPage = new LoginPage(page);
        registerPage = new RegisterPage(page);
        apiRequestContext = await request.newContext();
        transactionsApi = new TransactionsApi(apiRequestContext);
        accountsApi = new AccountsApi(apiRequestContext);
        customerApi = new CustomerApi(apiRequestContext);
        userData = TestDataHelper.generateUserData();
        await loginPage.clickRegisterLink();
        await registerPage.registerNewUser(userData);

    });

    test.afterAll(async ()=> {
        page.close();
        await apiRequestContext.dispose();
    });

    test('Create a new savings account and make a fund transfer', async () => {

        await test.step('create a new savings account', async () => {
            customerId = await customerApi.getCustomerId(userData.username, userData.password);
            var response = await customerApi.getCustomerAccounts(customerId);
            var responseBody = await response.json();
            oldAccountId = responseBody[0]['id'];
            newAccountId = await accountsApi.createAccount(customerId,2,oldAccountId)
        });

        await test.step('Transfer funds from old account to new account', async () => {
            await transactionsApi.transferFunds(oldAccountId,newAccountId,TRANSFER_AMOUNT);
            var response = await transactionsApi.getTransactionsByAmount(newAccountId,TRANSFER_AMOUNT);
            const responseBody = await response.json();
            expect(response.status()).toBe(200, `Expected status code to be 200, but received ${response.status()}`);
            expect(responseBody[0]['accountId'].toString()).toEqual(newAccountId, `Expected accountId to be "${newAccountId}", but received "${responseBody[0]['accountId']}"`);
            expect(responseBody[0]['amount']).toEqual(TRANSFER_AMOUNT, `Expected amount to be "${TRANSFER_AMOUNT}", but received "${responseBody[0]['amount']}"`);
        });


    });

});
