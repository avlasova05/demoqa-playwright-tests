import { Page } from "@playwright/test";
import { CheckboxPage } from "./CheckboxPage";
import { RadioButtonPage } from "./RadioButtonPage";
import { TextboxPage } from "./TextboxPage";
import { WebTablePage } from "./WebTablePage";
import { BasePage } from "./BasePage";

export class PageManager {
    page: Page;
    checkboxPage: CheckboxPage;
    radiobuttonPage : RadioButtonPage;
    textboxPage : TextboxPage;
    webtablePage: WebTablePage;

    constructor(page:Page) {
        this.page = page;
        this.checkboxPage = new CheckboxPage(page);
        this.radiobuttonPage = new RadioButtonPage(page);
        this.textboxPage = new TextboxPage(page);
        this.webtablePage = new WebTablePage(page);
    }
}
