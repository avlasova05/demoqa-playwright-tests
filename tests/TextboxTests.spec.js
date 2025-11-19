import {test, expect} from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { TextboxPage } from '../pages/TextboxPage';

test ('submit form with valid data @ui', async ({page}) => {
    const textboxPage = new TextboxPage (page);
    await textboxPage.open();
    await textboxPage.FillUserInfo({
        fullName :'John Doe',
        email : 'example@gmail.com', 
        currentAddress : 'London, Example Street', 
        permanentAddress : 'New York, secondExample Street'});
    await textboxPage.ClickSubmit(); 

    await expect(textboxPage.OutputBox).toBeVisible();
    await expect(page.getByText('Name:John Doe')).toBeVisible();
    await expect(page.getByText('Email:example@gmail.com')).toBeVisible();
    await expect(page.getByText('Current Address :London, Example Street')).toBeVisible();
    await expect(page.getByText('Permananet Address :New York, secondExample Street')).toBeVisible();
}); 

test ('entering special sybmols into Full Name, Current/Permanent Address fields', async({page}) => {
    const textboxPage = new TextboxPage(page);
    await textboxPage.open();
    await textboxPage.FillUserInfo({
        fullName:"John-O'Nelli Doe", 
        currentAddress : "London, street Avenue 16/86-2", 
        permanentAddress : "New York, street Avenue 16/86-2"});
    await textboxPage.ClickSubmit();

    await expect (page.getByText("Name:John-O'Nelli Doe")).toBeVisible();
    await expect(page.locator('#email')).toBeHidden();
    await expect(page.getByText('Current Address :London, street Avenue 16/86-2')).toBeVisible();
    await expect(page.getByText('Permananet Address :New York, street Avenue 16/86-2')).toBeVisible();
});

test ('Submission the form with uppercase case values', async({page}) => {
    const textboxPage = new TextboxPage(page);
    await textboxPage.open();
    await textboxPage.FillUserInfo({
        fullName:"JOHN DOE", 
        email : "EXAMPLE@GMAIL.COM"});
      //  currentAddress : "London, street Avenue 16/86-2", 
      //  permanentAddress : "New York, street Avenue 16/86-2"});
    await textboxPage.ClickSubmit();

    await expect (page.getByText("Name:JOHN DOE")).toBeVisible();
    await expect(page.getByText("Email:EXAMPLE@GMAIL.COM")).toBeVisible();
    await expect(page.getByText('Current Address :')).not.toBeVisible();
    await expect(page.getByText('Permananet Address :')).not.toBeVisible();
});

test ('Fulfilling the "Current Adrdess" field with long text value', async({page}) => {
    const textboxPage = new TextboxPage(page);
    await textboxPage.open();
    await textboxPage.FillUserInfo({ 
        currentAddress : "Example".repeat(17)});
    await textboxPage.ClickSubmit();

    await expect (page.getByText("ExampleExampleExample")).toBeVisible();
    await expect(page.getByText("Name:")).not.toBeVisible();
    await expect(page.getByText('Email:')).not.toBeVisible();
    await expect(page.getByText('Permananet Address :')).not.toBeVisible();
});

test ('email field validation with invalid data @neg',async({page}) => {
    const textboxPage = new TextboxPage(page);
    await textboxPage.open();
    await textboxPage.FillUserInfo({
        fullName : "John Doe",
        email : "example",
        currentAddress : "London", 
        permanentAddress : "New York"
    });
    await textboxPage.ClickSubmit();

    await expect (page.getByText("Name:John Doe")).not.toBeVisible();
    await expect(textboxPage.EmailBox).toHaveClass('mr-sm-2 field-error form-control');
    await expect(page.getByText('Current Address :London')).not.toBeVisible();
    await expect(page.getByText('Permananet Address :New York')).not.toBeVisible();
});

