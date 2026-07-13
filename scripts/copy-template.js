const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../../my-app');
const destDir = path.join(__dirname, '../template');

const ignoreList = [
  'node_modules',
  '.next',
  '.git',
  '.env',
  'copy-template.js'
];

function copyFolderRecursiveSync(source, target) {
  let files = [];

  // Check if folder needs to be created or written to
  const targetFolder = target;
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder, { recursive: true });
  }

  // Copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function (file) {
      if (ignoreList.includes(file)) {
        return;
      }
      const curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, path.join(targetFolder, file));
      } else {
        // Special case: npm ignores .gitignore, so we rename it to _gitignore
        let targetFile = file;
        if (file === '.gitignore') {
          targetFile = '_gitignore';
        }
        fs.copyFileSync(curSource, path.join(targetFolder, targetFile));
      }
    });
  }
}

console.log('Copying template files from:', srcDir);
console.log('To:', destDir);
copyFolderRecursiveSync(srcDir, destDir);
console.log('Template populated successfully!');
