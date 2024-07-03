// src/__tests__/EndToEnd.test.js
import puppeteer from 'puppeteer';

describe('show/hide event details', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250,
      timeout: 0
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000');
    await page.waitForSelector('.event');
  });

  afterAll(async () => {
    await browser.close();
  });

  test('An event element is collapsed by default', async () => {
    const event = await page.$('.event');
    const eventDetails = await event.$('.event-details');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    const event = await page.$('.event');
    console.log('Event HTML:', await event.evaluate(node => node.innerHTML));

    const detailsButton = await event.$('button');
    console.log('Details button:', detailsButton);

    expect(detailsButton).not.toBeNull(); // Ensure the details button exists

    await page.screenshot({ path: 'before-click-expand.png' }); // Take a screenshot before clicking
    await detailsButton.click();

    await page.waitForSelector('.event-details');
    const eventDetails = await event.$('.event-details');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide its details', async () => {
    const event = await page.$('.event');
    console.log('Event HTML:', await event.evaluate(node => node.innerHTML));

    const detailsButton = await event.$('button');
    console.log('Details button:', detailsButton);

    expect(detailsButton).not.toBeNull(); // Ensure the details button exists

    await page.screenshot({ path: 'before-click-collapse.png' }); // Take a screenshot before clicking
    await detailsButton.click(); // Expand details

    await page.waitForSelector('.event-details');
    await detailsButton.click(); // Collapse details

    const eventDetails = await event.$('.event-details');
    expect(eventDetails).toBeNull();
  });
});
