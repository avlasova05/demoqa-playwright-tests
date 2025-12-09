import {test, expect} from './baseTest';
import { BasePage } from "../pages/BasePage";
import { RadioButtonPage } from "../pages/RadioButtonPage";

test.describe('Radiobutton Tests', () => {
    test.beforeEach (async ({pm}) => {
        await pm.radiobuttonPage.open();
    });

test ('click "Yes" button', async({pm, page}) => {
    await pm.radiobuttonPage.ClickYesButton();
    await expect(page.getByText('You have selected Yes')).toBeVisible();
});

test ('click "Impressive" button', async({pm, page}) => {
    await pm.radiobuttonPage.ClickImpressiveButton();
    await expect(page.getByText('You have selected Impressive')).toBeVisible();
});

test ('check the title of the page', async ({pm, page}) => {
    await expect (pm.radiobuttonPage.title).toBeVisible();
});

test ('click "No" button', async({pm, page}) => {
    await expect(pm.radiobuttonPage.NoButtonInput).toBeDisabled();
    await expect(page.getByText('You have selected')).not.toBeVisible();
});
});

