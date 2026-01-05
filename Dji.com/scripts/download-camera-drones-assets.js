const fs = require('fs');
const https = require('https');
const path = require('path');

const targetDir = path.join(__dirname, '../src/public/images/dji');

// Ensure directory exists
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

const images = [
    {
        url: 'https://www-cdn.djiits.com/dps/de46652dd99c67d4f8d17607e3bf0dce.jpg',
        filename: 'hero-camera-drones.jpg'
    }
];

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

const main = async () => {
    console.log('Starting image downloads for Camera Drones page...');
    
    for (const img of images) {
        try {
            await downloadImage(img.url, img.filename);
        } catch (error) {
            console.error(`Error downloading ${img.filename}:`, error.message);
        }
    }
    
    console.log('All downloads completed.');
};

main();
