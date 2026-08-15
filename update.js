const fs = require('fs');
const path = require('path');

const sectionsDir = path.join(__dirname, 'src/components/sections');
const layoutPath = path.join(__dirname, 'src/app/layout.tsx');
const globalsPath = path.join(__dirname, 'src/app/globals.css');

// 1. Update layout.tsx fonts
let layoutContent = fs.readFileSync(layoutPath, 'utf8');
layoutContent = layoutContent.replace(/Outfit/g, 'Syne');
layoutContent = layoutContent.replace(/const outfit = Syne\(\{/g, 'const syne = Syne({');
layoutContent = layoutContent.replace(/variable: "--font-outfit"/g, 'variable: "--font-editorial"');
layoutContent = layoutContent.replace(/\$\{outfit\.variable\}/g, '${syne.variable}');
fs.writeFileSync(layoutPath, layoutContent);

// 2. Update globals.css
let globalsContent = fs.readFileSync(globalsPath, 'utf8');
globalsContent = globalsContent.replace(/--font-editorial: var\(--font-outfit\);/g, '--font-editorial: var(--font-editorial);');
fs.writeFileSync(globalsPath, globalsContent);

// 3. Update sections (remove rounded, increase fonts)
const files = fs.readdirSync(sectionsDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(sectionsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace font sizes
  content = content.replace(/text-5xl md:text-8xl/g, 'text-6xl md:text-9xl');
  content = content.replace(/text-6xl md:text-8xl/g, 'text-7xl md:text-9xl');
  content = content.replace(/text-5xl md:text-7xl/g, 'text-6xl md:text-8xl');
  content = content.replace(/text-3xl md:text-6xl/g, 'text-5xl md:text-8xl');
  content = content.replace(/text-2xl md:text-4xl/g, 'text-3xl md:text-5xl');
  content = content.replace(/text-\[15vw\] md:text-\[10vw\]/g, 'text-[18vw] md:text-[12vw]');

  // Remove rounded classes (except for abstract blur elements and dots)
  // Be careful with exact matches
  
  // WorldAProjects
  content = content.replace(/rounded-sm/g, 'rounded-none');
  content = content.replace(/px-2 py-1 border border-white\/10 rounded-full/g, 'px-2 py-1 border border-white/10 rounded-none');
  
  // WorldAOpenSource
  content = content.replace(/rounded-xl/g, 'rounded-none');
  content = content.replace(/rounded /g, 'rounded-none ');
  content = content.replace(/rounded-2xl/g, 'rounded-none');
  content = content.replace(/rounded-lg/g, 'rounded-none');
  
  // WorldBPortfolio
  content = content.replace(/w-12 h-12 rounded-full/g, 'w-12 h-12 rounded-none');
  
  // Crossover
  content = content.replace(/rounded-\[2rem\]/g, 'rounded-none');
  content = content.replace(/px-4 py-2 rounded /g, 'px-4 py-2 rounded-none ');

  // Landing
  content = content.replace(/px-8 py-4 md:px-12 md:py-6 rounded-full/g, 'px-8 py-4 md:px-12 md:py-6 rounded-none');

  fs.writeFileSync(filePath, content);
}

console.log("Updates applied successfully.");
