import fs from 'fs/promises';
import path from 'path';

const updateVersion = async (type = 'patch') => {
  const pkgPath = path.resolve(process.cwd(), 'package.json');
  const pkg = JSON.parse(await fs.readFile(pkgPath, 'utf-8'));
  
  const [major, minor, patch] = pkg.version.split('.').map(Number);
  
  switch(type) {
    case 'major': pkg.version = `${major + 1}.0.0`; break;
    case 'minor': pkg.version = `${major}.${minor + 1}.0`; break;
    default: pkg.version = `${major}.${minor}.${patch + 1}`;
  }
  
  await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2));
  console.log(`✅ Versión actualizada a: v${pkg.version}`);
  
  return pkg.version;
};

export default updateVersion;