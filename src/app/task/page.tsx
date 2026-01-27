"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    CheckCircle2,
    Circle,
    Clock,
    Target,
    Flame,
    Calendar,
    ArrowRight,
    Plus,
    Trash2,
    BookOpen,
    Trophy,
} from "lucide-react";

interface Task {
    id: string;
    title: string;
    completed: boolean;
    createdAt: string;
    category: "study" | "exercise" | "review" | "project";
}

const categoryConfig = {
    study: { label: "学习", color: "bg-blue-500", lightColor: "bg-blue-100", textColor: "text-blue-600" },
    exercise: { label: "练习", color: "bg-green-500", lightColor: "bg-green-100", textColor: "text-green-600" },
    review: { label: "复习", color: "bg-orange-500", lightColor: "bg-orange-100", textColor: "text-orange-600" },
    project: { label: "项目", color: "bg-purple-500", lightColor: "bg-purple-100", textColor: "text-purple-600" },
};

// 从 localStorage 加载任务
const loadTasks = (): Task[] => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("csapp-tasks");
    return saved ? JSON.parse(saved) : [];
};

// 保存任务到 localStorage
const saveTasks = (tasks: Task[]) => {
    localStorage.setItem("csapp-tasks", JSON.stringify(tasks));
};

export default function TaskPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<Task["category"]>("study");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setTasks(loadTasks());
    }, []);

    useEffect(() => {
        if (mounted) {
            saveTasks(tasks);
        }
    }, [tasks, mounted]);

    const addTask = () => {
        if (!newTask.trim()) return;
        const task: Task = {
            id: Date.now().toString(),
            title: newTask.trim(),
            completed: false,
            createdAt: new Date().toISOString(),
            category: selectedCategory,
        };
        setTasks([task, ...tasks]);
        setNewTask("");
    };

    const toggleTask = (id: string) => {
        setTasks(
            tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
        );
    };

    const deleteTask = (id: string) => {
        setTasks(tasks.filter((t) => t.id !== id));
    };

    const completedCount = tasks.filter((t) => t.completed).length;
    const totalCount = tasks.length;
    const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    // 计算连续学习天数（模拟数据）
    const streakDays = 7;

    if (!mounted) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full" />
            </div>
        );
    }

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
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">学习任务</h1>
                    <p className="text-lg text-gray-600">管理您的 CSAPP 学习计划和每日任务</p>
                </motion.div>

                {/* Stats Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
                >
                    {/* Today's Progress */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                                <Target className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div className="text-sm text-gray-500">今日进度</div>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{progressPercent}%</div>
                        <div className="progress-bar mt-2">
                            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
                        </div>
                    </div>

                    {/* Completed Tasks */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="text-sm text-gray-500">已完成</div>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                            {completedCount} / {totalCount}
                        </div>
                    </div>

                    {/* Streak Days */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                                <Flame className="w-5 h-5 text-orange-600" />
                            </div>
                            <div className="text-sm text-gray-500">连续学习</div>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{streakDays} 天</div>
                    </div>

                    {/* Today's Date */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-purple-600" />
                            </div>
                            <div className="text-sm text-gray-500">今天</div>
                        </div>
                        <div className="text-lg font-bold text-gray-900">
                            {new Date().toLocaleDateString("zh-CN", {
                                month: "short",
                                day: "numeric",
                                weekday: "short",
                            })}
                        </div>
                    </div>
                </motion.div>

                {/* Add New Task */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8"
                >
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">添加新任务</h2>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && addTask()}
                                placeholder="输入任务内容..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                            />
                        </div>
                        <div className="flex gap-2">
                            {Object.entries(categoryConfig).map(([key, config]) => (
                                <button
                                    key={key}
                                    onClick={() => setSelectedCategory(key as Task["category"])}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${selectedCategory === key
                                            ? `${config.color} text-white`
                                            : `${config.lightColor} ${config.textColor}`
                                        }`}
                                >
                                    {config.label}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={addTask}
                            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                        >
                            <Plus size={18} />
                            添加
                        </button>
                    </div>
                </motion.div>

                {/* Task List */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <h2 className="text-xl font-bold text-gray-900 mb-4">任务列表</h2>

                    {tasks.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
                            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">还没有任务</h3>
                            <p className="text-gray-500">添加您的第一个学习任务开始吧！</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <AnimatePresence>
                                {tasks.map((task) => {
                                    const config = categoryConfig[task.category];
                                    return (
                                        <motion.div
                                            key={task.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className={`bg-white rounded-xl p-4 shadow-sm border transition-all ${task.completed
                                                    ? "border-green-200 bg-green-50/50"
                                                    : "border-gray-100 hover:shadow-md"
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => toggleTask(task.id)}
                                                    className="shrink-0"
                                                >
                                                    {task.completed ? (
                                                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                                                    ) : (
                                                        <Circle className="w-6 h-6 text-gray-300 hover:text-indigo-500 transition-colors" />
                                                    )}
                                                </button>
                                                <div className="flex-1 min-w-0">
                                                    <div
                                                        className={`font-medium ${task.completed
                                                                ? "text-gray-400 line-through"
                                                                : "text-gray-900"
                                                            }`}
                                                    >
                                                        {task.title}
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span
                                                            className={`text-xs px-2 py-0.5 rounded-full ${config.lightColor} ${config.textColor}`}
                                                        >
                                                            {config.label}
                                                        </span>
                                                        <span className="text-xs text-gray-400">
                                                            {new Date(task.createdAt).toLocaleDateString("zh-CN")}
                                                        </span>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => deleteTask(task.id)}
                                                    className="shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    )}
                </motion.div>

                {/* Quick Link to Progress */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/progress"
                        className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-700"
                    >
                        查看学习进度
                        <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
