import { BasePage } from "../pages/BasePage";
import { CheckboxPage } from "../pages/CheckboxPage";
import {test, expect} from './baseTest';

test.describe('Checkbox Tests', () => {
    test.beforeEach(async ({pm}) => {
        await pm.checkboxPage.open();
    });

test ('tick the "Home" checkbox', async ({pm, page}) => {
    await pm.checkboxPage.ClickHomeCheckbox();
    await expect (page.locator('#result')).toContainText('You have selected :home');
    //await expect(page.getByText('You have selected : home desktop notes commands documents workspace react angular veu office public private classified general downloads wordFile excelFile')).toBeVisible();
});

test ('opening the tree', async ({pm, page}) => {
    await pm.checkboxPage.ClickToggleButton();

    const titles = page.locator('.rct-title');
    const texts = await titles.allTextContents();
    expect(texts).toHaveLength(4);
    const UniqueTexts = [...new Set(texts)];
    expect (UniqueTexts).toHaveLength(4);
    const expectedTexts = ['Home', 'Desktop', 'Documents', 'Downloads'];
    await expect(texts).toEqual(expectedTexts);
    for (const text of expectedTexts) {
        await expect(page.getByText(text)).toBeVisible();
    };
});

test ("Opening the 'Desktop', 'Documents' and 'Downloads' fields", async({pm, page}) => {
    await pm.checkboxPage.ClickToggleButton();
    await page.waitForTimeout(2000);
    await pm.checkboxPage.ClickAllSubToggleButtons();
    //await page.screenshot({path:'screenshots/after_clicking.png', fullPage: true});
    //const TitlesToggle = await page.locator('.rct-title');
    //const TextsToggle = await TitlesToggle.allTextContents();
    //expect(TextsToggle).toHaveLength(10);
    //const UniqueTextToggle = [...new Set (TextsToggle)];
    //expect(UniqueTextToggle).toHaveLength(10);
    //const ExpectedTitles = ['Home', 'Desktop','Notes','Commands','Documents','WorkSpace','Office','Downloads','Word File.doc','Excel File.doc'];
    //expect(TextsToggle).toEqual(ExpectedTitles);
    //for (const TextToggle of ExpectedTitles) {
       // await expect(page.getByText(TextToggle)).toBeVisible();
    //}
});

test ('Clicking the "Expand All" and "Collapse All"', async ({pm, page}) => {
    await pm.checkboxPage.ClickExpandAll();
    await expect(page.getByText('WorkSpace')).toBeVisible();
    await pm.checkboxPage.ClickCollapseAll();
    await expect(page.getByText('WorkSpace')).not.toBeVisible();
});

test ('Ticking the checkbox near to "Home"', async ({pm, page}) => {
    await pm.checkboxPage.ClickHomeCheckbox();
    await pm.checkboxPage.CheckTickedCheckbox();
});
});