const fs = require('fs');
const path = require('path');

const bookDir = path.join(__dirname, 'book');
if (fs.existsSync(bookDir)) {
    const files = fs.readdirSync(bookDir);
    for (const f of files) {
        if (f.startsWith('file_')) {
            const oldPath = path.join(bookDir, f);
            const newF = '-' + f.substring(5);
            const newPath = path.join(bookDir, newF);
            fs.renameSync(oldPath, newPath);
        }
    }
}

for (const xmlFile of ['book/book.xml', 'book/page.xml']) {
    const p = path.join(__dirname, xmlFile);
    if (fs.existsSync(p)) {
        let content = fs.readFileSync(p, 'utf8');
        // Replace file_ with %2D, or - with %2D when it's part of a filename
        content = content.replace(/file_(\d+\.(jpg|png|pdf|mp3))/g, '%2D$2');
        content = content.replace(/>-(-?\d+\.(jpg|png|pdf|mp3))</g, '>%2D$1<');
        fs.writeFileSync(p, content, 'utf8');
    }
}
console.log('Reverted and encoded with %2D');
