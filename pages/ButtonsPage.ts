import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";
import { Locator } from "@playwright/test";

export class ButtonsPage extends BasePage {
    DoubleClickButton: Locator;
    RightClickBtn: Locator;
    ClickMeBtn: Locator;
    constructor(page) {
        super(page);
        this.DoubleClickButton = page.locator ('#doubleClickBtn');
        this.RightClickBtn = page.locator('#rightClickBtn');
        this.ClickMeBtn = page.getByText('Click Me').nth(2);
    };
    async open() {
        await this.NavigateTo('/buttons');
    };

    async DoubleClick () {
        await this.DoubleClickButton.dblclick();
    };

    async RightClick () {
        await this.RightClickBtn.click({button : 'right'});
    };

    async ClickMeClick () {
        await this.ClickMeBtn.click();
    };
};