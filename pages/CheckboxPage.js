import {BasePage} from "./BasePage";
import { expect } from "@playwright/test";
export class CheckboxPage extends BasePage{
    constructor(page) {
        super(page);
        this.TickButton = page.locator('.rct-icon.rct-icon-uncheck');
        this.TickedButton = page.locator('.rct-icon.rct-icon-check')
        this.FileButton = page.locator ('.rct-icon.rct-icon-parent-close');
        this.ExpandAllButton = page.locator('.rct-icon.rct-icon-expand-all');
        this.CollapseAllButton = page.locator('.rct-icon.rct-icon-collapse-all');
        this.ToggleButton = page.locator('.rct-icon.rct-icon-expand-close');
        this.subToggleButton = page.locator('.rct-icon.rct-icon-expand-close');
    };
    async open() {
        await this.NavigateTo('/checkbox');
    };

    async ClickHomeCheckbox () {
        await this.TickButton.click();
    };

    async ClickToggleButton() {
        await this.ToggleButton.click();
    }

    async ClickAllSubToggleButtons() {
        const buttons = await this.subToggleButton.all();
        for (const button of buttons) {
        if (await button.isVisible()) {
        await button.click();
        await this.page.waitForTimeout(300);
        }
    }
};

    async ClickExpandAll () {
        await this.ExpandAllButton.click();
    };

    async ClickCollapseAll () {
        await this.CollapseAllButton.click();
    };

    async CheckTickedCheckbox () {
        await expect(this.TickedButton).toBeVisible();
        await expect(this.page.getByText('You have selected :home')).toBeVisible();
    };
};

//TODO: check later
      //async ClickAllSubToggleButtons() {
       // const SubToggleButtons = await this.subToggleButton.all();
        //for (const SubToggle of SubToggleButtons) {
          //  await SubToggle.click();
          //await this.subToggleButton.nth(1).click();
          ///await this.page.waitForTimeout(300);
          //await this.subToggleButton.nth(2).click();
          //await this.page.waitForTimeout(300);
          ////await this.subToggleButton.nth(3).click();
          //await this.page.waitForTimeout(300);
        //} 

    //async CheckAllTitlesAfterToggle () {
       // const TitlesToggle = await this.page.locator('.rct-title');
       // const TextsToggle = await TitlesToggle.allTextContents();
        //expect(TextsToggle).toHaveLength(10);
        //const UniqueTextToggle = [...new Set (TextsToggle)];
        //expect(UniqueTextToggle).toHaveLength(10);
        //const ExpectedTitles = ['Home', 'Desktop','Notes','Commands','Documents','WorkSpace','Office','Downloads','Word File.doc','Excel File.doc'];
        //expect(TextsToggle).toEqual(ExpectedTitles);
        //for (const TextToggle of ExpectedTitles) {
          //  await expect(this.page.getByText(TextToggle)).toBeVisible();
        //}
    //};
//};
   

