import puppeteer from "puppeteer"
import fs from "fs"

const main = async () => {
  // Launch the browser and open a new blank page
  const pgStart = process.argv.slice(2)[0] || 1
  const browser = await puppeteer.launch({headness: 'new'})
  const page = await browser.newPage()

  // Navigate the page to a URL
  await page.goto("https://www.passwordrandom.com/most-popular-passwords");

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 })
  let pws = []


  for (let i = pgStart; i <= 100; i++) {
    try {
      pws.push(await page.evaluate(() => [...(document.querySelectorAll('td:nth-child(2)'))].map((td => td.innerText))))
    }
    catch (ignored) {
      console.error(`page ${i} failed`)
      pws = pws.flat()
      fs.writeFileSync('mcupws.json', JSON.stringify(pws, null, 2), 'utf-8')
      process.exit(1)
    }
    await page.goto(`https://www.passwordrandom.com/most-popular-passwords?page=${i + 1}`)
    console.log(`page ${i} done`)
  }



  // Type into search box
  // await page.type(".devsite-search-field", "automate beyond recorder")
  // Wait and click on first result
  // const searchResultSelector = ".devsite-result-item-link"
  // await page.waitForSelector(searchResultSelector)
  // await page.click(searchResultSelector)

  // Locate the full title with a unique string
  // const textSelector = await page.waitForSelector(
  //   ".devsite-result-item-link"
  // )
  // const fullTitle = await textSelector?.evaluate((el) => el.textContent)
  // const passwords = await textSelector?.evaluate((el) => el.innerText)

  // Print the full title

  await browser.close()
  //take out the multiple arrays inside pws
  pws = pws.flat()
  fs.writeFileSync('mcupws.json', JSON.stringify(pws, null, 2), 'utf-8')
}

main()
