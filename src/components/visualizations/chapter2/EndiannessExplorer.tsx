"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRightLeft, Cpu, Database } from "lucide-react";

interface EndiannessExplorerProps {
    onInteract?: () => void;
}

export default function EndiannessExplorer({ onInteract }: EndiannessExplorerProps) {
    const [hexValue, setHexValue] = useState("12345678");
    const [isLittleEndian, setIsLittleEndian] = useState(true);
    const [hasInteracted, setHasInteracted] = useState(false);

    const handleInteract = () => {
        if (!hasInteracted && onInteract) {
            setHasInteracted(true);
            onInteract();
        }
    };

    // Ensure hexValue is 8 characters long (32-bit)
    const normalizedHex = hexValue.padStart(8, "0").slice(-8);
    const bytes = [
        normalizedHex.slice(0, 2),
        normalizedHex.slice(2, 4),
        normalizedHex.slice(4, 6),
        normalizedHex.slice(6, 8),
    ];

    const displayBytes = isLittleEndian ? [...bytes].reverse() : bytes;

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 border border-blue-100 shadow-sm">
            {/* Header/Input */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
                <div className="flex flex-col gap-2 w-full md:w-auto">
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                        输入 32 位十六进制数 (0x)
                    </label>
                    <div className="relative group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-xl">0x</span>
                        <input
                            type="text"
                            maxLength={8}
                            value={hexValue}
                            onChange={(e) => {
                                setHexValue(e.target.value.replace(/[^0-9a-fA-F]/g, ""));
                                handleInteract();
                            }}
                            className="pl-12 pr-4 py-3 text-2xl font-mono font-bold w-full md:w-56 bg-white border-2 border-blue-100 rounded-xl focus:border-blue-500 focus:outline-none transition-all shadow-sm group-hover:shadow-md"
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2 w-full md:w-auto">
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                        切换字节序
                    </label>
                    <button
                        onClick={() => {
                            setIsLittleEndian(!isLittleEndian);
                            handleInteract();
                        }}
                        className={`flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-bold transition-all shadow-lg w-full md:w-auto ${isLittleEndian
                                ? "bg-indigo-600 text-white shadow-indigo-200"
                                : "bg-blue-600 text-white shadow-blue-200"
                            } hover:scale-105 active:scale-95`}
                    >
                        <ArrowRightLeft className="w-5 h-5" />
                        {isLittleEndian ? "小端序 (Little Endian)" : "大端序 (Big Endian)"}
                    </button>
                </div>
            </div>

            {/* Main Viz Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                {/* Visualizer */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-6 text-indigo-600">
                            <Database className="w-5 h-5" />
                            <h3 className="font-bold">内存布局 (从低地址到高地址)</h3>
                        </div>

                        <div className="flex justify-center gap-2 sm:gap-4 overflow-x-auto py-2">
                            {displayBytes.map((byte, idx) => (
                                <motion.div
                                    key={`${isLittleEndian}-${idx}`}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex flex-col items-center gap-3 min-w-[70px]"
                                >
                                    <div className="text-[10px] sm:text-xs font-mono text-gray-400">
                                        地址: 0x10{idx}
                                    </div>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className={`w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center text-xl sm:text-2xl font-mono font-bold rounded-xl border-2 transition-all ${isLittleEndian
                                                ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                                                : "bg-blue-50 border-blue-200 text-blue-700"
                                            }`}
                                    >
                                        <AnimatePresence mode="wait">
                                            <motion.span
                                                key={byte}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                            >
                                                {byte.toUpperCase()}
                                            </motion.span>
                                        </AnimatePresence>
                                    </motion.div>
                                    <div className="text-[10px] font-medium text-gray-500">
                                        Byte {isLittleEndian ? 3 - idx : idx}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <div className="flex items-center gap-2 mb-2 text-gray-600">
                            <Cpu className="w-4 h-4" />
                            <span className="text-sm font-bold">CPU 原理说明:</span>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed min-h-[60px]">
                            {isLittleEndian
                                ? "小端序 (x86/ARM) 将最低有效字节存储在低地址。虽然人类更直观地理解大端序，但小端序在计算加法和强制类型转换（如从 32 位转 16 位）时效率更高。"
                                : "大端序 (网络字节序) 将最高有效字节存储在低地址。它最符合人类从左到右阅读数字的习惯，因此广泛应用于网络传输协议中。"}
                        </p>
                    </div>
                </div>

                {/* Explanation Cards */}
                <div className="flex flex-col gap-4">
                    <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-xl p-5 shadow-md">
                        <h4 className="font-bold mb-2 flex items-center gap-2">
                            <span>💡</span> 什么是字节序？
                        </h4>
                        <p className="text-sm opacity-90 leading-relaxed">
                            字节序（Endianness）是指在计算机内存中，多字节数据（如 32 位整数、浮点数）的存储顺序。
                        </p>
                        <div className="mt-4 grid grid-cols-2 gap-3">
                            <div className="bg-white/10 rounded-lg p-3 text-xs">
                                <span className="font-bold block mb-1">MSB</span>
                                最高有效字节<br />(最高位字节)
                            </div>
                            <div className="bg-white/10 rounded-lg p-3 text-xs">
                                <span className="font-bold block mb-1">LSB</span>
                                最低有效字节<br />(最低位字节)
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 border border-blue-100 shadow-sm flex-grow">
                        <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                            <span>🔑</span> 必考点
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-3 list-none pl-1">
                            <li className="flex items-start gap-2">
                                <span className="text-indigo-500 mt-1">•</span>
                                <div><strong className="text-indigo-700">字节内部不变</strong>：字节序只决定字节见的顺序，字节内部的位顺序不受影响。</div>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-indigo-500 mt-1">•</span>
                                <div><strong className="text-indigo-700">小端序优势</strong>：强制转换类型时无需改变指针地址。</div>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-indigo-500 mt-1">•</span>
                                <div><strong className="text-indigo-700">网络序就是大端序</strong>：所有的网络协议头通常都要求采用大端序。</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="mt-8 flex flex-wrap justify-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                    <span className="text-xs text-gray-400 font-mono">0x100: 低地址</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-300"></div>
                    <span className="text-xs text-gray-400 font-mono">0x103: 高地址</span>
                </div>
            </div>
        </div>
    );
}
