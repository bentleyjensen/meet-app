import puppeteer from 'puppeteer';

const pupOpts = {
    headless: true,
    // slowMo: 100, // slow down by 250ms
}

describe('Show/Hide Event Details', () => {
    let browser, page;

    beforeAll(async () => {
        jest.setTimeout(10000);

        browser = await puppeteer.launch(pupOpts);

        page = await browser.newPage();
        page.goto('http://localhost:3000');
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    });

    test('An event element is collapsed by default', async () => {
        const eventDetails = await page.$('.event .description');
        expect(eventDetails).toBeNull();
    }, 10000);

    test('User can expand an event to see details', async () => {
        await page.click('.event .detailsButton');

        const eventDetails = await page.$('.event .description');
        expect(eventDetails).toBeDefined();
    }, 10000);

    test('An event can be collapsed to hide details', async () => {
        let eventDetails = await page.$('.event .description');
        expect(eventDetails).toBeDefined();

        await page.click('.event .detailsButton');

        eventDetails = await page.$('.event .description');
        expect(eventDetails).toBeNull();
    }, 10000);
});
