import {BasePage} from "./BasePage";
export class TextboxPage extends BasePage{
    constructor(page) {
        super(page);
        this.FullNameBox = page.locator ('#userName');
        this.EmailBox = page.locator ('#userEmail');
        this.CurrentAddressBox = page.locator ('#currentAddress');
        this.PermanentAdressBox = page.locator ('#permanentAddress');
        this.SubmitButton = page.locator ('#submit');
        this.NavigationBarButton = page.locator ('.navbar-toggler-icon');
    };
    async open() {
        await this.NavigateTo ('/text-box');
    };
    async FillUserInfo (fullName, email, currentAdress, permAdress) {
        await this.FullNameBox.fill (fullName);
        await this.EmailBox.fill (email);
        await this.CurrentAddressBox.fill (currentAdress);
        await this.PermanentAdressBox.fill (permAdress);
    };
    async ClickSubmit () {
        await this.SubmitButton.click();
    }
} 