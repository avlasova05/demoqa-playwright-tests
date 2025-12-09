import {test as base, expect as baseExpect} from '@playwright/test';
import { PageManager } from '../pages/PageManager';

type MyFixtures = {
    pm: PageManager;
};

export const test = base.extend<MyFixtures> ({
    pm: async ({page}, use) => {
        const pageManager = new PageManager(page);
        await use(pageManager);
    },
});
export {baseExpect as expect};