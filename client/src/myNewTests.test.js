const puppeteer = require('puppeteer');
const nock = require('nock');
const useNock = require('nock-puppeteer');

const mockData = [
  {
    id: 'dd63145f-6340-5fa7-8619-2f44dbf63fd7',
    title: 'help me',
    content: 'pls i have been trying to run code on a dynamic page but it is not working, i need help pls. thanks',
    userEmail: 'rotif@suob.sh',
    creationTime: 1514809791415,
    labels: ['Corvid', 'Api'],
  },
];
const updatedData = [
  {
    id: 'dd63145f-6340-5fa7-8619-2f44dbf63fd7',
    title: 'help me',
    content: 'pls i have been trying to run code on a dynamic page but it is not working, i need help pls. thanks',
    userEmail: 'rotif@suob.sh',
    creationTime: 1514809791415,
    labels: ['Corvid', 'Api'],
  },
  {
    id: 'test',
    title: 'test',
    content: 'test',
    userEmail: 'test',
    creationTime: 1514809791415,
    labels: ['test'],
  },
];

let page;
let browser;

describe('My Tests', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({
      slowMo: 100,
    });
    page = await browser.newPage();
    useNock(page, ['http://localhost:3000/api']);
  });
  test('Test if done button changes json file', async () => {
    const getAllTicketsMock = await nock('http://localhost:3000/', { allowUnmocked: true })
      .get('/api/tickets')
      .query(() => true)
      .reply(200, mockData);

    const getDoneButtonReply = await nock('http://localhost:3000/', { allowUnmocked: true })
      .post('/api/tickets/dd63145f-6340-5fa7-8619-2f44dbf63fd7/done')
      .reply(200, { updated: true });
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('#doneButton-0', { visible: true });
    const button = await page.$('#doneButton-0');
    const firstDoneButtonValue = (await button.getProperty('innerHTML'))._remoteObject.value;
    mockData[0].done = true;
    await button.click();
    await timeout(2000);
    const afterAddingElements = await page.$$('.ticket');

    const updatedButton = await page.$('#doneButton-0');
    const secondDoneButtonValue = (await updatedButton.getProperty('innerHTML'))._remoteObject.value;
    expect(secondDoneButtonValue !== firstDoneButtonValue).toBe(true);
  }, 30000);
  test('tests if the add ticket form adds a ticket to the json file', async () => {
    const getAllTicketsMock = await nock('http://localhost:3000/', { allowUnmocked: true })
      .get('/api/tickets')
      .query(() => true)
      .reply(200, mockData);
    const getDoneButtonReply = await nock('http://localhost:3000/', { allowUnmocked: true })
      .post('/api/tickets')
      .reply(200, updatedData);

    await page.goto('http://localhost:3000/');
    await page.waitForSelector('#modalBtn', { visible: true });
    const openModalBtn = await page.$('#modalBtn');
    await openModalBtn.click();
    await page.waitForSelector('#title', { visible: true });
    await page.type('#title', 'Test');
    await page.type('#content', 'Test');
    await page.type('#email', 'Test');
    await page.type('#labels', 'Test');
    const submitBtn = await page.$('#submit');
    await submitBtn.click();
    await timeout(2000);
    const afterAddingElements = await page.$$('.ticket');

    expect(afterAddingElements.length).toBe(2);

    browser.close();
  }, 30000);
});

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
