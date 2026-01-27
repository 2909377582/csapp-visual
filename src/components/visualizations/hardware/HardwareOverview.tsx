"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MousePointer2 } from "lucide-react";

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

interface HardwareOverviewProps {
    onInteract?: () => void;
}

// 硬件组件数据
const components = [
    {
        id: "cpu",
        name: "CPU（中央处理器）",
        nameEn: "Central Processing Unit",
        position: { x: 50, y: 20 },
        size: { w: 200, h: 120 },
        color: "from-red-500 to-orange-500",
        icon: "🧠",
        description: "计算机的\"大脑\"，负责执行程序指令",
        detail: `CPU 是计算机最重要的部件！

• **算术逻辑单元 (ALU)**: 负责加减乘除等计算
• **寄存器**: CPU 内部的高速存储，速度最快
• **控制单元**: 指挥其他部件协调工作

CPU 速度用 GHz 衡量，比如 3.5 GHz 表示每秒执行 35 亿个时钟周期！`,
        subComponents: ["ALU", "寄存器", "控制单元"],
    },
    {
        id: "memory",
        name: "主存（内存）",
        nameEn: "Main Memory (RAM)",
        position: { x: 300, y: 20 },
        size: { w: 180, h: 120 },
        color: "from-blue-500 to-cyan-500",
        icon: "💾",
        description: "存储运行中程序和数据的临时空间",
        detail: `内存是程序运行时的"工作台"！

• **随机访问**: 可以直接访问任何位置
• **易失性**: 断电后数据会丢失
• **容量**: 通常是 8GB、16GB、32GB

CPU 需要数据时，首先从内存中获取。内存比硬盘快 100,000 倍！`,
        subComponents: ["DRAM 芯片", "地址译码器"],
    },
    {
        id: "bus",
        name: "总线",
        nameEn: "System Bus",
        position: { x: 50, y: 170 },
        size: { w: 430, h: 40 },
        color: "from-green-500 to-emerald-500",
        icon: "🔌",
        description: "连接各部件的\"高速公路\"",
        detail: `总线是计算机内部的"交通系统"！

• **数据总线**: 传输实际数据
• **地址总线**: 指定访问哪个内存地址
• **控制总线**: 传输控制信号

总线宽度决定一次能传多少数据，比如 64 位总线一次传 8 字节。`,
        subComponents: ["数据总线", "地址总线", "控制总线"],
    },
    {
        id: "io",
        name: "I/O 设备",
        nameEn: "Input/Output Devices",
        position: { x: 50, y: 240 },
        size: { w: 180, h: 100 },
        color: "from-purple-500 to-violet-500",
        icon: "🖥️",
        description: "与外界交互的设备",
        detail: `I/O 设备让计算机能和外界"对话"！

**输入设备**: 
• 键盘、鼠标、摄像头

**输出设备**:
• 显示器、扬声器、打印机

**存储设备** (既是输入也是输出):
• 硬盘、U盘、SSD`,
        subComponents: ["键盘", "显示器", "硬盘"],
    },
    {
        id: "controller",
        name: "I/O 控制器",
        nameEn: "I/O Controller",
        position: { x: 300, y: 240 },
        size: { w: 180, h: 100 },
        color: "from-yellow-500 to-amber-500",
        icon: "🎛️",
        description: "管理 I/O 设备与系统的通信",
        detail: `I/O 控制器是设备和 CPU 之间的"翻译官"！

• 每种设备有专门的控制器
• 包含状态寄存器、数据寄存器
• 通过中断通知 CPU 事件完成

比如显卡就是显示器的控制器，声卡是音频设备的控制器。`,
        subComponents: ["状态寄存器", "数据缓冲"],
    },
];

// 数据流动画
const dataFlows = [
    { from: "cpu", to: "bus", label: "读/写请求" },
    { from: "bus", to: "memory", label: "访问内存" },
    { from: "bus", to: "controller", label: "控制 I/O" },
    { from: "controller", to: "io", label: "操作设备" },
];

