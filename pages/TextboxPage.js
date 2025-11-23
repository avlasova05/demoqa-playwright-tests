import {BasePage} from "./BasePage";
import { expect } from "@playwright/test";
export class TextboxPage extends BasePage{
    constructor(page) {
        super(page);
        this.FullNameBox = page.locator ('#userName');
        this.EmailBox = page.locator ('#userEmail');
        this.CurrentAddressBox = page.locator ('#currentAddress');
        this.PermanentAddressBox = page.locator ('#permanentAddress');
        this.SubmitButton = page.locator ('#submit');
        this.NavigationBarButton = page.locator ('.navbar-toggler-icon');
        this.OutputBox = page.locator('#output');
    };
    async open() {
        await this.NavigateTo ('/text-box');
    };
    async FillUserInfo (userInfo) {
        if (userInfo.fullName) {
            await this.FullNameBox.fill (userInfo.fullName);
        }
        if (userInfo.email) {
            await this.EmailBox.fill (userInfo.email);
        }
        if (userInfo.currentAddress) {
            await this.CurrentAddressBox.fill (userInfo.currentAddress);
        }
        if (userInfo.permanentAddress) {
            await this.PermanentAddressBox.fill (userInfo.permanentAddress);
        }
    }
//    async FillUserInfo (fullName, email, currentAdress, permAdress) {
//        await this.FullNameBox.fill (fullName);
//        await this.EmailBox.fill (email);
//        await this.CurrentAddressBox.fill (currentAdress);
//        await this.PermanentAddressBox.fill (permAdress);
//    };
    async ClickSubmit () {
        await this.SubmitButton.click();
    }
    async CheckCurrAddressInsideOutput (expectedAddress) {
        if(!expectedAddress) {
            throw new Error ('no address was found')
        }

        const OutputAddressText = this.page.locator('#currentAddress.mb-1');
        await expect (OutputAddressText).toBeVisible();
        await expect (OutputAddressText).toContainText(`Current Address :${expectedAddress}`);
        const OutputBorders = await this.OutputBox.boundingBox();
        const AddressBorders = await OutputAddressText.boundingBox();

        if (!OutputBorders || !AddressBorders) {
            throw new Error('Error to get border sizes of elements')
        }

        const isInside = 
        AddressBorders.x >= OutputBorders.x && 
        AddressBorders.y >= OutputBorders.y &&
        AddressBorders.x + AddressBorders.width <= OutputBorders.x + OutputBorders.width &&
        AddressBorders.y + AddressBorders.height <= OutputBorders.y + OutputBorders.height;

        const textOverAddress = await OutputAddressText.evaluate ((element) => {
            const range = document.createRange();
            range.selectNodeContents(element);
            const textBorders = range.getBoundingClientRect();

            const elementBorders = element.getBoundingClientRect();
            return textBorders.width > elementBorders.width || textBorders.height > elementBorders.height;
        });

        if (!isInside || textOverAddress) {
            await this.page.screenshot ({
                path: 'screenshots/bug-CurrentAddressBorders.png',
                fullPage: false
            });

            throw new Error ('Current Address is not inside outbox');
        }
        console.log (`Text ${expectedAddress} is inside output`);
        return true;
    };

    async CheckCorrectnessOfPermAddress () {
        const PermAddresOutput = this.page.locator('#permanentAddress.mb-1');
        await expect(PermAddresOutput).toBeVisible();
        const actualText = await PermAddresOutput.textContent(); 
        if (actualText && actualText.includes('Permanent Address :')) {
            return true;
        } else {
            await this.page.screenshot ({
                path: 'screenshots/bug-CorrectnessOfPermAddress-bug.png',
                fullPage: false
            });
            throw new Error('Permanent Address is written incorrectly');
        };
    };
}; 