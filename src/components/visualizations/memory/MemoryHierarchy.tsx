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

interface MemoryHierarchyProps {
    onInteract?: () => void;
}

// 存储层次数据
const layers = [
    {
        id: "registers",
        name: "寄存器",
        nameEn: "Registers",
        capacity: "< 1 KB",
        speed: "< 1 ns",
        speedValue: 0.5,
        cost: "$$$$$",
        color: "from-red-500 to-red-600",
        width: 120,
        icon: "⚡",
        description: "CPU 内部的超高速存储",
        detail: `寄存器是 CPU 内部的存储单元，速度最快！

• **数量有限**: 只有几十个
• **直接访问**: CPU 可以直接操作
• **用途**: 存放当前正在计算的数据

比喻：寄存器就像你手里正在用的工具，拿起来就能用。`,
    },
    {
        id: "l1cache",
        name: "L1 高速缓存",
        nameEn: "L1 Cache",
        capacity: "32-64 KB",
        speed: "~1 ns",
        speedValue: 1,
        cost: "$$$$",
        color: "from-orange-500 to-orange-600",
        width: 180,
        icon: "🔥",
        description: "CPU 芯片内的一级缓存",
        detail: `L1 缓存是最接近 CPU 核心的缓存！

• **分为两部分**: 指令缓存 (L1i) 和数据缓存 (L1d)
• **每个核心独有**: 多核 CPU 每个核心都有自己的 L1
• **速度接近寄存器**: 但容量更大

比喻：L1 像你工作台上的工具盒，常用工具放这里。`,
    },
    {
        id: "l2cache",
        name: "L2 高速缓存",
        nameEn: "L2 Cache",
        capacity: "256 KB - 1 MB",
        speed: "~10 ns",
        speedValue: 10,
        cost: "$$$",
        color: "from-yellow-500 to-yellow-600",
        width: 240,
        icon: "💨",
        description: "CPU 芯片内的二级缓存",
        detail: `L2 缓存是 L1 缓存的后备！

• **容量更大**: 通常是 L1 的 4-8 倍
• **稍慢一点**: 但仍然很快
• **每个核心独有**: 或部分核心共享

比喻：L2 像你书桌的抽屉，存放次常用的东西。`,
    },
    {
        id: "l3cache",
        name: "L3 高速缓存",
        nameEn: "L3 Cache",
        capacity: "4-64 MB",
        speed: "~30 ns",
        speedValue: 30,
        cost: "$$",
        color: "from-green-500 to-green-600",
        width: 300,
        icon: "🌊",
        description: "多核共享的三级缓存",
        detail: `L3 缓存是多个 CPU 核心共享的缓存！

• **容量最大**: 可达几十 MB
• **所有核心共享**: 方便核心间数据交换
• **最后一道屏障**: 未命中就要访问内存

比喻：L3 像办公室的公共储物柜，大家都能用。`,
    },
    {
        id: "memory",
        name: "主存 (内存)",
        nameEn: "Main Memory (RAM)",
        capacity: "8-128 GB",
        speed: "~100 ns",
        speedValue: 100,
        cost: "$",
        color: "from-blue-500 to-blue-600",
        width: 380,
        icon: "💾",
        description: "程序运行时的工作区",
        detail: `主存储器是程序运行的"工作区"！

• **容量大**: 比缓存大 1000 倍
• **速度较慢**: 比 L3 慢约 3 倍  
• **易失性**: 断电就丢失数据
• **随机访问**: 可访问任意地址

比喻：主存像你的书房，放着所有正在用的书。`,
    },
    {
        id: "ssd",
        name: "固态硬盘 (SSD)",
        nameEn: "Solid State Drive",
        capacity: "256 GB - 4 TB",
        speed: "~0.1 ms",
        speedValue: 100000,
        cost: "¢¢",
        color: "from-indigo-500 to-indigo-600",
        width: 440,
        icon: "💿",
        description: "快速的永久存储",
        detail: `SSD 是基于闪存的永久存储设备！

• **非易失性**: 断电不丢失数据
• **比 HDD 快**: 无机械部件
• **随机访问快**: 适合操作系统和软件
• **价格适中**: 性价比高

比喻：SSD 像你的书柜，存放常用的书。`,
    },
    {
        id: "hdd",
        name: "机械硬盘 (HDD)",
        nameEn: "Hard Disk Drive",
        capacity: "1-20 TB",
        speed: "~10 ms",
        speedValue: 10000000,
        cost: "¢",
        color: "from-purple-500 to-purple-600",
        width: 500,
        icon: "📀",
        description: "大容量永久存储",
        detail: `HDD 是传统的机械磁盘存储！

• **容量超大**: 可达几十 TB
• **价格便宜**: 每 GB 成本最低
• **速度较慢**: 需要机械寻道
• **适合冷数据**: 不常访问的文件

比喻：HDD 像仓库，存放大量不常用的东西。`,
    },
];

