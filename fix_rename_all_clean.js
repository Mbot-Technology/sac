const fs = require('fs');
const path = require('path');

const bookDir = path.join(__dirname, 'book');
if (fs.existsSync(bookDir)) {
    const files = fs.readdirSync(bookDir);
    for (const f of files) {
        if (f.startsWith('-')) {
            const oldPath = path.join(bookDir, f);
            const newF = f.substring(1);
            const newPath = path.join(bookDir, newF);
            fs.renameSync(oldPath, newPath);
        }
    }
}

for (const xmlFile of ['book/book.xml', 'book/page.xml']) {
    const p = path.join(__dirname, xmlFile);
    if (fs.existsSync(p)) {
        let content = fs.readFileSync(p, 'utf8');
        content = content.replace(/>-(\d+\.(jpg|png|pdf|mp3))</g, '>$1<');
        content = content.replace(/"-(\d+\.(jpg|png|pdf|mp3))"/g, '"$1"');
        content = content.replace(/>-(\d+\.\w+)</g, '>$1<');
        fs.writeFileSync(p, content, 'utf8');
    }
}
console.log('Clean rename and XML update complete');
