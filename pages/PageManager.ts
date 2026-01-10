import { Page } from "@playwright/test";
import { CheckboxPage } from "./CheckboxPage";
import { RadioButtonPage } from "./RadioButtonPage";
import { TextboxPage } from "./TextboxPage";
import { WebTablePage } from "./WebTablePage";
import { BasePage } from "./BasePage";
import { ButtonsPage } from "./ButtonsPage";
import { LinksPage } from "./LinksPage";
import { BrokenLinksPage } from "./BrokenLinksPage";
import { UploadDownloadPage } from "./UploadDownloadPage";

export class PageManager {
    page: Page;
    checkboxPage: CheckboxPage;
    radiobuttonPage : RadioButtonPage;
    textboxPage : TextboxPage;
    webtablePage: WebTablePage;
    buttonsPage: ButtonsPage;
    linksPage: LinksPage;
    brokenlinksPage: BrokenLinksPage;
    uploaddownloadPage: UploadDownloadPage;

    constructor(page:Page) {
        this.page = page;
        this.checkboxPage = new CheckboxPage(page);
        this.radiobuttonPage = new RadioButtonPage(page);
        this.textboxPage = new TextboxPage(page);
        this.webtablePage = new WebTablePage(page);
        this.buttonsPage = new ButtonsPage(page);
        this.linksPage = new LinksPage(page);
        this.brokenlinksPage = new BrokenLinksPage(page);
        this.uploaddownloadPage = new UploadDownloadPage(page);
    };
};
