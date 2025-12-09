import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";
export class RadioButtonPage extends BasePage {
    constructor(page) {
        super(page);
        this.YesButton = page.locator('label[for = "yesRadio"]');
        this.ImpressiveButton = page.locator('label[for = "impressiveRadio"]');
        this.NoButton = page.locator('label[for = "noRadio"]');
        this.title = page.locator('.text-center');
        this.NoButtonInput = page.locator('#noRadio');
    };
    async open() {
        await this.NavigateTo ('/radio-button');
    };
    async ClickYesButton () {
        await this.YesButton.click();
    };
    async ClickImpressiveButton () {
        await this.ImpressiveButton.click();
    };
    async ClickNoButton () {
        await this.NoButton.click();
    };


}