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

test.describe('End to End tests - Spec', ()=> {

    /** @type {import('@playwright/test').Page} */
    let page;
    let apiRequestContext;
    let loginPage;
    let registerPage;
    let homePage;
    let accountsOverviewPage;
    let openNewAccountPage;
    let transferFundsPage;
    let billPay;
    let transactionsApi;
    let userData;
    let newAccountNo;
    let accountBalance;
    let finalAccountBalance;
    let payeeDetails;
    const TRANSFER_AMOUNT = 10;
    const BILL_AMOUNT = 20;

    // services page header texts
    const services_headers = [
        "Available Bookstore SOAP services:",
        "Bookstore services:",
        "Available ParaBank SOAP services:",
        "ParaBank services:",
        "Available RESTful services:"
    ];
    // adming page section texts
    const admin_sections = [
        "Data Access Mode",
        "Web Service",
        "Application Settings"
    ];

    test.beforeAll(async ({ browser, baseURL }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        await PageHelper.goTo(page,baseURL);
        loginPage = new LoginPage(page);
        registerPage = new RegisterPage(page);
        homePage = new HomePage(page);
        accountsOverviewPage = new AccountsOverview(page);
        openNewAccountPage = new OpenNewAccount(page);
        transferFundsPage = new TransferFunds(page);
        billPay = new BillPay(page);
        apiRequestContext = await request.newContext();
        transactionsApi = new TransactionsApi(apiRequestContext);
        // Test data to registed a new user
        userData = TestDataHelper.generateUserData();
        // Register a new user
        await loginPage.clickRegisterLink();
        await registerPage.registerNewUser(userData);

    });

    test.afterAll(async ()=> {
        page.close();
        await apiRequestContext.dispose();
    });

    test('Verify user is able to open a new savings account', async () => {

        await test.step('open a new savings account', async () => {
            await homePage.goToOpenNewAccount();
            await openNewAccountPage.openSavingsAccount();
            newAccountNo = await openNewAccountPage.getAccountNumber();
            const accountOpeningMessage = await openNewAccountPage.getAccountOpenedMsg();
            expect(accountOpeningMessage).toEqual("Account Opened!", `Expected account to be opened with message "Account Opened!", but received: ${accountOpeningMessage}`);
        });

        await test.step('Go to accounts overview and verify account number is present', async () => {
            await homePage.goToAccountsOverview();
            accountBalance = await accountsOverviewPage.getAccountBalance(newAccountNo);
            const isAccountPresent = await accountsOverviewPage.verifyAccountNoIsPresent(newAccountNo);
            expect(isAccountPresent).toBe(true, `Expected to find account number ${newAccountNo} in the table, but it was not found.`);
        });

    });

    test('Verify user is able to transfer funds and pay bills from newly created account', async ()=> {

        await test.step('Transfer funds from the newly created savings account', async () => {
            await homePage.goToTransferFunds();
            await transferFundsPage.transferFunds(TRANSFER_AMOUNT,newAccountNo);
            const transferSuccessMsg = await transferFundsPage.getTransferSuccessMessage();
            expect(transferSuccessMsg).toEqual('Transfer Complete!', `Expected transfer to be successful with "${transferSuccessMsg}" message, but it was not found.`);
        });

        await test.step('Verify account balance is reflecting correct balance after the fund transfer', async () => {
            await homePage.goToAccountsOverview();
            const numericActualBal = parseFloat(accountBalance.replace('$', '').trim());
            finalAccountBalance = numericActualBal - TRANSFER_AMOUNT;
            const currentBal = await accountsOverviewPage.getAccountBalance(newAccountNo);
            const currentBalNumeric = parseFloat(currentBal.replace('$', '').trim());
            expect(currentBalNumeric).toBeCloseTo(finalAccountBalance, 2, `Expected remaining balance to be close to ${finalAccountBalance}, but got ${currentBalNumeric}`);
        });

         await test.step('Go to pay bills and pay the bill', async () => {
            payeeDetails = TestDataHelper.generatePayeeData();
            await homePage.goToBillPay();
            await billPay.payBill(payeeDetails, BILL_AMOUNT, newAccountNo );
            const successMsg = await billPay.getBillPaidSuccessMessage();
            expect(successMsg).toEqual('Bill Payment Complete', `Expected transfer to be successful with "${successMsg}" message, but it was not found.`);
        });

        await test.step('Verify account balance is reflecting correct balance after the bill is paid', async () => {
            await homePage.goToAccountsOverview();
            const expectedBal = finalAccountBalance - BILL_AMOUNT;
            const currentBal = await accountsOverviewPage.getAccountBalance(newAccountNo);
            const currentBalNumeric = parseFloat(currentBal.replace('$', '').trim());
            expect(currentBalNumeric).toBeCloseTo(expectedBal, 2, `Expected remaining balance to be close to ${expectedBal}, but got ${currentBalNumeric}`);
        });

        await test.step('Verify the bill payment by making an api call to transaction api', async () => {
            var response = await transactionsApi.getTransactionsByAmount(newAccountNo,BILL_AMOUNT);
            const responseBody = await response.json();
            expect(response.status()).toBe(200, `Expected status code to be 200, but received ${response.status()}`);
            expect(responseBody[0]['accountId'].toString()).toEqual(newAccountNo, `Expected accountId to be "${newAccountNo}", but received "${responseBody[0]['accountId']}"`);
            expect(responseBody[0]['amount']).toEqual(BILL_AMOUNT, `Expected amount to be "${BILL_AMOUNT}", but received "${responseBody[0]['amount']}"`);
            expect(responseBody[0]['description']).toEqual('Bill Payment to ' + `${payeeDetails.firstName}`, `Expected description to be "Bill Payment to ${payeeDetails.firstName}", but received "${responseBody[0]['description']}"`);

        });

    });

    test('Verify user is able to navigate to different global sections', async ()=> {

        await test.step('Go to about us section', async () => {
            await homePage.goToAboutUs();
            const aboutUsHeaderText = await homePage.getAboutUsHeaderText();
            expect(aboutUsHeaderText).toEqual("ParaSoft Demo Website", "User did not land on the About page.");
        });

        await test.step('Go to services section', async () => {
            await homePage.goToServices();
            const servicesHeaderText = await homePage.getServicesHeaderText();
            console.log(servicesHeaderText);
            services_headers.forEach((services_header, index) => {
                expect(servicesHeaderText[index]).toEqual(services_header, `Header name at index ${index} is not expected`);
            });
        });

        await test.step('Go to admin section', async () => {
            await homePage.goToAdminPage();
            const adminPageHeaderText = (await homePage.getAdminPageHeaderText()).trim();
            const adminPageSectionTexts = await homePage.getAdminPageSectionsTexts();
            expect(adminPageHeaderText).toEqual("Administration", "User did not land on the Admin page.");
            admin_sections.forEach((admin_section, index) => {
                expect(adminPageSectionTexts[index].trim()).toEqual(admin_section, `Section name at index ${index} is not expected`);
            });
        });

        await test.step('Go to products section', async () => {
            await homePage.goToProductsPage();
            const productsPageText = await homePage.getProductsPageHeaderText();
            expect(productsPageText).toEqual("Products", "User did not land on the Products page.");
        });

    });

});
