import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";
export class WebTablePage extends BasePage {
    constructor(page) {
        super(page);
        this.AddButton = page.locator ('#addNewRecordButton');
        this.FirstNameField = page.locator('#firstName');
        this.LastNameField = page.locator('#lastName');
        this.EmailField = page.locator('#userEmail');
        this.AgeField = page.locator('#age');
        this.SalaryField = page.locator('#salary')
        this.DepartmentField = page.locator('#department');
        this.SubmitButton = page.locator('#submit');
        this.EditButton = page.locator('#edit-record-1');
        this.DeleteButton = page.locator('#delete-record-1');
    };
    async open() {
        await this.NavigateTo ('/webtables');
    };
    async FillWebTable (userInfo) {
        if (userInfo.firstName) {
            await this.FirstNameField.fill (userInfo.firstName);
        };
        if (userInfo.lastName) {
            await this.LastNameField.fill (userInfo.lastName);
        };
        if (userInfo.email) {
            await this.EmailField.fill (userInfo.email);
        };
        if (userInfo.age) {
            await this.AgeField.fill (userInfo.age);
        };
        if (userInfo.salary) {
            await this.SalaryField.fill (userInfo.salary);
        };
        if (userInfo.department) {
            await this.DepartmentField.fill (userInfo.department);
        };
    };
    async ClickAddForm (){
        await this.AddButton.click();
    };
    async ClickSubmitForm () {
        await this.SubmitButton.click();
    };
    async ClickEditButton () {
        await this.EditButton.click();
    };
    async ClickDeleteButton() {
        await this.DeleteButton.click();
    };
};