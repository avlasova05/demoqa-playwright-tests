import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";
export class LinksPage extends BasePage {
    constructor(page) {
        super(page);
        this.HomeBtn = page.locator ('#simpleLink');
        this.HomeiQQ4MBtn = page.locator('#dynamicLink');
        this.CreatedApiBtn = page.locator('#created');
        this.NoContentApiBtn = page.locator('#no-content');
        this.MovedApiBtn = page.locator('#moved');
        this.BadRequestApiBtn = page.locator('#bad-request');
        this.UnauthorizedApiBtn = page.locator('#unauthorized');
        this.ForbiddenApiBtn = page.locator('#forbidden');
        this.NotFoundApiBtn = page.locator('#invalid-url');
        this.apiResponse = page.locator('#linkResponse');
    };
    async open() {
        await this.NavigateTo ('/links');
    };

    async ClickHomeAndToNewPage () {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.HomeBtn.click()
        ]);
        await newPage.waitForLoadState('load');
        return newPage;
    }

    async ClickHomeiQQ4M () {
        const [newPage] = await Promise.all ([
            this.page.context().waitForEvent('page'), 
            this.HomeiQQ4MBtn.click()
        ]);
        await newPage.waitForLoadState('load');
        return newPage;
    }



}