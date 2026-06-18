const fs = require('fs');
const path = require('path');

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('"use client";') || content.includes("'use client';")) {
    const lines = content.split('\n');
    let useClientIndex = -1;
    let hasImportBeforeUseClient = false;
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('"use client";') || lines[i].includes("'use client';")) {
        useClientIndex = i;
        break;
      } else if (lines[i].startsWith('import ')) {
        hasImportBeforeUseClient = true;
      }
    }
    
    if (useClientIndex > 0 && hasImportBeforeUseClient) {
      // Extract the use client line
      const useClientLine = lines[useClientIndex];
      // Remove it from its current position
      lines.splice(useClientIndex, 1);
      // Put it at the top
      lines.unshift(useClientLine);
      fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
      console.log(`Fixed "use client" in ${filePath}`);
    }
  }
}

processDirectory('./src');
