const fs = require('fs');
const puppeteer = require('puppeteer');

async function scrapeMapsImages() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const placesFile = 'c:\\Users\\Manish Kumar\\Desktop\\EventBuddy\\data\\places.json';
  const places = JSON.parse(fs.readFileSync(placesFile, 'utf8'));

  for (let i = 0; i < places.length; i++) {
    const place = places[i];
    const page = await browser.newPage();
    console.log(`Processing ${i + 1}/${places.length}: ${place.name} - ${place.area}`);
    try {
      // Direct query to maps:
      await page.goto(`https://www.google.com/maps/search/${encodeURIComponent(place.name + ' ' + place.area)}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
      
      // Look for the image button
      try {
        await page.waitForSelector('button[aria-label^="Photo"] img', { timeout: 8000 });
        const imgUrl = await page.evaluate(() => {
          const img = document.querySelector('button[aria-label^="Photo"] img');
          return img ? img.src : null;
        });

        if (imgUrl) {
           console.log('Found:', imgUrl);
           // Replace wX-hY-k-no with w800-h600 to get a better resolution image
           place.image = imgUrl.replace(/w\d+\-h\d+/, 'w800-h600');
        } else {
           console.log('No image found');
        }
      } catch (err) {
        console.log('Timeout waiting for photo selector');
      }

    } catch (e) {
      console.log('Error navigating:', e.message);
    }
    await page.close();
  }

  fs.writeFileSync(placesFile, JSON.stringify(places, null, 2));
  console.log('Finished updating data/places.json');
  await browser.close();
}

scrapeMapsImages();
