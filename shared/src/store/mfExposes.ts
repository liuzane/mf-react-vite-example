// 基础模块
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 解析当前文件的目录路径
const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

// 自动扫描store/slices目录，返回映射对象
function scanStoreSlices() {
  const map: Record<string, string> = {};
  const items: fs.Dirent[] | null = fs.readdirSync(path.join(__dirname, 'slices'), { withFileTypes: true });
  for (const item of items) {
    const name: string = item.name;
    if (item.isFile()) {
      const filename: string = name.replace('.ts', '');
      map[`./store/slices/${filename}`] = `./src/store/slices/${filename}`;
    }
  }
  return map;
}

export default {
  './store': './src/store/index.ts',
  ...scanStoreSlices(),
};
