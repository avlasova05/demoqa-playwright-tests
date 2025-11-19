import {BasePage} from "./BasePage";
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
} 