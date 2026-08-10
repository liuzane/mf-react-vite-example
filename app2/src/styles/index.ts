import tailwindCss from './tailwindcss.css?inline';
import globalCss from './global.css?inline';

let styleElement: HTMLStyleElement | null = null;
let loadCount: number = 0; // 可选：引用计数，防止多次加载重复插入

export function mount() {
  if (styleElement) {
    // 如果已经加载，只增加计数，不重复插入
    loadCount++;
    return;
  }

  // 合并所有样式
  const combinedCss: string = tailwindCss + '\n' + globalCss;

  styleElement = document.createElement('style');
  styleElement.type = 'text/css';
  styleElement.id = 'styles-app2';
  styleElement.textContent = combinedCss;
  document.head.appendChild(styleElement);

  loadCount = 1;
}

export function unmount() {
  if (!styleElement) return;

  loadCount--;
  if (loadCount <= 0) {
    // 彻底移除
    if (styleElement.parentNode) {
      styleElement.parentNode.removeChild(styleElement);
    }
    styleElement = null;
    loadCount = 0;
  }
}
