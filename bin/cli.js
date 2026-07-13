#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ANSI Color helper functions
const bold = (str) => `\x1b[1m${str}\x1b[22m`;
const green = (str) => `\x1b[32m${str}\x1b[39m`;
const blue = (str) => `\x1b[34m${str}\x1b[39m`;
const cyan = (str) => `\x1b[36m${str}\x1b[39m`;
const yellow = (str) => `\x1b[33m${str}\x1b[39m`;
const red = (str) => `\x1b[31m${str}\x1b[39m`;
const dim = (str) => `\x1b[2m${str}\x1b[22m`;

function printUsage() {
  console.log(`\nUsage: ${bold('npx create-nxa <project-directory-name>')}`);
  console.log(`Example: ${dim('npx create-nxa my-new-website')}\n`);
}

// 1. Check arguments
const args = process.argv.slice(2);
if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
  printUsage();
  process.exit(1);
}

const targetDirName = args[0];
const targetDirPath = path.resolve(process.cwd(), targetDirName);
const templateDirPath = path.join(__dirname, '../template');

console.log(`\n🚀 ${bold(cyan('Creating a new Next.js project with Modern Next App template in:'))}`);
console.log(`   ${dim(targetDirPath)}\n`);

// 2. Validate paths
if (fs.existsSync(targetDirPath)) {
  console.error(`❌ ${bold(red('Error:'))} Directory "${bold(targetDirName)}" already exists.`);
  console.error(`   Please choose a different name or remove the existing directory.`);
  process.exit(1);
}

if (!fs.existsSync(templateDirPath)) {
  console.error(`❌ ${bold(red('Error:'))} Template directory not found inside the CLI package at:`);
  console.error(`   ${dim(templateDirPath)}`);
  process.exit(1);
}

// 3. Helper function to copy template directory
function copyFolderRecursiveSync(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  if (fs.lstatSync(source).isDirectory()) {
    const files = fs.readdirSync(source);
    files.forEach((file) => {
      const curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, path.join(target, file));
      } else {
        // Special case: restore _gitignore back to .gitignore
        let targetFile = file;
        if (file === '_gitignore') {
          targetFile = '.gitignore';
        }
        fs.copyFileSync(curSource, path.join(target, targetFile));
      }
    });
  }
}

// 4. Copy files
try {
  console.log(`${bold(yellow('📂  Copying project template...'))}`);
  copyFolderRecursiveSync(templateDirPath, targetDirPath);
  console.log(`✅  ${green('Template copied successfully.')}`);
} catch (error) {
  console.error(`❌  ${bold(red('Failed to copy template files:'))}`, error.message);
  process.exit(1);
}

// 5. Update package.json name field
try {
  const targetPackageJsonPath = path.join(targetDirPath, 'package.json');
  if (fs.existsSync(targetPackageJsonPath)) {
    console.log(`${bold(yellow('🔧  Customizing project configuration...'))}`);
    const packageJsonContent = fs.readFileSync(targetPackageJsonPath, 'utf8');
    const packageJson = JSON.parse(packageJsonContent);
    
    // Set new package name
    packageJson.name = path.basename(targetDirName);
    
    fs.writeFileSync(
      targetPackageJsonPath,
      JSON.stringify(packageJson, null, 2),
      'utf8'
    );
    console.log(`✅  ${green('Customized package.json name to:')} ${bold(cyan(packageJson.name))}`);
  }
} catch (error) {
  console.warn(`⚠️  ${bold(yellow('Warning:'))} Could not update package.json name:`, error.message);
}

// 6. Initialize git repository
try {
  console.log(`${bold(yellow('🗂️  Initializing local Git repository...'))}`);
  execSync('git init', { cwd: targetDirPath, stdio: 'ignore' });
  execSync('git add .', { cwd: targetDirPath, stdio: 'ignore' });
  execSync('git commit -m "Initial commit from Modern Next App template"', {
    cwd: targetDirPath,
    stdio: 'ignore',
  });
  console.log(`✅  ${green('Git repository initialized and initial commit created.')}`);
} catch (error) {
  console.warn(`⚠️  ${bold(yellow('Warning:'))} Failed to initialize Git repository:`, error.message);
}

// 7. Install dependencies
try {
  console.log(`${bold(yellow('📦  Installing npm packages (this might take a minute)...'))}`);
  execSync('npm install', { cwd: targetDirPath, stdio: 'inherit' });
  console.log(`\n✅  ${green('All dependencies installed successfully!')}`);
} catch (error) {
  console.error(`\n❌  ${bold(red('Failed to install dependencies. You can run "npm install" manually.'))}`);
  console.error('Error details:', error.message);
}

// 8. Finished output
console.log(`\n🎉  ${bold(green('Success!'))} Created ${bold(cyan(targetDirName))} at ${dim(targetDirPath)}`);
console.log('Inside that directory, you can run several commands:\n');
console.log(`  ${bold(cyan('npm run dev'))}`);
console.log(`    Starts the development server.\n`);
console.log(`  ${bold(cyan('npm run build'))}`);
console.log(`    Builds the app for production.\n`);
console.log(`  ${bold(cyan('npm run start'))}`);
console.log(`    Runs the built app in production mode.\n`);
console.log('We suggest that you begin by typing:\n');
console.log(`  ${bold(blue(`cd ${targetDirName}`))}`);
console.log(`  ${bold(blue('npm run dev'))}\n`);
console.log(`Happy hacking! 🚀\n`);
