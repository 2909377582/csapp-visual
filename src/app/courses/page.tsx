"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Trophy, Target } from "lucide-react";
import { chapters, chaptersByPart, ChapterProgress } from "@/lib/chapters";
import {
    getAllProgress,
    getOverallProgress,
    getCompletedChaptersCount,
} from "@/lib/progress";
import ChapterCard from "@/components/course/ChapterCard";

export default function CoursesPage() {
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

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50/50 to-white">
            {/* Header Section */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                            课程列表
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            CSAPP 全部 12 章，分为 3 大部分，从基础到进阶，系统学习计算机系统
                        </p>
                    </motion.div>

                    {/* Progress Overview */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
                    >
                        {/* Overall Progress Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center">
                                    <Target className="w-7 h-7 text-indigo-600" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">总体进度</div>
                                    <div className="text-2xl font-bold text-gray-900">
                                        {overallProgress}%
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${overallProgress}%` }}
                                />
                            </div>
                        </div>

                        {/* Completed Chapters Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">
                                    <Trophy className="w-7 h-7 text-green-600" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">已完成章节</div>
                                    <div className="text-2xl font-bold text-gray-900">
                                        {completedCount} / {chapters.length}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Total Chapters Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center">
                                    <BookOpen className="w-7 h-7 text-purple-600" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">可学习章节</div>
                                    <div className="text-2xl font-bold text-gray-900">
                                        {
                                            Object.values(progressData).filter((p) => p.isUnlocked)
                                                .length
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Chapters by Part */}
            <section className="pb-24 px-4">
                <div className="max-w-7xl mx-auto space-y-16">
                    {Object.entries(chaptersByPart).map(([partNum, partData]) => (
                        <motion.div
                            key={partNum}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Part Header */}
                            <div className="mb-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-3">
                                    Part {partNum}
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {partData.title}
                                </h2>
                                <p className="text-gray-500 mt-1">{partData.titleEn}</p>
                            </div>

                            {/* Chapters Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {partData.chapters.map((chapter, index) => (
                                    <ChapterCard
                                        key={chapter.id}
                                        chapter={chapter}
                                        progress={
                                            progressData[chapter.id] || {
                                                chapterId: chapter.id,
                                                progress: 0,
                                                isUnlocked: false,
                                                isCompleted: false,
                                            }
                                        }
                                        index={index}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
