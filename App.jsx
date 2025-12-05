import React, { useState, useEffect } from 'react';
// 修复：将 'import * as ReactDOM from 'react-dom/client'' 
// 更改为显式的结构化导入 'createRoot'，以避免在某些环境中导入整个命名空间时可能出现的 TypeError。
import { createRoot } from 'react-dom/client'; 

// 主应用组件
const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("App component mounted or count changed.");
  }, [count]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 shadow-2xl rounded-xl w-full max-w-sm text-center transform transition duration-500 hover:scale-[1.01]">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">
          React 计数器
        </h1>
        <p className="text-gray-600 mb-6">
          当前计数: 
          <span className="text-4xl font-extrabold text-indigo-900 ml-2 block sm:inline mt-2 sm:mt-0">
            {count}
          </span>
        </p>
        <button
          onClick={() => setCount(prev => prev + 1)}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          增加计数
        </button>
        <p className="mt-4 text-sm text-gray-400">
          此组件只渲染一次根节点。
        </p>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// **关键修复区域**：确保只调用一次 createRoot 和 render
// ----------------------------------------------------

// 查找根 DOM 元素，假设 HTML 中有 <div id="root"></div>
const container = document.getElementById('root');

// 仅当容器存在时执行渲染逻辑
if (container) {
  // 检查是否已经创建了根。在某些单文件环境中，
  // 脚本可能会被重复执行。使用一个标志来确保 createRoot 只被调用一次。
  if (!container.hasAttribute('data-react-root-initialized')) {
    // 1. 创建根
    // 使用直接导入的 createRoot 函数
    const root = createRoot(container);
    
    // 2. 渲染应用
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

    // 设置一个属性作为标志，表示根已经被创建
    container.setAttribute('data-react-root-initialized', 'true');
    
  } else {
    // 如果根已经创建，我们通常只会调用 root.render() 来更新，
    // 但在这个单文件模板的末尾，我们只进行初始化。
    // 如果您的代码逻辑需要更新，请确保您存储了 'root' 实例并调用其 render 方法。
    // 对于此模板，我们假设只进行一次初始化挂载。
    console.warn("React root already initialized. Skipping re-initialization.");
  }
}

// 导出 App 组件（虽然在这个单文件环境中不一定会用到，但符合规范）
export default App;
