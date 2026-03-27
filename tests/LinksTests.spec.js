import { BasePage } from "../pages/BasePage";
import { LinksPage } from "../pages/LinksPage";
import {test, expect} from './baseTest';
const {checkAPIRequest} = require ('../helpers/apiHelper');

test.describe('Links Tests', () => {
    test.beforeEach(async ({pm}) => {
        await pm.linksPage.open();
    });

test ('Testing the "Home" link', async ({pm, page}) => {
    const newPage = await pm.linksPage.ClickHomeAndToNewPage();
    await expect(newPage).toHaveURL('https://demoqa.com/');
    await newPage.close();
});

test ('Testing the "HomeiQQ4M" link', async ({pm, page}) => {
    const newPage = await pm.linksPage.ClickHomeiQQ4M();
    await expect(newPage).toHaveURL('https://demoqa.com/');
    await newPage.close();
});

test ('Click "Created" button', async ({pm, page}) => {
    await Promise.all([
        checkAPIRequest(page, 'GET', 201, 'https://demoqa.com/created'),
        pm.linksPage.CreatedApiBtn.click()
    ]);
    await expect(pm.linksPage.apiResponse).toContainText('201');
});

test ('Click "No Content" button', async({pm, page}) => {
    await Promise.all([
        checkAPIRequest(page, 'GET', 204, 'https://demoqa.com/no-content'),
        pm.linksPage.NoContentApiBtn.click()
    ]);
    await expect(pm.linksPage.apiResponse).toContainText('204');
    await expect(pm.linksPage.apiResponse).toContainText('No Content');
});

test ('Click "Moved" Button', async ({pm, page}) => {
    await Promise.all([
        checkAPIRequest(page, 'GET', 301, 'https://demoqa.com/moved'), 
        pm.linksPage.MovedApiBtn.click()
    ]);
    await expect(pm.linksPage.apiResponse).toContainText('301');
    await expect(pm.linksPage.apiResponse).toContainText('Moved Permanently');
});

test ('Click "Bad Request" Button', async ({pm, page}) => {
    await Promise.all([
        checkAPIRequest(page, 'GET', 400, 'https://demoqa.com/bad-request'), 
        pm.linksPage.BadRequestApiBtn.click()
    ]);
    await expect(pm.linksPage.apiResponse).toContainText('400');
    await expect(pm.linksPage.apiResponse).toContainText('Bad Request');
});

test ('Click "Unauthorized" Button', async ({pm, page}) => {
    await Promise.all([
        checkAPIRequest(page, 'GET', 401, 'https://demoqa.com/unauthorized'), 
        pm.linksPage.UnauthorizedApiBtn.click()
    ]);
    await expect(pm.linksPage.apiResponse).toContainText('401');
    await expect(pm.linksPage.apiResponse).toContainText('Unauthorized');
});

test ('Click "Forbidden" Button', async ({pm, page}) => {
    await Promise.all([
        checkAPIRequest(page, 'GET', 403, 'https://demoqa.com/forbidden'), 
        pm.linksPage.ForbiddenApiBtn.click()
    ]);
    await expect(pm.linksPage.apiResponse).toContainText('403');
    await expect(pm.linksPage.apiResponse).toContainText('Forbidden');
});

test ('Click "Not Found" Button', async ({pm, page}) => {
    await Promise.all([
        checkAPIRequest(page, 'GET', 404, 'https://demoqa.com/invalid-url'), 
        pm.linksPage.NotFoundApiBtn.click()
    ]);
    await expect(pm.linksPage.apiResponse).toContainText('404');
    await expect(pm.linksPage.apiResponse).toContainText('Not Found');
});
});