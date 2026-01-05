const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
    {
        url: 'https://www-cdn.djiits.com/cms/uploads/d16f528a96b53c9b6917cca7a9df33af.jpg',
        filename: 'innovation-ag.jpg'
    },
    {
        url: 'https://www-cdn.djiits.com/cms/uploads/d1459d32dcecad9bc4a7c659118f08fa.jpg',
        filename: 'innovation-ronin.jpg'
    },
    {
        url: 'https://www-cdn.djiits.com/cms/uploads/89ebb24d2adc09cc7199829cff0ea712.jpg',
        filename: 'explore-video.jpg'
    },
    {
        url: 'https://www-cdn.djiits.com/cms/uploads/67017bc2168a06d9a518ca9c993e82f5.jpg',
        filename: 'explore-enterprise.jpg'
    },
    {
        url: 'https://www-cdn.djiits.com/cms/uploads/81781be6863d766ac89e633f06433922.jpg',
        filename: 'explore-ag.jpg'
    }
];

const targetDir = path.join(__dirname, '../src/public/images/dji');

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

const downloadImage = (url, filename) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(path.join(targetDir, filename));
        
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://www.dji.com/',
                'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
            }
        };

        https.get(url, options, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
                return;
            }

            response.pipe(file);

            file.on('finish', () => {
                file.close();
                console.log(`Downloaded ${filename}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(path.join(targetDir, filename), () => {});
            reject(err);
        });
    });
};

async function main() {
    console.log('Starting download...');
    for (const img of images) {
        try {
            await downloadImage(img.url, img.filename);
        } catch (error) {
            console.error(`Error downloading ${img.filename}:`, error.message);
        }
    }
    console.log('All downloads completed.');
}

main();
