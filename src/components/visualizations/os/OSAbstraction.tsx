"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// 解析 Markdown 加粗语法 **text** 为 <strong> 标签
function parseMarkdownBold(text: string): React.ReactNode[] {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={index} className="font-semibold">{part.slice(2, -2)}</strong>;
        }
        return part;
    });
}

interface OSAbstractionProps {
    onInteract?: () => void;
}

// 抽象层数据
const abstractions = [
    {
        id: "files",
        name: "文件",
        nameEn: "Files",
        icon: "📁",
        color: "from-blue-500 to-blue-600",
        hardware: "I/O 设备",
        description: "对存储设备的抽象",
        detail: `文件是对所有 I/O 设备的统一抽象！

**在 Unix 中，一切皆文件：**
• 普通文件 → 磁盘上的数据
• 设备文件 → 键盘、显示器、打印机
• 网络套接字 → 网络连接

**好处：**
用同样的方式（read/write）访问所有设备，程序员不需要关心底层细节。`,
        example: `// 写文件和写屏幕，用法一样！
write(file_fd, "Hello", 5);
write(STDOUT, "Hello", 5);`,
    },
    {
        id: "vmem",
        name: "虚拟内存",
        nameEn: "Virtual Memory",
        icon: "🗺️",
        color: "from-green-500 to-green-600",
        hardware: "主存 + 磁盘",
        description: "对主存的抽象",
        detail: `虚拟内存让每个进程以为自己独占内存！

**核心思想：**
• 每个进程有自己的地址空间
• 地址空间是"虚拟"的，不是真实物理地址
• 操作系统负责转换

**好处：**
• 程序不用担心地址冲突
• 可以运行比物理内存更大的程序
• 进程之间相互隔离，更安全`,
        example: `进程 A: 地址 0x1000 → 物理地址 0x5000
进程 B: 地址 0x1000 → 物理地址 0x8000
（相同虚拟地址，不同物理位置）`,
    },
    {
        id: "process",
        name: "进程",
        nameEn: "Process",
        icon: "⚙️",
        color: "from-orange-500 to-orange-600",
        hardware: "CPU + 主存",
        description: "对运行程序的抽象",
        detail: `进程是运行中程序的抽象！

**进程包含：**
• 程序代码（指令）
• 数据（全局变量、堆、栈）
• 运行状态（寄存器值、程序计数器）

**好处：**
• 多个程序可以"同时"运行
• 操作系统管理资源分配
• 进程崩溃不影响其他进程

每个进程以为自己独占 CPU，实际上是轮流使用。`,
        example: `$ ps aux  # 查看所有进程
PID  USER  CPU  MEM  COMMAND
1234 alice 5%   2%   chrome
5678 bob   10%  4%   vscode`,
    },
    {
        id: "thread",
        name: "线程",
        nameEn: "Thread",
        icon: "🧵",
        color: "from-purple-500 to-purple-600",
        hardware: "CPU",
        description: "轻量级的执行单元",
        detail: `线程是进程内部的执行单元！

**进程 vs 线程：**
• 进程：独立的地址空间，资源隔离
• 线程：共享地址空间，通信方便

**好处：**
• 创建开销比进程小
• 多线程可以并行执行（多核 CPU）
• 共享数据无需复杂通信

**注意：**
共享数据带来同步问题，需要用锁来保护。`,
        example: `一个浏览器进程可能有：
• 主线程：处理用户界面
• 渲染线程：绘制网页
• 网络线程：下载资源
• JS 线程：执行 JavaScript`,
    },
];