export default function MemoryHierarchy({ onInteract }: MemoryHierarchyProps) {
    const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
    const [hasInteracted, setHasInteracted] = useState(false);

    const handleInteraction = () => {
        if (!hasInteracted && onInteract) {
            setHasInteracted(true);
            onInteract();
        }
    };

    const handleSelect = (id: string) => {
        setSelectedLayer(selectedLayer === id ? null : id);
        handleInteraction();
    };

    const selected = layers.find((l) => l.id === selectedLayer);

    return (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 sm:p-8">
            {/* 标题 */}
            <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    存储器层次结构
                </h3>
                <p className="text-sm text-gray-600">
                    从最快到最慢的存储金字塔 — 点击各层了解详情
                </p>
            </div>

            {/* 金字塔结构 */}
            <div className="flex flex-col items-center gap-2 mb-6">
                {layers.map((layer, index) => (
                    <motion.button
                        key={layer.id}
                        onClick={() => handleSelect(layer.id)}
                        className={`relative overflow-hidden rounded-lg transition-all ${selectedLayer === layer.id
                            ? "ring-4 ring-indigo-400 shadow-xl"
                            : "shadow-md hover:shadow-lg"
                            }`}
                        style={{ width: `${layer.width}px` }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div
                            className={`bg-gradient-to-r ${layer.color} px-4 py-3 text-white`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">{layer.icon}</span>
                                    <span className="font-semibold text-sm">
                                        {layer.name}
                                    </span>
                                </div>
                                <span className="text-xs opacity-80">
                                    {layer.capacity}
                                </span>
                            </div>
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* 图例 */}
            <div className="flex justify-center gap-6 mb-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-orange-500 rounded" />
                    <span>越快越贵</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded" />
                    <span>越慢越便宜</span>
                </div>
            </div>

            {/* 详细信息面板 */}
            {selected && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-gradient-to-br ${selected.color} rounded-xl p-6 text-white mb-6`}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-4xl">{selected.icon}</span>
                        <div>
                            <h4 className="text-xl font-bold">{selected.name}</h4>
                            <p className="text-sm opacity-80">{selected.nameEn}</p>
                        </div>
                    </div>

                    {/* 规格 */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="bg-white/20 rounded-lg p-3 text-center">
                            <div className="text-xs opacity-80">容量</div>
                            <div className="font-bold">{selected.capacity}</div>
                        </div>
                        <div className="bg-white/20 rounded-lg p-3 text-center">
                            <div className="text-xs opacity-80">访问时间</div>
                            <div className="font-bold">{selected.speed}</div>
                        </div>
                        <div className="bg-white/20 rounded-lg p-3 text-center">
                            <div className="text-xs opacity-80">相对成本</div>
                            <div className="font-bold">{selected.cost}</div>
                        </div>
                    </div>

                    {/* 详细说明 */}
                    <div className="bg-white/20 rounded-lg p-4">
                        <div className="text-sm leading-relaxed space-y-1">
                            {selected.detail.split('\n').map((line, i) => (
                                <p key={i}>{parseMarkdownBold(line)}</p>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}

            {/* 核心概念 */}
            <div className="bg-indigo-100 rounded-xl p-4">
                <h4 className="font-semibold text-indigo-900 mb-2">
                    💡 为什么需要层次结构？
                </h4>
                <p className="text-sm text-indigo-800 mb-2">
                    <strong>核心矛盾</strong>：我们想要既快又大又便宜的存储，但现实是：
                </p>
                <ul className="text-sm text-indigo-700 space-y-1 ml-4">
                    <li>• 快的存储（如寄存器）容量小、价格贵</li>
                    <li>• 大的存储（如硬盘）速度慢、价格便宜</li>
                </ul>
                <p className="text-sm text-indigo-800 mt-2">
                    <strong>解决方案</strong>：利用<strong>局部性原理</strong>
                    ——程序倾向于反复访问相同或临近的数据。
                    把常用数据放在快速存储中，就能获得接近最快速度的体验！
                </p>
            </div>
        </div>
    );
}
