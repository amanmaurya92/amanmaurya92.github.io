const fs = require('fs');
const path = require('path');

// 1. Update layout.tsx fonts to Inter and JetBrains_Mono
const layoutPath = path.join(__dirname, 'src/app/layout.tsx');
let layoutContent = fs.readFileSync(layoutPath, 'utf8');

layoutContent = layoutContent.replace(/Geist, Geist_Mono/g, 'Inter, JetBrains_Mono');
layoutContent = layoutContent.replace(/const geistSans = Geist/g, 'const inter = Inter');
layoutContent = layoutContent.replace(/const geistMono = Geist_Mono/g, 'const jetbrainsMono = JetBrains_Mono');
layoutContent = layoutContent.replace(/geistSans\.variable/g, 'inter.variable');
layoutContent = layoutContent.replace(/geistMono\.variable/g, 'jetbrainsMono.variable');

fs.writeFileSync(layoutPath, layoutContent);

// 2. Make WorldAHero bigger
const heroPath = path.join(__dirname, 'src/components/sections/WorldAHero.tsx');
let heroContent = fs.readFileSync(heroPath, 'utf8');
heroContent = heroContent.replace(/text-4xl md:text-7xl/g, 'text-6xl md:text-9xl'); // much bigger
fs.writeFileSync(heroPath, heroContent);

// 3. Make WorldAProjects bigger
const projectsPath = path.join(__dirname, 'src/components/sections/WorldAProjects.tsx');
let projectsContent = fs.readFileSync(projectsPath, 'utf8');
projectsContent = projectsContent.replace(/text-6xl md:text-8xl/g, 'text-7xl md:text-9xl'); // even bigger
projectsContent = projectsContent.replace(/text-3xl md:text-4xl/g, 'text-4xl md:text-6xl'); // project titles
fs.writeFileSync(projectsPath, projectsContent);

// 4. Make WorldAOpenSource bigger
const openSourcePath = path.join(__dirname, 'src/components/sections/WorldAOpenSource.tsx');
let openSourceContent = fs.readFileSync(openSourcePath, 'utf8');
openSourceContent = openSourceContent.replace(/text-6xl md:text-8xl/g, 'text-7xl md:text-9xl');
openSourceContent = openSourceContent.replace(/text-2xl font-bold/g, 'text-4xl font-bold'); // swift-java
openSourceContent = openSourceContent.replace(/text-4xl md:text-6xl/g, 'text-6xl md:text-8xl'); // rabbit base
openSourceContent = openSourceContent.replace(/text-xl font-bold/g, 'text-2xl font-bold'); // rabbit base pillars
fs.writeFileSync(openSourcePath, openSourceContent);

console.log("Fonts and sizes updated.");
