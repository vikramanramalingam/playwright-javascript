const { test,expect,request } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { PageHelper }  = require('../../utils/PageHelper');
const { TestDataHelper }  = require('../../utils/TestDataHelper');
const { RegisterPage } = require('../../pages/RegisterPage');
const { TransactionsApi } = require('../../api/TransactionsApi');
const { AccountsApi } = require('../../api/AccountsApi');
const { CustomerApi } = require('../../api/CustomerApi');

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
            var accountRes = await customerApi.getCustomerAccounts(customerId);
            var accountResBody = await accountRes.json();
            oldAccountId = accountResBody[0]['id'];
            var newAccountResBody = await accountsApi.createAccount(customerId,1,oldAccountId)
            newAccountId = newAccountResBody['id'];
        });

        await test.step('Transfer funds from old account to new account', async () => {
            await transactionsApi.transferFunds(oldAccountId,newAccountId,TRANSFER_AMOUNT);
            var transactionRes = await transactionsApi.getTransactionsByAmount(newAccountId,TRANSFER_AMOUNT);
            const transactionResBody = await transactionRes.json();
            expect(transactionRes.status()).toBe(200, `Expected status code to be 200, but received ${transactionRes.status()}`);
            expect(transactionResBody[0]['accountId'].toString()).toEqual(newAccountId.toString(), `Expected accountId to be "${newAccountId}", but received "${transactionResBody[0]['accountId']}"`);
            expect(transactionResBody[0]['amount']).toEqual(TRANSFER_AMOUNT, `Expected amount to be "${TRANSFER_AMOUNT}", but received "${transactionResBody[0]['amount']}"`);
        });


    });

});
