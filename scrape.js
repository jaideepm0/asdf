import { chromium } from '@playwright/test';

async function scrape() {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    const urls = [
        'https://sanand0.github.io/tdsdata/js_table/?seed=18',
        'https://sanand0.github.io/tdsdata/js_table/?seed=19',
        'https://sanand0.github.io/tdsdata/js_table/?seed=20',
        'https://sanand0.github.io/tdsdata/js_table/?seed=21',
        'https://sanand0.github.io/tdsdata/js_table/?seed=22',
        'https://sanand0.github.io/tdsdata/js_table/?seed=23',
        'https://sanand0.github.io/tdsdata/js_table/?seed=24',
        'https://sanand0.github.io/tdsdata/js_table/?seed=25',
        'https://sanand0.github.io/tdsdata/js_table/?seed=26',
        'https://sanand0.github.io/tdsdata/js_table/?seed=27'
    ];

    let grandTotal = 0;

    for (const url of urls) {
        await page.goto(url);
        console.log(`Scraping ${url}`);

        const rows = await page.$$eval('table tr', trs =>
            trs.map(tr =>
                Array.from(tr.querySelectorAll('td')).map(td => td.innerText)
            )
        );

        let pageSum = 0;
        rows.forEach(row => {
            row.forEach(cell => {
                const num = parseFloat(cell.replace(/[^0-9.-]+/g, ""));
                if (!isNaN(num)) pageSum += num;
            });
        });

        console.log(`Sum of all numeric cells on ${url}: ${pageSum}`);
        grandTotal += pageSum;
    }

    console.log(`Grand total across all pages: ${grandTotal}`);
    await browser.close();
}

scrape();