export default function HardwareOverview({
    onInteract,
}: HardwareOverviewProps) {
    const [selectedComponent, setSelectedComponent] = useState<string | null>(
        null
    );
    const [showDataFlow, setShowDataFlow] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    const handleInteraction = () => {
        if (!hasInteracted && onInteract) {
            setHasInteracted(true);
            onInteract();
        }
    };

    const handleSelect = (id: string) => {
        setSelectedComponent(selectedComponent === id ? null : id);
        handleInteraction();
    };

    const selected = components.find((c) => c.id === selectedComponent);

    return (
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 sm:p-8">
            {/* 标题 */}
            <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    计算机硬件组成
                </h3>
                <p className="text-sm text-gray-600">
                    点击各个组件了解它们的功能
                </p>
            </div>

            {/* 硬件图示 */}
            <div className="relative bg-white rounded-xl p-6 mb-6 min-h-[400px] overflow-hidden border-2 border-gray-100">
                {/* 组件卡片 */}
                {components.map((component) => (
                    <motion.button
                        key={component.id}
                        onClick={() => handleSelect(component.id)}
                        className={`absolute rounded-xl p-4 text-left transition-all cursor-pointer ${selectedComponent === component.id
                            ? "ring-4 ring-indigo-400 shadow-xl z-10"
                            : "shadow-md hover:shadow-lg"
                            }`}
                        style={{
                            left: `${component.position.x}px`,
                            top: `${component.position.y}px`,
                            width: `${component.size.w}px`,
                            height: `${component.size.h}px`,
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div
                            className={`absolute inset-0 bg-gradient-to-br ${component.color} opacity-10 rounded-xl`}
                        />
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-2xl">
                                    {component.icon}
                                </span>
                                <span className="font-semibold text-gray-900 text-sm">
                                    {component.name.split("（")[0]}
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 line-clamp-2">
                                {component.description}
                            </p>
                        </div>
                    </motion.button>
                ))}

                {/* 连接线和数据流动画 */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
                            <stop offset="50%" stopColor="#10B981" stopOpacity="1" />
                            <stop offset="100%" stopColor="#10B981" stopOpacity="0.2" />
                        </linearGradient>
                    </defs>

                    {/* CPU 到总线 */}
                    <line x1="150" y1="140" x2="150" y2="170" stroke="#10B981" strokeWidth="3" />
                    {showDataFlow && (
                        <circle r="6" fill="#10B981">
                            <animate attributeName="cy" values="140;170;140" dur="1.5s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
                        </circle>
                    )}
                    {showDataFlow && <circle cx="150" cy="155" r="6" fill="#10B981">
                        <animate attributeName="cy" values="140;170;140" dur="1.5s" repeatCount="indefinite" />
                    </circle>}

                    {/* 内存到总线 */}
                    <line x1="390" y1="140" x2="390" y2="170" stroke="#10B981" strokeWidth="3" />
                    {showDataFlow && <circle cx="390" cy="155" r="6" fill="#3B82F6">
                        <animate attributeName="cy" values="170;140;170" dur="1.2s" repeatCount="indefinite" />
                    </circle>}

                    {/* 总线到控制器 */}
                    <line x1="390" y1="210" x2="390" y2="240" stroke="#10B981" strokeWidth="3" />
                    {showDataFlow && <circle cx="390" cy="225" r="6" fill="#F59E0B">
                        <animate attributeName="cy" values="210;240;210" dur="1.8s" repeatCount="indefinite" />
                    </circle>}

                    {/* 控制器到 I/O */}
                    <line x1="300" y1="290" x2="230" y2="290" stroke="#10B981" strokeWidth="3" />
                    {showDataFlow && <circle cx="265" cy="290" r="6" fill="#8B5CF6">
                        <animate attributeName="cx" values="300;230;300" dur="2s" repeatCount="indefinite" />
                    </circle>}

                    {/* 数据流标签 */}
                    {showDataFlow && (
                        <>
                            <text x="160" y="155" fill="#10B981" fontSize="10" fontWeight="bold">读/写</text>
                            <text x="400" y="155" fill="#3B82F6" fontSize="10" fontWeight="bold">数据</text>
                            <text x="400" y="225" fill="#F59E0B" fontSize="10" fontWeight="bold">控制</text>
                            <text x="250" y="280" fill="#8B5CF6" fontSize="10" fontWeight="bold">I/O</text>
                        </>
                    )}
                </svg>

                {/* 提示 */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2 text-sm text-gray-400">
                    <MousePointer2 size={16} />
                    点击组件查看详情
                </div>
            </div>

            {/* 控制按钮 */}
            <div className="flex justify-center mb-6">
                <button
                    onClick={() => {
                        setShowDataFlow(!showDataFlow);
                        handleInteraction();
                    }}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${showDataFlow
                        ? "bg-green-500 text-white"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                        }`}
                >
                    {showDataFlow ? "🔄 数据流动中..." : "▶️ 显示数据流动"}
                </button>
            </div>

            {/* 详细信息面板 */}
            {selected && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-gradient-to-br ${selected.color} rounded-xl p-6 text-white`}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-4xl">{selected.icon}</span>
                        <div>
                            <h4 className="text-xl font-bold">{selected.name}</h4>
                            <p className="text-sm opacity-80">{selected.nameEn}</p>
                        </div>
                    </div>

                    <div className="bg-white/20 rounded-lg p-4 mb-4">
                        <div className="text-sm leading-relaxed space-y-1">
                            {selected.detail.split('\n').map((line, i) => (
                                <p key={i}>{parseMarkdownBold(line)}</p>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {selected.subComponents.map((sub) => (
                            <span
                                key={sub}
                                className="px-3 py-1 bg-white/20 rounded-full text-sm"
                            >
                                {sub}
                            </span>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* 概念总结 */}
            <div className="mt-6 bg-blue-50 rounded-xl p-4">
                <h4 className="font-semibold text-blue-900 mb-2">
                    💡 核心概念
                </h4>
                <p className="text-sm text-blue-800">
                    计算机就像一个工厂：<strong>CPU</strong> 是工人，
                    <strong>内存</strong> 是工作台，<strong>总线</strong> 是传送带，
                    <strong>I/O 设备</strong> 是工厂的门窗（进料出货），
                    <strong>控制器</strong> 是门卫（管理进出）。
                </p>
            </div>
        </div>
    );
}
