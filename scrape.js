import { chromium } from '@playwright/test';

async function scrape() {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Example: scrape multiple pages
    const urls = [
        'https://example.com/page1',
        'https://example.com/page2',
    ];

    for (const url of urls) {
        await page.goto(url);
        console.log(`Scraping ${url}`);

        // Extract table data using Playwright
        const rows = await page.$$eval('table tr', trs =>
            trs.map(tr =>
                Array.from(tr.querySelectorAll('td')).map(td => td.innerText)
            )
        );

        // Convert to numbers and calculate sum if possible
        let pageSum = 0;
        rows.forEach(row => {
            row.forEach(cell => {
                const num = parseFloat(cell.replace(/[^0-9.-]+/g,""));
                if (!isNaN(num)) pageSum += num;
            });
        });

        console.log(`Sum of all numeric cells on ${url}: ${pageSum}`);
    }

    await browser.close();
}

scrape();
