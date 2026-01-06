import {test, expect} from './baseTest';
import { BasePage } from '../pages/BasePage';
import { ButtonsPage } from '../pages/ButtonsPage';

test.describe ('Buttons Tests', () => {
    test.beforeEach (async ({pm}) => {
        await pm.buttonsPage.open();
    });
  
test ('Double Click Button Check', async ({page, pm}) => {
    await pm.buttonsPage.DoubleClick();
    await expect(page.getByText('You have done a double click')).toBeVisible();
});

test ('Right Click Button Check', async ({pm, page}) => {
    await pm.buttonsPage.RightClick();
    await expect(page.getByText('You have done a right click')).toBeVisible();
});

test ('Click Me Button Check', async ({pm, page}) => {
    await pm.buttonsPage.ClickMeClick();
    await expect(page.getByText('You have done a dynamic click')).toBeVisible();
});
});