"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, HelpCircle, Layers } from "lucide-react";

interface FloatingPointDecoderProps {
    onInteract?: () => void;
}

export default function FloatingPointDecoder({ onInteract }: FloatingPointDecoderProps) {
    const [inputValue, setInputValue] = useState("3.14159");
    const [hasInteracted, setHasInteracted] = useState(false);

    const handleInteract = () => {
        if (!hasInteracted && onInteract) {
            setHasInteracted(true);
            onInteract();
        }
    };

    const floatData = useMemo(() => {
        const num = parseFloat(inputValue);
        if (isNaN(num)) return null;

        const buffer = new ArrayBuffer(4);
        const view = new DataView(buffer);
        view.setFloat32(0, num);
        const bits = view.getUint32(0);
        const binary = bits.toString(2).padStart(32, "0");

        const sign = binary[0];
        const exponent = binary.slice(1, 9);
        const fraction = binary.slice(9);

        const expValue = parseInt(exponent, 2);
        const bias = 127;
        const E = expValue - bias;

        // Mantissa interpretation (Assuming normalized for simplicity in basic view)
        const M = 1 + parseInt(fraction, 2) / Math.pow(2, 23);

        return {
            sign,
            exponent,
            fraction,
            expValue,
            E,
            M,
            num
        };
    }, [inputValue]);

    return (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 sm:p-8 border border-green-100 shadow-sm">
            {/* Input Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
                <div className="flex flex-col gap-2 w-full md:w-auto">
                    <label className="text-sm font-bold text-gray-500 uppercase flex items-center gap-2">
                        <Calculator className="w-4 h-4" /> 输入十进制浮点数
                    </label>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            handleInteract();
                        }}
                        className="px-4 py-3 text-2xl font-mono font-bold w-full md:w-64 bg-white border-2 border-emerald-100 rounded-xl focus:border-emerald-500 focus:outline-none transition-all"
                    />
                </div>

                <div className="bg-white/80 backdrop-blur p-4 rounded-xl border border-emerald-200 text-sm text-emerald-800 font-medium">
                    🔍 正在分析: <span className="font-mono font-bold underline">IEEE 754 单精度 (32-bit)</span>
                </div>
            </div>

            {floatData ? (
                <div className="space-y-8">
                    {/* Bit Visualization */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100 overflow-x-auto">
                        <div className="flex min-w-[600px] gap-1 font-mono text-white text-xs select-none">
                            {/* Sign */}
                            <div className="flex-none">
                                <div className="text-gray-400 mb-1 text-center">符号 (s)</div>
                                <motion.div
                                    className="w-10 h-10 bg-red-500 rounded flex items-center justify-center text-lg font-bold shadow-sm"
                                    animate={{ backgroundColor: floatData.sign === "0" ? "#ef4444" : "#b91c1c" }}
                                >
                                    {floatData.sign}
                                </motion.div>
                                <div className="text-[10px] text-gray-400 mt-1 text-center font-bold">1 Bit</div>
                            </div>

                            {/* Exponent */}
                            <div className="flex-none ml-2">
                                <div className="text-gray-400 mb-1 text-center">阶码 (exp)</div>
                                <div className="flex gap-1">
                                    {floatData.exponent.split("").map((bit, i) => (
                                        <motion.div
                                            key={`exp-${i}`}
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.02 }}
                                            className="w-7 h-10 bg-blue-500 rounded flex items-center justify-center text-sm font-bold shadow-sm"
                                        >
                                            {bit}
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="text-[10px] text-gray-400 mt-1 text-center font-bold">8 Bits</div>
                            </div>

                            {/* Fraction */}
                            <div className="flex-none ml-2 overflow-hidden">
                                <div className="text-gray-400 mb-1 text-center">尾数 (frac)</div>
                                <div className="flex gap-1">
                                    {floatData.fraction.split("").map((bit, i) => (
                                        <motion.div
                                            key={`frac-${i}`}
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 + i * 0.01 }}
                                            className="w-5 h-10 bg-emerald-500 rounded flex items-center justify-center text-[10px] font-bold shadow-sm"
                                        >
                                            {bit}
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="text-[10px] text-gray-400 mt-1 text-center font-bold">23 Bits</div>
                            </div>
                        </div>
                    </div>

                    {/* Formula Push */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl p-5 border border-emerald-100 flex flex-col items-center justify-center">
                            <Layers className="w-6 h-6 text-red-500 mb-2" />
                            <div className="text-xs text-gray-400 uppercase font-bold mb-1">符号位影响力</div>
                            <div className="text-xl font-bold text-gray-800">(-1)<sup>{floatData.sign}</sup> = {floatData.sign === "0" ? "+1" : "-1"}</div>
                        </div>

                        <div className="bg-white rounded-xl p-5 border border-emerald-100 flex flex-col items-center justify-center text-center">
                            <div className="text-xs text-gray-400 uppercase font-bold mb-1">阶码推算 (E = exp - 127)</div>
                            <div className="text-xl font-bold text-blue-600 font-mono">
                                2<sup>{floatData.expValue} - 127</sup> = 2<sup>{floatData.E}</sup>
                            </div>
                            <div className="text-[10px] text-gray-400 mt-1">Scale: {Math.pow(2, floatData.E).toExponential(2)}</div>
                        </div>

                        <div className="bg-white rounded-xl p-5 border border-emerald-100 flex flex-col items-center justify-center">
                            <div className="text-xs text-gray-400 uppercase font-bold mb-1">尾数推算 (1 + frac)</div>
                            <div className="text-xl font-bold text-emerald-600 font-mono">
                                M ≈ {floatData.M.toFixed(6)}
                            </div>
                        </div>
                    </div>

                    {/* Final Result Panel */}
                    <div className="bg-emerald-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
                        <div className="absolute right-[-20px] top-[-20px] opacity-10">
                            <HelpCircle className="w-40 h-40" />
                        </div>
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="text-emerald-300 text-sm font-bold mb-2 uppercase tracking-widest">最终组合计算结果</div>
                            <div className="text-2xl sm:text-4xl font-mono font-bold flex flex-wrap justify-center items-center gap-3">
                                <span>V =</span>
                                <span className="text-red-400">(-1)<sup>{floatData.sign}</sup></span>
                                <span className="text-gray-500">×</span>
                                <span className="text-emerald-400">{floatData.M.toFixed(4)}...</span>
                                <span className="text-gray-500">×</span>
                                <span className="text-blue-400">2<sup>{floatData.E}</sup></span>
                            </div>
                            <div className="mt-4 pt-4 border-t border-emerald-800 w-full flex justify-center gap-4 items-center">
                                <span className="text-emerald-400 font-bold">实际值:</span>
                                <span className="text-3xl font-mono text-white">{floatData.num}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-20 text-gray-400 flex flex-col items-center gap-4">
                    <AlertTriangle className="w-12 h-12 text-amber-400" />
                    <p>请输入有效的十进制数字</p>
                </div>
            )}
        </div>
    );
}

const AlertTriangle = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
);