export default function OSAbstraction({ onInteract }: OSAbstractionProps) {
    const [selectedAbstraction, setSelectedAbstraction] = useState<string | null>(
        "process"
    );
    const [hasInteracted, setHasInteracted] = useState(false);

    const handleInteraction = () => {
        if (!hasInteracted && onInteract) {
            setHasInteracted(true);
            onInteract();
        }
    };

    const handleSelect = (id: string) => {
        setSelectedAbstraction(id);
        handleInteraction();
    };

    const selected = abstractions.find((a) => a.id === selectedAbstraction);

    return (
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 sm:p-8">
            {/* 标题 */}
            <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    操作系统的核心抽象
                </h3>
                <p className="text-sm text-gray-600">
                    操作系统用抽象隐藏硬件复杂性，让程序员更轻松
                </p>
            </div>

            {/* 抽象层次图 */}
            <div className="relative bg-white rounded-xl p-6 mb-6">
                {/* 应用程序层 */}
                <div className="text-center mb-4">
                    <div className="inline-block px-6 py-3 bg-gray-100 rounded-lg">
                        <span className="text-2xl mr-2">👤</span>
                        <span className="font-semibold">应用程序</span>
                    </div>
                </div>

                <div className="text-center text-gray-400 mb-4">↓ 使用 ↓</div>

                {/* 抽象层 */}
                <div className="flex flex-wrap justify-center gap-3 mb-4">
                    {abstractions.map((abstraction) => (
                        <motion.button
                            key={abstraction.id}
                            onClick={() => handleSelect(abstraction.id)}
                            className={`px-4 py-3 rounded-xl font-medium transition-all ${selectedAbstraction === abstraction.id
                                ? `bg-gradient-to-r ${abstraction.color} text-white shadow-lg`
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="text-xl mr-2">{abstraction.icon}</span>
                            <span>{abstraction.name}</span>
                        </motion.button>
                    ))}
                </div>

                <div className="text-center text-gray-400 mb-4">↓ 抽象自 ↓</div>

                {/* 硬件层 */}
                <div className="flex flex-wrap justify-center gap-3">
                    <div className="px-4 py-2 bg-gray-200 rounded-lg text-sm">
                        🧠 CPU
                    </div>
                    <div className="px-4 py-2 bg-gray-200 rounded-lg text-sm">
                        💾 主存
                    </div>
                    <div className="px-4 py-2 bg-gray-200 rounded-lg text-sm">
                        📀 磁盘
                    </div>
                    <div className="px-4 py-2 bg-gray-200 rounded-lg text-sm">
                        🖥️ I/O 设备
                    </div>
                </div>
            </div>

            {/* 详细信息面板 */}
            {selected && (
                <motion.div
                    key={selected.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-gradient-to-br ${selected.color} rounded-xl p-6 text-white mb-6`}
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <span className="text-4xl">{selected.icon}</span>
                            <div>
                                <h4 className="text-xl font-bold">{selected.name}</h4>
                                <p className="text-sm opacity-80">
                                    {selected.nameEn}
                                </p>
                            </div>
                        </div>
                        <div className="px-3 py-1 bg-white/20 rounded-lg text-sm">
                            抽象自: {selected.hardware}
                        </div>
                    </div>

                    <p className="text-lg mb-4">{selected.description}</p>

                    {/* 详细说明 */}
                    <div className="bg-white/20 rounded-lg p-4 mb-4">
                        <div className="text-sm leading-relaxed space-y-1">
                            {selected.detail.split('\n').map((line, i) => (
                                <p key={i}>{parseMarkdownBold(line)}</p>
                            ))}
                        </div>
                    </div>

                    {/* 代码示例 */}
                    <div className="bg-black/30 rounded-lg p-4 font-mono text-sm">
                        <pre className="text-green-300 whitespace-pre-wrap">
                            {selected.example}
                        </pre>
                    </div>
                </motion.div>
            )}

            {/* 核心概念 */}
            <div className="bg-purple-100 rounded-xl p-4">
                <h4 className="font-semibold text-purple-900 mb-2">
                    💡 为什么需要抽象？
                </h4>
                <p className="text-sm text-purple-800">
                    想象一下如果没有操作系统：每个程序都要自己管理内存地址、
                    直接操作硬盘扇区、处理键盘中断……这太复杂了！
                </p>
                <p className="text-sm text-purple-800 mt-2">
                    <strong>操作系统的抽象</strong>就像给复杂硬件穿上了"外套"，
                    程序员只需要和简单的接口打交道，底层的复杂性被隐藏起来。
                </p>
            </div>
        </div>
    );
}
