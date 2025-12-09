import {test, expect} from './baseTest';
import { BasePage } from '../pages/BasePage';
import { TextboxPage } from '../pages/TextboxPage';

test.describe('Textbox Tests', () => {
    test.beforeEach (async ({pm}) => {
        await pm.textboxPage.open();
})

test ('submit form with valid data @pos', async ({pm, page}) => {
    await pm.textboxPage.FillUserInfo({
        fullName :'John Doe',
        email : 'example@gmail.com', 
        currentAddress : 'London, Example Street', 
        permanentAddress : 'New York, secondExample Street'});
    await pm.textboxPage.ClickSubmit(); 

    await expect(pm.textboxPage.OutputBox).toBeVisible();
    await expect(page.getByText('Name:John Doe')).toBeVisible();
    await expect(page.getByText('Email:example@gmail.com')).toBeVisible();
    await expect(page.getByText('Current Address :London, Example Street')).toBeVisible();
    await expect(page.getByText('Permananet Address :New York, secondExample Street')).toBeVisible();
}); 

test ('entering special sybmols into Full Name, Current/Permanent Address fields @pos', async({pm, page}) => {
    await pm.textboxPage.FillUserInfo({
        fullName:"John-O'Nelli Doe", 
        currentAddress : "London, street Avenue 16/86-2", 
        permanentAddress : "New York, street Avenue 16/86-2"});
    await pm.textboxPage.ClickSubmit();

    await expect (page.getByText("Name:John-O'Nelli Doe")).toBeVisible();
    await expect(page.locator('#email')).toBeHidden();
    await expect(page.getByText('Current Address :London, street Avenue 16/86-2')).toBeVisible();
    await expect(page.getByText('Permananet Address :New York, street Avenue 16/86-2')).toBeVisible();
});

test ('Submission the form with uppercase case values @pos', async({pm, page}) => {
    await pm.textboxPage.FillUserInfo({
        fullName:"JOHN DOE", 
        email : "EXAMPLE@GMAIL.COM"});
    await pm.textboxPage.ClickSubmit();

    await expect (page.getByText("Name:JOHN DOE")).toBeVisible();
    await expect(page.getByText("Email:EXAMPLE@GMAIL.COM")).toBeVisible();
    await expect(page.getByText('Current Address :')).not.toBeVisible();
    await expect(page.getByText('Permananet Address :')).not.toBeVisible();
});

test ('Fulfilling the "Current Adrdess" field with long text value @pos', async({pm, page}) => {
    await pm.textboxPage.FillUserInfo({ 
        currentAddress : "Example".repeat(17)});
    await pm.textboxPage.ClickSubmit();

    await expect (page.getByText("ExampleExampleExample")).toBeVisible();
    await expect(page.getByText("Name:")).not.toBeVisible();
    await expect(page.getByText('Email:')).not.toBeVisible();
    await expect(page.getByText('Permananet Address :')).not.toBeVisible();
});

test ('email field validation with invalid data @neg',async({pm, page}) => {
    await pm.textboxPage.FillUserInfo({
        fullName : "John Doe",
        email : "example",
        currentAddress : "London", 
        permanentAddress : "New York"
    });
    await pm.textboxPage.ClickSubmit();

    await expect (page.getByText("Name:John Doe")).not.toBeVisible();
    await expect(pm.textboxPage.EmailBox).toHaveClass('mr-sm-2 field-error form-control');
    await expect(page.getByText('Current Address :London')).not.toBeVisible();
    await expect(page.getByText('Permananet Address :New York')).not.toBeVisible();
});

test ('Form submission with empty "Full Name" field @neg', async ({pm, page})=> {
    await pm.textboxPage.FillUserInfo({
        email:"example@gmail.com",
        currentAddress:"London",
        permanentAddress:"New York"
    });
    await pm.textboxPage.ClickSubmit();

    await expect(page.locator('#name')).not.toBeVisible();
    await expect(page.getByText("Email:example@gmail.com")).toBeVisible();
    await expect(page.getByText('Current Address :London')).toBeVisible();
    await expect(page.getByText('Permananet Address :New York')).toBeVisible();
});

test('Entering special symbols into "Email" field @neg', async ({pm, page}) => {
    await pm.textboxPage.FillUserInfo({
        email:"example!@gmail.com"
    })
    await pm.textboxPage.ClickSubmit();

    await expect(pm.textboxPage.EmailBox).toHaveClass('mr-sm-2 field-error form-control');
    await expect(page.locator('#output')).not.toBeVisible();
});

test('Fullfilling the form with long text input @ui', async ({pm, page}) => {
    const longAddress = "Example".repeat(17);
    await pm.textboxPage.FillUserInfo({
        fullName :"John Doe",
        currentAddress: longAddress
    });
    await pm.textboxPage.ClickSubmit();

    await expect(page.getByText('Name:John Doe')).toBeVisible();
    await pm.textboxPage.CheckCurrAddressInsideOutput(longAddress);
});

test ('Correctness of "Permanent Address" name of field in output box @ui', async({pm, page}) => {
    await pm.textboxPage.FillUserInfo({
        permanentAddress:"New York"
    });
    pm.textboxPage.ClickSubmit();
    await pm.textboxPage.CheckCorrectnessOfPermAddress();
});
});