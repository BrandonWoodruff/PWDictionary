import puppeteer from 'puppeteer'
import fs from 'fs'
import progressbar from 'progress'

async function fail(errMsg,pageNum, pws, browser){
  console.error(errMsg)
  console.error(`page ${pageNum} failed`)
  pws = pws.flat()
  pws = pws.filter(pw => /^[a-zA-Z0-9]+$/.test(pw))
  fs.writeFileSync('mcupws.json', JSON.stringify(pws, null, 2), 'utf-8')
  await browser.close()
  process.exit(1)
}

const main = async () => {
  // Launch the browser and open a new blank page
  const args = process.argv.slice(2)
  const pgStart = Number(args[0]) || 1
  const browser = await puppeteer.launch({headness: 'new'})
  const page = await browser.newPage()
  const bar = new progressbar('[:bar] :percent :etas', { total: 100 - pgStart + 1}) // TOTO use correct num
  var timer = setInterval(function () {
    if (bar.complete) {
      clearInterval(timer)
    }
  }, 100)

  // Navigate the page to a URL
  await page.goto('https://www.passwordrandom.com/most-popular-passwords')

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 })
  //ongoing sanity check, number of jws must be multiple of 100
  let pws = []


  for (let i = pgStart; i <= 100; i++) {
    try {
      pws.push(await page.evaluate(() => [...(document.querySelectorAll('td:nth-child(2)'))].map((td => td.innerText))))

    }
    catch (ignored) {
      await fail(ignored, i, pws, browser)
    }
    await page.goto(`https://www.passwordrandom.com/most-popular-passwords?page=${i + 1}`)
    // have it check the lengths of the arrays in pws
    for (let j = 0; j < pws.length - 1; j++) {
      if (pws[j].length !== 100) await fail(`mcupws.json had ${pws[j].length} words, consider deleting mcupws.json`, pgStart, pws, browser)
    }
    bar.tick()
  }

  // Print the full title

  await browser.close()
  //take out the multiple arrays inside pws
  pws = pws.flat()
  //Use regEx to filter only alphanumeric passwords
  pws = pws.filter(pw => /^[a-zA-Z0-9]+$/.test(pw))
  fs.writeFileSync('mcupws.json', JSON.stringify(pws, null, 2), 'utf-8')
  console.log('SUCCESS! mcupws.json is good to go!')
}

main()
