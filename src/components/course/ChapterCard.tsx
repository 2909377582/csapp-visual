"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Lock, CheckCircle, ArrowRight } from "lucide-react";
import { Chapter } from "@/lib/chapters";
import { ChapterProgress } from "@/lib/chapters";

interface ChapterCardProps {
    chapter: Chapter;
    progress: ChapterProgress;
    index: number;
}

export default function ChapterCard({
    chapter,
    progress,
    index,
}: ChapterCardProps) {
    const isLocked = !progress.isUnlocked;
    const isCompleted = progress.isCompleted;
    const progressPercent = progress.progress;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={!isLocked ? { y: -5, scale: 1.02 } : {}}
            className="relative"
        >
            <Link
                href={isLocked ? "#" : `/courses/${chapter.id}`}
                className={`block relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${isLocked
                        ? "border-gray-200 bg-gray-50 cursor-not-allowed"
                        : isCompleted
                            ? "border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg hover:shadow-green-500/10"
                            : "border-indigo-100 bg-white hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/10"
                    }`}
                onClick={(e) => isLocked && e.preventDefault()}
            >
                {/* 顶部颜色条 */}
                <div
                    className="h-1.5 w-full"
                    style={{
                        background: isLocked
                            ? "#d1d5db"
                            : isCompleted
                                ? "linear-gradient(to right, #22c55e, #10b981)"
                                : `linear-gradient(to right, ${chapter.color}, ${chapter.color}88)`,
                    }}
                />

                <div className="p-6">
                    {/* 图标和章节号 */}
                    <div className="flex items-start justify-between mb-4">
                        <div
                            className={`text-4xl ${isLocked ? "grayscale opacity-50" : ""}`}
                        >
                            {chapter.icon}
                        </div>
                        <div className="flex items-center gap-2">
                            {isLocked && (
                                <span className="flex items-center gap-1 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                                    <Lock size={12} />
                                    锁定
                                </span>
                            )}
                            {isCompleted && (
                                <span className="flex items-center gap-1 text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                    <CheckCircle size={12} />
                                    已完成
                                </span>
                            )}
                        </div>
                    </div>

                    {/* 章节信息 */}
                    <div className="mb-4">
                        <div className="text-xs text-gray-400 mb-1">
                            第 {chapter.number} 章 · Part {chapter.part}
                        </div>
                        <h3
                            className={`text-lg font-semibold mb-2 ${isLocked ? "text-gray-400" : "text-gray-900"
                                }`}
                        >
                            {chapter.title}
                        </h3>
                        <p
                            className={`text-sm line-clamp-2 ${isLocked ? "text-gray-400" : "text-gray-600"
                                }`}
                        >
                            {chapter.description}
                        </p>
                    </div>

                    {/* 进度条 */}
                    {!isLocked && (
                        <div className="mt-4">
                            <div className="flex items-center justify-between text-xs mb-2">
                                <span className="text-gray-500">学习进度</span>
                                <span className="font-medium text-indigo-600">
                                    {progressPercent}%
                                </span>
                            </div>
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {/* 行动按钮 */}
                    {!isLocked && (
                        <div className="mt-4 flex items-center text-sm font-medium text-indigo-600 group-hover:text-indigo-700">
                            {isCompleted ? "再次学习" : progressPercent > 0 ? "继续学习" : "开始学习"}
                            <ArrowRight size={16} className="ml-1" />
                        </div>
                    )}
                </div>

                {/* 锁定蒙层 */}
                {isLocked && (
                    <div className="absolute inset-0 bg-gray-100/50 backdrop-blur-[1px] flex items-center justify-center">
                        <div className="text-center">
                            <Lock size={24} className="mx-auto text-gray-400 mb-2" />
                            <p className="text-xs text-gray-500">完成前一章后解锁</p>
                        </div>
                    </div>
                )}
            </Link>
        </motion.div>
    );
}
