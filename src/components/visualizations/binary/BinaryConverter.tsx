"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BinaryConverterProps {
    onInteract?: () => void;
}

export default function BinaryConverter({ onInteract }: BinaryConverterProps) {
    const [decimalValue, setDecimalValue] = useState<number>(42);
    const [bitCount, setBitCount] = useState<8 | 16 | 32>(8);
    const [hasInteracted, setHasInteracted] = useState(false);

    const handleChange = (value: number) => {
        const maxValue = Math.pow(2, bitCount) - 1;
        const clampedValue = Math.min(Math.max(0, value), maxValue);
        setDecimalValue(clampedValue);

        if (!hasInteracted && onInteract) {
            setHasInteracted(true);
            onInteract();
        }
    };

    const toBinary = (num: number, bits: number): string[] => {
        const binary = num.toString(2).padStart(bits, "0");
        return binary.split("");
    };

    const binaryDigits = toBinary(decimalValue, bitCount);

    // 将二进制数字分组显示（每4位一组）
    const groupedBinary: string[][] = [];
    for (let i = 0; i < binaryDigits.length; i += 4) {
        groupedBinary.push(binaryDigits.slice(i, i + 4));
    }

    return (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 sm:p-8">
            {/* Input Section */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
                {/* Decimal Input */}
                <div className="text-center">
                    <label className="block text-sm text-gray-500 mb-2">十进制数</label>
                    <input
                        type="number"
                        value={decimalValue}
                        onChange={(e) => handleChange(parseInt(e.target.value) || 0)}
                        className="w-32 px-4 py-3 text-2xl font-mono font-bold text-center bg-white border-2 border-indigo-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                        min={0}
                        max={Math.pow(2, bitCount) - 1}
                    />
                </div>

                {/* Arrow */}
                <div className="text-3xl text-gray-400">→</div>

                {/* Bit Count Selector */}
                <div className="text-center">
                    <label className="block text-sm text-gray-500 mb-2">位数</label>
                    <div className="flex gap-2">
                        {([8, 16, 32] as const).map((bits) => (
                            <button
                                key={bits}
                                onClick={() => {
                                    setBitCount(bits);
                                    // Clamp value to new max
                                    const maxValue = Math.pow(2, bits) - 1;
                                    if (decimalValue > maxValue) {
                                        setDecimalValue(maxValue);
                                    }
                                }}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${bitCount === bits
                                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                                        : "bg-white text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                {bits}位
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Binary Display */}
            <div className="overflow-x-auto pb-4">
                <div className="flex flex-wrap justify-center gap-3">
                    {groupedBinary.map((group, groupIndex) => (
                        <div key={groupIndex} className="flex gap-1">
                            {group.map((bit, bitIndex) => {
                                const absoluteIndex = groupIndex * 4 + bitIndex;
                                const bitPosition = bitCount - 1 - absoluteIndex;
                                const bitValue = Math.pow(2, bitPosition);

                                return (
                                    <motion.div
                                        key={absoluteIndex}
                                        className="relative"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: absoluteIndex * 0.02 }}
                                    >
                                        <motion.button
                                            onClick={() => {
                                                const newValue =
                                                    bit === "1"
                                                        ? decimalValue - bitValue
                                                        : decimalValue + bitValue;
                                                handleChange(newValue);
                                            }}
                                            className={`w-10 h-14 sm:w-12 sm:h-16 rounded-lg font-mono text-xl sm:text-2xl font-bold transition-all transform hover:scale-105 ${bit === "1"
                                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                                                    : "bg-white text-gray-400 border-2 border-gray-200 hover:border-indigo-300"
                                                }`}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <AnimatePresence mode="wait">
                                                <motion.span
                                                    key={bit}
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={{ duration: 0.15 }}
                                                >
                                                    {bit}
                                                </motion.span>
                                            </AnimatePresence>
                                        </motion.button>
                                        {/* Bit Position Label */}
                                        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-gray-400">
                                            2<sup>{bitPosition}</sup>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>

            {/* Calculation Display */}
            <motion.div
                className="mt-10 p-4 bg-white/80 rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <div className="text-sm text-gray-500 mb-2">计算过程：</div>
                <div className="font-mono text-sm text-gray-700 flex flex-wrap gap-1 items-center">
                    {binaryDigits.map((bit, index) => {
                        const bitPosition = bitCount - 1 - index;
                        const bitValue = parseInt(bit) * Math.pow(2, bitPosition);
                        if (bit === "1") {
                            return (
                                <span key={index} className="inline-flex items-center">
                                    {index > 0 &&
                                        binaryDigits.slice(0, index).some((b) => b === "1") && (
                                            <span className="mx-1 text-gray-400">+</span>
                                        )}
                                    <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded">
                                        2<sup>{bitPosition}</sup>
                                        <span className="text-gray-400 mx-1">=</span>
                                        {bitValue}
                                    </span>
                                </span>
                            );
                        }
                        return null;
                    })}
                    <span className="mx-2 text-gray-400">=</span>
                    <span className="px-3 py-1 bg-indigo-600 text-white rounded-lg font-bold">
                        {decimalValue}
                    </span>
                </div>
            </motion.div>

            {/* Tips */}
            <div className="mt-6 text-center text-sm text-gray-500">
                💡 点击任意二进制位可以切换 0/1
            </div>
        </div>
    );
}
