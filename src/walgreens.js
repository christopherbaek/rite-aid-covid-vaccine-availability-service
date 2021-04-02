const { chromium } = require('playwright');
const { logger } = require('./logger');


const defaultConfiguration = {
    headless: process.env.NODE_ENV === 'development' ? false : true,
};

const getStatus = async (zipCode, configuration = defaultConfiguration) => {
    logger.info(`retrieving status for [${zipCode}]`);

    const browser = await chromium.launch(configuration);

    const page = await browser.newPage();

    await page.goto('https://www.walgreens.com/findcare/vaccination/covid-19');

    await page.waitForSelector('#userOptionButtons > a');

    await page.click('#userOptionButtons > a');

    await page.waitForSelector('#inputLocation');

    await page.waitForTimeout(5000);

    await page.$eval('#inputLocation', (el, zip) => el.value = zip, zipCode);

    await page.waitForTimeout(5000);

    await page.click('#inputLocation ~ button');

    await page.waitForTimeout(5000);

    const statusMessage = await page.$eval('.ApptScreens > section > section', el => el.textContent);

    await browser.close();

    const response = { zipCode, statusMessage };

    logger.info(`returning response [${JSON.stringify(response)}]`);

    return response;
};

module.exports = { getStatus };
