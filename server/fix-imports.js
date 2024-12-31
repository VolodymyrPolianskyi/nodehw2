import { replaceInFile } from 'replace-in-file';

const options = {
  files: './dist/**/*.js',
  from: /import (.*) from ['"](\..*)['"];/g, 
  to: (match, p1, p2) => {
    if (!p2.endsWith('.js')) {
      return `import ${p1} from '${p2}.js';`;
    }
    return match;
  },
};

async function fixImports() {
  try {
    const results = await replaceInFile(options);
    console.log('Modified files:', results.filter(r => r.hasChanged).map(r => r.file));
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

fixImports();
