"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    Lock,
    BookOpen,
} from "lucide-react";
import Link from "next/link";
import {
    getChapterById,
    getNextChapter,
    getPrevChapter,
    Chapter,
} from "@/lib/chapters";
import {
    getChapterProgress,
    updateChapterProgress,
    isChapterUnlocked,
    completeChapter,
} from "@/lib/progress";
import BinaryConverter from "@/components/visualizations/binary/BinaryConverter";
import CompilationPipeline from "@/components/visualizations/compile/CompilationPipeline";
import HardwareOverview from "@/components/visualizations/hardware/HardwareOverview";
import MemoryHierarchy from "@/components/visualizations/memory/MemoryHierarchy";
import HelloProgramFlow from "@/components/visualizations/hello/HelloProgramFlow";
import OSAbstraction from "@/components/visualizations/os/OSAbstraction";
import QuizComponent from "@/components/quiz/QuizComponent";

interface ChapterPageClientProps {
    chapterId: string;
}

export default function ChapterPageClient({ chapterId }: ChapterPageClientProps) {
    const router = useRouter();
    const [chapter, setChapter] = useState<Chapter | null>(null);
    const [progress, setProgress] = useState(0);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const chapterData = getChapterById(chapterId);
        if (chapterData) {
            setChapter(chapterData);
            const prog = getChapterProgress(chapterId);
            setProgress(prog.progress);
            setIsUnlocked(prog.isUnlocked);
            setIsCompleted(prog.isCompleted);

            // 如果章节被锁定，跳转回课程列表
            if (!prog.isUnlocked) {
                router.push("/courses");
            }
        } else {
            router.push("/courses");
        }
    }, [chapterId, router]);

    const handleCompleteChapter = () => {
        completeChapter(chapterId);
        setIsCompleted(true);
        setProgress(100);
    };

    const handleUpdateProgress = (newProgress: number) => {
        updateChapterProgress(chapterId, newProgress);
        setProgress(newProgress);
    };

    if (!mounted || !chapter || !isUnlocked) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full" />
            </div>
        );
    }

    const prevChapter = getPrevChapter(chapterId);
    const nextChapter = getNextChapter(chapterId);
    const isNextUnlocked = nextChapter
        ? isChapterUnlocked(nextChapter.id)
        : false;

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50/50 to-white">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-16 z-40">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        {/* Back Button */}
                        <Link
                            href="/courses"
                            className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors"
                        >
                            <ArrowLeft size={20} />
                            <span className="hidden sm:inline">返回课程</span>
                        </Link>

                        {/* Chapter Info */}
                        <div className="text-center">
                            <div className="text-xs text-gray-400">
                                第 {chapter.number} 章
                            </div>
                            <div className="font-semibold text-gray-900">{chapter.title}</div>
                        </div>

                        {/* Progress */}
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:block text-sm text-gray-500">
                                {progress}% 完成
                            </div>
                            <div className="w-24 progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-4 py-12">
                {/* Chapter Title Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <div className="text-6xl mb-4">{chapter.icon}</div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                        {chapter.title}
                    </h1>
                    <p className="text-lg text-gray-600">{chapter.titleEn}</p>
                    <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
                        {chapter.description}
                    </p>
                </motion.div>

                {/* Learning Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="space-y-12"
                >
                    {/* Section 1: Introduction */}
                    <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-indigo-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">
                                章节介绍
                            </h2>
                        </div>

                        <div className="space-y-6">
                            {chapter.id === "ch01" ? (
                                <>
                                    {/* 欢迎卡片 */}
                                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
                                        <div className="flex items-start gap-4">
                                            <div className="text-4xl">👋</div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                                                    欢迎来到 CSAPP 的第一章！
                                                </h3>
                                                <p className="text-gray-600 leading-relaxed">
                                                    这一章将带你开启计算机系统的探索之旅。我们将从一个简单的
                                                    <code className="mx-1 px-2 py-0.5 bg-white rounded text-indigo-600 font-mono text-sm">Hello, World</code>
                                                    程序出发，了解它是如何从源代码变成可执行程序、然后在计算机上运行的完整过程。
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 学习旅程说明 */}
                                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-100">
                                        <div className="flex items-start gap-4">
                                            <div className="text-4xl">🎯</div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-amber-900 mb-2">
                                                    学习收获
                                                </h3>
                                                <p className="text-gray-600 leading-relaxed">
                                                    通过这一章的学习，你将建立起对计算机系统的整体认识，理解硬件和软件是如何协同工作的。这将为后续深入学习各个子系统打下坚实的基础。
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 学习目标网格 */}
                                    <div className="mt-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                            <span className="text-xl">📚</span>
                                            本章学习目标
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                                <span className="text-2xl">⚙️</span>
                                                <div>
                                                    <div className="font-medium text-gray-900">编译过程</div>
                                                    <div className="text-sm text-gray-500">预处理 → 编译 → 汇编 → 链接</div>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                                <span className="text-2xl">🧠</span>
                                                <div>
                                                    <div className="font-medium text-gray-900">硬件组成</div>
                                                    <div className="text-sm text-gray-500">CPU、内存、总线、I/O 设备</div>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                                <span className="text-2xl">🖥️</span>
                                                <div>
                                                    <div className="font-medium text-gray-900">操作系统</div>
                                                    <div className="text-sm text-gray-500">进程、虚拟内存、文件系统</div>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                                <span className="text-2xl">💾</span>
                                                <div>
                                                    <div className="font-medium text-gray-900">存储层次</div>
                                                    <div className="text-sm text-gray-500">寄存器、缓存、内存、磁盘</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-6xl mb-4">🚧</div>
                                    <p className="text-gray-500">
                                        这一章的内容正在开发中，敬请期待精彩的可视化学习体验！
                                    </p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Section 2: Interactive Visualization */}
                    {chapter.id === "ch01" && (
                        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                                    <span className="text-xl">🔢</span>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900">
                                    1.1 信息就是位 + 上下文
                                </h2>
                            </div>

                            <p className="text-gray-600 mb-6">
                                计算机里的一切信息都是用二进制（0和1）表示的。
                                同一串二进制数字，根据&quot;上下文&quot;不同，可以表示数字、字符、指令等不同含义。
                            </p>

                            <BinaryConverter
                                onInteract={() => {
                                    if (progress < 15) {
                                        handleUpdateProgress(15);
                                    }
                                }}
                            />
                        </section>
                    )}

                    {/* Section 3: Compilation Pipeline */}
                    {chapter.id === "ch01" && (
                        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                                    <span className="text-xl">⚙️</span>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900">
                                    1.2 程序被翻译成不同的格式
                                </h2>
                            </div>

                            <p className="text-gray-600 mb-6">
                                你写的 C 代码需要经过多个步骤才能变成计算机可以执行的程序。
                                这个过程叫做&quot;编译&quot;，包括预处理、编译、汇编和链接四个阶段。
                            </p>

                            <CompilationPipeline
                                onInteract={() => {
                                    if (progress < 30) {
                                        handleUpdateProgress(30);
                                    }
                                }}
                            />
                        </section>
                    )}

                    {/* Section 4: Hardware Overview */}
                    {chapter.id === "ch01" && (
                        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                                    <span className="text-xl">🧠</span>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900">
                                    1.4 处理器读并解释指令
                                </h2>
                            </div>

                            <p className="text-gray-600 mb-6">
                                计算机硬件由 CPU、内存、总线和 I/O 设备组成。
                                它们协同工作，让你的程序能够运行起来。
                            </p>

                            <HardwareOverview
                                onInteract={() => {
                                    if (progress < 45) {
                                        handleUpdateProgress(45);
                                    }
                                }}
                            />
                        </section>
                    )}

                    {/* Section 5: Hello Program Flow */}
                    {chapter.id === "ch01" && (
                        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                    <span className="text-xl">👋</span>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900">
                                    1.4.2 运行 hello 程序
                                </h2>
                            </div>

                            <p className="text-gray-600 mb-6">
                                当你在终端输入 ./hello 并回车，程序是如何一步步运行并在屏幕上显示 &quot;hello, world&quot; 的？
                            </p>

                            <HelloProgramFlow
                                onInteract={() => {
                                    if (progress < 60) {
                                        handleUpdateProgress(60);
                                    }
                                }}
                            />
                        </section>
                    )}

                    {/* Section 6: Memory Hierarchy */}
                    {chapter.id === "ch01" && (
                        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                                    <span className="text-xl">💾</span>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900">
                                    1.5-1.6 高速缓存与存储层次
                                </h2>
                            </div>

                            <p className="text-gray-600 mb-6">
                                计算机的存储器按速度和容量分为多个层次。
                                越快的存储器越贵、容量越小；越慢的越便宜、容量越大。
                            </p>

                            <MemoryHierarchy
                                onInteract={() => {
                                    if (progress < 75) {
                                        handleUpdateProgress(75);
                                    }
                                }}
                            />
                        </section>
                    )}

                    {/* Section 7: OS Abstraction */}
                    {chapter.id === "ch01" && (
                        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                                    <span className="text-xl">🖥️</span>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900">
                                    1.7 操作系统管理硬件
                                </h2>
                            </div>

                            <p className="text-gray-600 mb-6">
                                操作系统是硬件和应用程序之间的&quot;中间层&quot;。
                                它用进程、虚拟内存、文件等抽象概念，让程序员不用直接和复杂的硬件打交道。
                            </p>

                            <OSAbstraction
                                onInteract={() => {
                                    if (progress < 90) {
                                        handleUpdateProgress(90);
                                    }
                                }}
                            />
                        </section>
                    )}

                    {/* Section 8: Quiz */}
                    {chapter.id === "ch01" && (
                        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                                    <span className="text-xl">📝</span>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900">
                                    408 真题练习
                                </h2>
                            </div>

                            <p className="text-gray-600 mb-6">
                                通过408考研真题巩固本章知识点。题目已按知识点分类，可以筛选练习。
                            </p>

                            <QuizComponent
                                chapterId="ch01"
                                onComplete={(score, total) => {
                                    if (progress < 100 && score === total) {
                                        handleUpdateProgress(100);
                                    }
                                }}
                            />
                        </section>
                    )}

                    {/* Complete Chapter Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-center"
                    >
                        {isCompleted ? (
                            <div className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-green-100 text-green-700 font-semibold">
                                <CheckCircle size={20} />
                                章节已完成！
                            </div>
                        ) : (
                            <button
                                onClick={handleCompleteChapter}
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-bg text-white font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all transform hover:scale-105"
                            >
                                <CheckCircle size={20} />
                                完成本章学习
                            </button>
                        )}
                    </motion.div>
                </motion.div>

                {/* Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-16 flex items-center justify-between"
                >
                    {prevChapter ? (
                        <Link
                            href={`/courses/${prevChapter.id}`}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600 transition-all"
                        >
                            <ArrowLeft size={18} />
                            <div className="text-left">
                                <div className="text-xs text-gray-400">上一章</div>
                                <div className="font-medium">{prevChapter.title}</div>
                            </div>
                        </Link>
                    ) : (
                        <div />
                    )}

                    {nextChapter && (
                        <Link
                            href={isNextUnlocked ? `/courses/${nextChapter.id}` : "#"}
                            onClick={(e) => !isNextUnlocked && e.preventDefault()}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${isNextUnlocked
                                ? "border border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                                : "border border-gray-200 text-gray-400 cursor-not-allowed"
                                }`}
                        >
                            <div className="text-right">
                                <div className="text-xs text-gray-400">下一章</div>
                                <div className="font-medium flex items-center gap-1">
                                    {nextChapter.title}
                                    {!isNextUnlocked && <Lock size={14} />}
                                </div>
                            </div>
                            <ArrowRight size={18} />
                        </Link>
                    )}
                </motion.div>
            </main>
        </div>
    );
}
