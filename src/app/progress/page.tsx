"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Trophy, Target, Clock, BookOpen } from "lucide-react";
import { chapters, ChapterProgress } from "@/lib/chapters";
import {
    getAllProgress,
    getOverallProgress,
    getCompletedChaptersCount,
} from "@/lib/progress";

export default function ProgressPage() {
    const [progressData, setProgressData] = useState<
        Record<string, ChapterProgress>
    >({});
    const [overallProgress, setOverallProgress] = useState(0);
    const [completedCount, setCompletedCount] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setProgressData(getAllProgress());
        setOverallProgress(getOverallProgress());
        setCompletedCount(getCompletedChaptersCount());
    }, []);

    if (!mounted) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full" />
            </div>
        );
    }

    // 找到当前正在学习的章节（第一个未完成但已解锁的章节）
    const currentChapter = chapters.find((ch) => {
        const prog = progressData[ch.id];
        return prog?.isUnlocked && !prog?.isCompleted;
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50/50 to-white">
            <div className="max-w-4xl mx-auto px-4 py-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">我的学习进度</h1>
                    <p className="text-lg text-gray-600">跟踪您的 CSAPP 学习旅程</p>
                </motion.div>

                {/* Progress Overview Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                >
                    {/* Overall Progress */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                                <Target className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">总体进度</div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {overallProgress}%
                                </div>
                            </div>
                        </div>
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${overallProgress}%` }}
                            />
                        </div>
                    </div>

                    {/* Completed */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                                <Trophy className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">已完成章节</div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {completedCount} / {chapters.length}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Current Chapter */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">当前章节</div>
                                <div className="text-lg font-bold text-gray-900 truncate">
                                    {currentChapter ? currentChapter.title : "全部完成！"}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Continue Learning CTA */}
                {currentChapter && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 mb-12 text-white"
                    >
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <div className="text-indigo-200 text-sm mb-1">继续学习</div>
                                <h2 className="text-2xl font-bold mb-2">
                                    {currentChapter.icon} {currentChapter.title}
                                </h2>
                                <p className="text-indigo-100">{currentChapter.description}</p>
                            </div>
                            <Link
                                href={`/courses/${currentChapter.id}`}
                                className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-full font-semibold hover:bg-indigo-50 transition-colors shrink-0"
                            >
                                继续学习
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    </motion.div>
                )}

                {/* All Chapters Progress */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <h2 className="text-xl font-bold text-gray-900 mb-6">章节详情</h2>
                    <div className="space-y-4">
                        {chapters.map((chapter, index) => {
                            const prog = progressData[chapter.id] || {
                                progress: 0,
                                isUnlocked: false,
                                isCompleted: false,
                            };

                            return (
                                <div
                                    key={chapter.id}
                                    className={`bg-white rounded-xl p-4 border ${prog.isCompleted
                                            ? "border-green-200"
                                            : prog.isUnlocked
                                                ? "border-indigo-200"
                                                : "border-gray-100"
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`text-2xl ${!prog.isUnlocked ? "grayscale opacity-50" : ""
                                                }`}
                                        >
                                            {chapter.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-gray-400">
                                                    第 {chapter.number} 章
                                                </span>
                                                {prog.isCompleted && (
                                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                                        已完成
                                                    </span>
                                                )}
                                                {!prog.isUnlocked && (
                                                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                                                        🔒 锁定
                                                    </span>
                                                )}
                                            </div>
                                            <div
                                                className={`font-medium ${prog.isUnlocked ? "text-gray-900" : "text-gray-400"
                                                    }`}
                                            >
                                                {chapter.title}
                                            </div>
                                        </div>
                                        <div className="w-24 text-right">
                                            <div className="text-sm font-medium text-gray-600">
                                                {prog.progress}%
                                            </div>
                                            <div className="progress-bar mt-1">
                                                <div
                                                    className="progress-fill"
                                                    style={{ width: `${prog.progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Back to Courses */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/courses"
                        className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-700"
                    >
                        查看全部课程
                        <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
