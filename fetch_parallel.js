const fs = require('fs');
const puppeteer = require('puppeteer');

async function scrapeMapsImages() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const placesFile = 'c:\\Users\\Manish Kumar\\Desktop\\EventBuddy\\data\\places.json';
  const places = JSON.parse(fs.readFileSync(placesFile, 'utf8'));

  async function processPlace(place, i) {
    const page = await browser.newPage();
    console.log(`Starting ${i + 1}/${places.length}: ${place.name}`);
    try {
      await page.goto(`https://www.google.com/maps/search/${encodeURIComponent(place.name + ' ' + place.area + ' Delhi NCR')}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
      let imgUrl = await page.evaluate(() => {
        const btn = document.querySelector('button[aria-label^="Photo"], button[aria-label^="Image"]');
        if (btn) {
           const img = btn.querySelector('img');
           if (img && img.src) return img.src;
        }
        // Fallback: look for any img from lh3 or lh5
        const allImgs = Array.from(document.querySelectorAll('img'));
        const gImg = allImgs.find(img => img.src && (img.src.includes('lh5.google') || img.src.includes('lh3.google')) && !img.src.includes('w36-h36'));
        return gImg ? gImg.src : null;
      });

      if (imgUrl) {
         place.image = imgUrl.replace(/w\d+\-h\d+\-k\-no/, 'w800-h600-k-no');
         // check if there's an equal sign without parameters, add sizing
         if (place.image === imgUrl && imgUrl.includes('=')) {
             place.image = imgUrl.split('=')[0] + '=w800-h600-k-no';
         }
         console.log(`Found [${i+1}]:`, place.image);
      } else {
         console.log(`No image found for [${i+1}]`);
      }
    } catch(err) {
       console.log(`Error on [${i+1}]`, err.message);
    }
    await page.close();
  }

  // Create chunks of 10 parallel tasks
  const chunkSize = 10;
  for (let i = 0; i < places.length; i += chunkSize) {
      const chunk = places.slice(i, i + chunkSize);
      await Promise.all(chunk.map((p, index) => processPlace(p, i + index)));
  }

  fs.writeFileSync(placesFile, JSON.stringify(places, null, 2));
  console.log('Finished updating data!');
  await browser.close();
}

scrapeMapsImages();
