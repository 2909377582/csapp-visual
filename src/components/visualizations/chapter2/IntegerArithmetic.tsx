"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, AlertTriangle, Info } from "lucide-react";

interface IntegerArithmeticProps {
    onInteract?: () => void;
}

export default function IntegerArithmetic({ onInteract }: IntegerArithmeticProps) {
    const [valA, setValA] = useState(120);
    const [valB, setValB] = useState(10);
    const [hasInteracted, setHasInteracted] = useState(false);

    const handleInteract = () => {
        if (!hasInteracted && onInteract) {
            setHasInteracted(true);
            onInteract();
        }
    };

    // 8-bit Two's Complement Signed Integer
    const toBinary8 = (n: number) => {
        const value = n < 0 ? (1 << 8) + n : n;
        return value.toString(2).padStart(8, "0").split("");
    };

    const binA = toBinary8(valA);
    const binB = toBinary8(valB);

    // Theoretical sum
    const theoreticalSum = valA + valB;
    // 8-bit actual sum (signed)
    let actualSum = theoreticalSum;
    if (actualSum > 127) {
        actualSum -= 256;
    } else if (actualSum < -128) {
        actualSum += 256;
    }

    const binSum = toBinary8(actualSum);
    const isOverflow = theoreticalSum > 127 || theoreticalSum < -128;

    return (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 sm:p-8 border border-amber-100 shadow-sm">
            {/* Input Controls */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
                <div className="flex flex-col gap-4 w-full md:w-auto">
                    <div className="flex items-center justify-between gap-4">
                        <label className="text-sm font-bold text-gray-500 uppercase">数值 A (Signed 8-bit)</label>
                        <span className="text-indigo-600 font-mono font-bold">{valA}</span>
                    </div>
                    <input
                        type="range" min="-128" max="127" value={valA}
                        onChange={(e) => { setValA(parseInt(e.target.value)); handleInteract(); }}
                        className="w-full md:w-64 accent-indigo-600"
                    />
                </div>
                <div className="text-gray-400 font-bold text-2xl">+</div>
                <div className="flex flex-col gap-4 w-full md:w-auto">
                    <div className="flex items-center justify-between gap-4">
                        <label className="text-sm font-bold text-gray-500 uppercase">数值 B (Signed 8-bit)</label>
                        <span className="text-amber-600 font-mono font-bold">{valB}</span>
                    </div>
                    <input
                        type="range" min="-128" max="127" value={valB}
                        onChange={(e) => { setValB(parseInt(e.target.value)); handleInteract(); }}
                        className="w-full md:w-64 accent-amber-600"
                    />
                </div>
            </div>

            {/* Arithmetic Table */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100 max-w-2xl mx-auto">
                <div className="flex flex-col gap-4 font-mono text-xl sm:text-2xl">
                    {/* Value A */}
                    <div className="flex justify-between items-center px-4 py-2 bg-indigo-50/50 rounded-lg">
                        <span className="text-sm font-sans font-bold text-indigo-400">A</span>
                        <div className="flex gap-1">
                            {binA.map((bit, i) => (
                                <span key={i} className={`w-8 text-center ${bit === "1" ? "text-indigo-600 font-bold" : "text-gray-300"}`}>{bit}</span>
                            ))}
                        </div>
                    </div>

                    {/* Value B */}
                    <div className="flex justify-between items-center px-4 py-2 bg-amber-50/50 rounded-lg">
                        <span className="text-sm font-sans font-bold text-amber-400 flex items-center gap-1">
                            <Plus className="w-4 h-4" /> B
                        </span>
                        <div className="flex gap-1">
                            {binB.map((bit, i) => (
                                <span key={i} className={`w-8 text-center ${bit === "1" ? "text-amber-600 font-bold" : "text-gray-300"}`}>{bit}</span>
                            ))}
                        </div>
                    </div>

                    <div className="h-[2px] bg-gray-200 my-1 mx-4"></div>

                    {/* Result */}
                    <div className={`flex justify-between items-center px-4 py-3 rounded-lg transition-colors ${isOverflow ? "bg-red-50" : "bg-green-50"}`}>
                        <span className={`text-sm font-sans font-bold ${isOverflow ? "text-red-500" : "text-green-600"}`}>
                            {isOverflow ? "溢出!" : "结果"}
                        </span>
                        <motion.div
                            key={`${valA}-${valB}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex gap-1"
                        >
                            {binSum.map((bit, i) => (
                                <span key={i} className={`w-8 text-center ${isOverflow ? "text-red-600 font-black" : "text-green-700 font-bold"}`}>{bit}</span>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Legend & Details */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-100 pt-6">
                    <div className="space-y-2">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">十进制推演</div>
                        <div className="flex items-center gap-2 text-gray-700">
                            <span className="font-mono">{valA}</span>
                            <span className="text-gray-300">+</span>
                            <span className="font-mono">{valB}</span>
                            <span className="text-gray-300">=</span>
                            <span className={`font-mono font-bold ${isOverflow ? "text-red-600" : "text-green-600"}`}>
                                {actualSum}
                            </span>
                        </div>
                        {isOverflow && (
                            <div className="text-[10px] text-red-500 font-medium">
                                * 真实结果 {theoreticalSum} 超出了 8 位有符号数范围 [-128, 127]
                            </div>
                        )}
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 flex gap-3 items-start">
                        <Info className="w-4 h-4 text-indigo-400 mt-1 flex-shrink-0" />
                        <p className="text-[11px] text-gray-500 leading-relaxed">
                            <strong>补码加法原理</strong>：计算机在进行加法时并不区分有符号和无符号，位级运算完全一致。溢出只是结果的解析方式超出了表示范围。
                        </p>
                    </div>
                </div>
            </div>

            {/* Overflow Animation Alert */}
            <AnimatePresence>
                {isOverflow && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        className="mt-6 flex items-center gap-4 bg-red-600 text-white p-4 rounded-xl shadow-lg shadow-red-200"
                    >
                        <div className="bg-white/20 p-2 rounded-lg">
                            <AlertTriangle className="w-6 h-6 animate-pulse" />
                        </div>
                        <div>
                            <h5 className="font-bold text-sm">发生正向/负向溢出！</h5>
                            <p className="text-xs opacity-90">就像钟表拨过12点一样，计算结果在有限的位宽内“回绕”了。</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

