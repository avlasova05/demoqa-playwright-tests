import { test, expect } from "@playwright/test";
import { BasePage } from "../pages/BasePage";
import { CheckboxPage } from "../pages/CheckboxPage";

test ('tick the "Home" checkbox', async ({page}) => {
    const checkboxPage = new CheckboxPage(page);
    await checkboxPage.open();
    await checkboxPage.ClickHomeCheckbox();
    await expect (page.locator('#result')).toContainText('You have selected :home');
    //await expect(page.getByText('You have selected : home desktop notes commands documents workspace react angular veu office public private classified general downloads wordFile excelFile')).toBeVisible();
});

test ('opening the tree', async ({page}) => {
    const checkboxPage = new CheckboxPage(page);
    await checkboxPage.open();
    await checkboxPage.ClickToggleButton();

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

test ("Opening the 'Desktop', 'Documents' and 'Downloads' fields", async({page}) => {
    const checkboxPage = new CheckboxPage(page);
    await checkboxPage.open();
    await checkboxPage.ClickToggleButton();
    await page.waitForTimeout(2000);
    await checkboxPage.ClickAllSubToggleButtons();
    await page.screenshot({path:'screenshots/after_clicking.png', fullPage: true});
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

test ('Clicking the "Expand All" and "Collapse All"', async ({page}) => {
    const checkboxPage = new CheckboxPage(page);
    await checkboxPage.open();
    await checkboxPage.ClickExpandAll();
    await expect(page.getByText('WorkSpace')).toBeVisible();
    await page.screenshot({path:'screenshots/expand_all.png', fullPage: true});
    await checkboxPage.ClickCollapseAll();
    await expect(page.getByText('WorkSpace')).not.toBeVisible();
    await page.screenshot({path:'screenshots/collapse_all.png', fullPage: true});
});

test ('Ticking the checkbox near to "Home"', async ({page}) => {
    const checkboxPage = new CheckboxPage(page);
    await checkboxPage.open();
    await checkboxPage.TickTheCheckbox();
    await checkboxPage.CheckTickedCheckbox();
    await page.screenshot({path:'screenshots/ticking_checkbox.png', fullPage: true});
});