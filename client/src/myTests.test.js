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

        browser.close();
    }, 20000)
    test('tests if the add ticket form adds a ticket to the json file', async () => {
        const data = await fs.readFile('../server/data.json')
        const parsedData = JSON.parse(data);
        let browser = await puppeteer.launch({
        headless: false,
        slowMo: 70
        })
        let page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('#modalBtn', {visible: true});
        const openModalBtn = await page.$('#modalBtn');
        await openModalBtn.click();
        await page.waitForSelector('#title', {visible: true});
        await page.type('#title', 'Test');
        await page.type('#content', 'Test');
        await page.type('#email', 'Test');
        await page.type('#labels', 'Test');
        const submitBtn = await page.$('#submit');
        await submitBtn.click();

        const updatedData = await fs.readFile('../server/data.json')
        const parsedUpdatedData = JSON.parse(updatedData);
        const lastItem = parsedUpdatedData[parsedUpdatedData.length - 1];

        expect(parsedUpdatedData.length).toBe(parsedData.length + 1);
        expect(lastItem.title).toBe('Test');
        expect(lastItem.content).toBe('Test');
        expect(lastItem.userEmail).toBe('Test');
        expect(lastItem.labels[0]).toBe('Test');

        browser.close();
    }, 25000)
})