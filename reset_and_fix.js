const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

try {
    execSync('git checkout book/', { stdio: 'inherit' });
} catch (e) {
    console.log('Git checkout skipped or failed:', e.message);
}

for (const xmlFile of ['book/book.xml', 'book/page.xml']) {
    const p = path.join(__dirname, xmlFile);
    if (fs.existsSync(p)) {
        let content = fs.readFileSync(p, 'utf8');
        content = content.replace(/-(\d+\.(jpg|png))/g, '%2D$1');
        fs.writeFileSync(p, content, 'utf8');
    }
}
console.log('Reset and fixed image references successfully');
