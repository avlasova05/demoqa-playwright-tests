import {test, expect} from './baseTest';
import { BasePage } from '../pages/BasePage';
import { WebTablePage } from '../pages/WebTablePage';

test.describe ('Webtable Tests', () => {
    test.beforeEach (async ({pm}) => {
        await pm.webtablePage.open();
    });

test ('fullfilling the Web Table', async ({pm, page}) => {
    await pm.webtablePage.ClickAddForm();
    await pm.webtablePage.FillWebTable ({
        firstName : 'John',
        lastName : 'Doe',
        email : 'example@gmail.com',
        age: '18',
        salary : '1000',
        department : 'QA'
    });
    await pm.webtablePage.ClickSubmitForm();
    await expect (pm.webtablePage.FirstNameField).toHaveValue('John');
    await expect (pm.webtablePage.LastNameField).toHaveValue('Doe');
    await expect (pm.webtablePage.EmailField).toHaveValue('example@gmail.com');
    await expect (pm.webtablePage.AgeField).toHaveValue('18');
    await expect (pm.webtablePage.SalaryField).toHaveValue('1000');
    await expect (pm.webtablePage.DepartmentField).toHaveValue('QA');

    const row = page.locator('.rt-tr-group').filter ({hasText:'example@gmail.com'});
    await expect(row).toContainText('John');
    await expect(row).toContainText('Doe');
    await expect(row).toContainText('example@gmail.com');
    await expect(row).toContainText('18');
    await expect(row).toContainText('1000');
});

test('deleting the user', async ({pm, page}) => {
    await pm.webtablePage.ClickDeleteButton();
    await expect(page.getByText('Cierra')).not.toBeVisible();
    await expect(page.getByText('Alden')).toBeVisible();
});

test ('editing the registration form', async ({pm, page}) => {
    await pm.webtablePage.ClickEditButton();
});
});