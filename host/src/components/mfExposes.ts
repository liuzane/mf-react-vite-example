// 基础模块
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 解析当前文件的目录路径
const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

// 自动扫描组件目录，返回映射对象
function scanComponents() {
  const map: Record<string, string> = {};
  const items: fs.Dirent[] | null = fs.readdirSync(__dirname, { withFileTypes: true });

  for (const item of items) {
    const name: string = item.name;
    // 只处理文件夹 或 .tsx 文件
    if (item.isDirectory()) {
      map[`./components/${name}`] = `./src/components/${name}`;
    } else if (name.endsWith('.tsx')) {
      const base: string = name.slice(0, -4);
      map[`./components/${base}`] = `./src/components/${base}.tsx`;
    }
  }
  return map;
}

export default scanComponents();
