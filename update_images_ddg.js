const fs = require('fs');
const https = require('https');

function downloadHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function extractDuckDuckGoImage(html) {
    // The html is from html.duckduckgo.com
    // Usually images links are inside <a href="?u=...">
    const match = html.match(/"?u=([^"&]+\.(jpg|jpeg|png))/i);
    if (match && match[1]) {
        return decodeURIComponent(match[1]);
    }
    return null;
}

async function scrapeRealImages() {
  const placesFile = 'c:\\Users\\Manish Kumar\\Desktop\\EventBuddy\\data\\places.json';
  const places = JSON.parse(fs.readFileSync(placesFile, 'utf8'));

  for (let i = 0; i < places.length; i++) {
    const place = places[i];
    console.log(`Processing ${i + 1}/${places.length}: ${place.name} - ${place.area}`);
    try {
      const query = encodeURIComponent(`"${place.name}" "${place.area}"`);
      const html = await downloadHtml('https://html.duckduckgo.com/html/?q=' + query + '+images');
      let imgUrl = extractDuckDuckGoImage(html);

      // If no image found, fallback to broader query
      if (!imgUrl) {
          const query2 = encodeURIComponent(`${place.name} ${place.area} Delhi`);
          const html2 = await downloadHtml('https://html.duckduckgo.com/html/?q=' + query2 + '+images');
          imgUrl = extractDuckDuckGoImage(html2);
      }

      if (imgUrl) {
         console.log('Found:', imgUrl);
         place.image = imgUrl;
      } else {
         console.log('No image found, keeping old image');
      }
    } catch (e) {
      console.log('Error:', e.message);
    }
    // Rate limit
    await new Promise(r => setTimeout(r, 500));
  }

  fs.writeFileSync(placesFile, JSON.stringify(places, null, 2));
  console.log('Finished updating data/places.json');
}

scrapeRealImages();
