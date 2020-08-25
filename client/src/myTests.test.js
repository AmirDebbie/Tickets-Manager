const puppeteer = require('puppeteer');
const fs = require('fs').promises;

describe('App Test', () => {
    test('Test if done button changes json file', async () => {
        const data = await fs.readFile('../server/data.json')
        const parsedData = JSON.parse(data);
        let browser = await puppeteer.launch({
        headless: false,
        slowMo: 50
        })
        let page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('#doneButton-0', {visible: true});
        const button = await page.$('#doneButton-0');
        await button.click();
        const updatedData = await fs.readFile('../server/data.json')
        const parsedUpdatedData = JSON.parse(updatedData);
        expect(parsedUpdatedData[0].done).toBe(!parsedData[0].done)
    }, 20000)
})