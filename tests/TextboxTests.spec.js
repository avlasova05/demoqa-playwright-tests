import {test, expect} from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { TextboxPage } from '../pages/TextboxPage';

test ('submit form with valid data @ui', async ({page}) => {
    const textboxPage = new TextboxPage (page);
    await textboxPage.open();
    await textboxPage.FillUserInfo('John Doe', 'example@gmail.com', 'London, Example Street', 'New York, secondExample Street');
    await textboxPage.ClickSubmit(); 

    await expect(page.getByText('Name:John Doe')).toBeVisible();
    await expect(page.getByText('Email:example@gmail.com')).toBeVisible();
    await expect(page.getByText('Current Address :London, Example Street')).toBeVisible();
    await expect(page.getByText('Permananet Address :New York, secondExample Street')).toBeVisible();
}); 