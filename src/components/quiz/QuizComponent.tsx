"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, ChevronRight, Filter, BookOpen, RotateCcw } from "lucide-react";
import { Question, getQuestionsByKnowledgePoint, getQuestionsByChapter, sampleQuestions } from "@/lib/questions";
import { KnowledgePoint, chapter1KnowledgePoints, subjects } from "@/lib/knowledgePoints";

interface QuizComponentProps {
    chapterId?: string;           // 按章节筛选
    knowledgePointId?: string;    // 按知识点筛选
    onComplete?: (score: number, total: number) => void;
}

export default function QuizComponent({
    chapterId,
    knowledgePointId,
    onComplete
}: QuizComponentProps) {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [filterKP, setFilterKP] = useState<string>(knowledgePointId || "all");
    const [showFilter, setShowFilter] = useState(false);

    // 加载题目
    useEffect(() => {
        let filtered: Question[];

        if (filterKP && filterKP !== "all") {
            filtered = getQuestionsByKnowledgePoint(filterKP);
        } else if (chapterId) {
            filtered = getQuestionsByChapter(chapterId);
        } else {
            filtered = [...sampleQuestions];
        }

        // 随机打乱
        filtered.sort(() => Math.random() - 0.5);
        setQuestions(filtered);
        resetQuiz();
    }, [chapterId, filterKP]);

    const resetQuiz = () => {
        setCurrentIndex(0);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setScore(0);
        setIsComplete(false);
    };

    const currentQuestion = questions[currentIndex];

    const handleSelect = (answer: string) => {
        if (selectedAnswer) return; // 已选择则不能更改

        setSelectedAnswer(answer);
        setShowExplanation(true);

        if (answer === currentQuestion?.answer) {
            setScore(prev => prev + 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setShowExplanation(false);
        } else {
            setIsComplete(true);
            onComplete?.(score, questions.length);
        }
    };

    const getKnowledgePoint = (kpId: string): KnowledgePoint | undefined => {
        return chapter1KnowledgePoints.find(kp => kp.id === kpId);
    };

    const getSubject = (subjectId: string) => {
        return subjects.find(s => s.id === subjectId);
    };

    if (questions.length === 0) {
        return (
            <div className="bg-white rounded-2xl p-8 text-center">
                <div className="text-4xl mb-4">📭</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">暂无题目</h3>
                <p className="text-gray-500 mb-4">当前筛选条件下没有可用的题目</p>
                {filterKP !== "all" && (
                    <button
                        onClick={() => setFilterKP("all")}
                        className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all flex items-center gap-2 mx-auto"
                    >
                        <RotateCcw size={18} />
                        返回全部题目
                    </button>
                )}
            </div>
        );
    }

    // 完成页面
    if (isComplete) {
        const percentage = Math.round((score / questions.length) * 100);
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white text-center"
            >
                <div className="text-6xl mb-4">
                    {percentage >= 80 ? "🎉" : percentage >= 60 ? "👍" : "💪"}
                </div>
                <h3 className="text-2xl font-bold mb-2">测验完成！</h3>
                <div className="text-5xl font-bold mb-4">
                    {score} / {questions.length}
                </div>
                <p className="text-lg opacity-90 mb-6">
                    正确率：{percentage}%
                    {percentage >= 80 ? " 太棒了！" : percentage >= 60 ? " 继续加油！" : " 多多练习！"}
                </p>
                <button
                    onClick={resetQuiz}
                    className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-gray-100 transition-all flex items-center gap-2 mx-auto"
                >
                    <RotateCcw size={20} />
                    再来一次
                </button>
            </motion.div>
        );
    }

    const kp = getKnowledgePoint(currentQuestion?.knowledgePointId || "");
    const subject = getSubject(currentQuestion?.subject || "");

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* 头部：进度和筛选 */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">
                            第 {currentIndex + 1} / {questions.length} 题
                        </span>
                        <span className="text-sm text-gray-400">|</span>
                        <span className="text-sm text-green-600 font-medium">
                            得分：{score}
                        </span>
                    </div>
                    <button
                        onClick={() => setShowFilter(!showFilter)}
                        className={`p-2 rounded-lg transition-all ${showFilter ? "bg-indigo-100 text-indigo-600" : "hover:bg-gray-200 text-gray-500"
                            }`}
                    >
                        <Filter size={18} />
                    </button>
                </div>

                {/* 进度条 */}
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* 筛选面板 */}
            <AnimatePresence>
                {showFilter && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-b border-gray-100 overflow-hidden"
                    >
                        <div className="p-4 bg-gray-50">
                            <div className="text-sm font-medium text-gray-700 mb-2">按知识点筛选：</div>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setFilterKP("all")}
                                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${filterKP === "all"
                                        ? "bg-indigo-500 text-white"
                                        : "bg-white border border-gray-200 text-gray-600 hover:border-indigo-300"
                                        }`}
                                >
                                    全部
                                </button>
                                {chapter1KnowledgePoints.map(kp => (
                                    <button
                                        key={kp.id}
                                        onClick={() => setFilterKP(kp.id)}
                                        className={`px-3 py-1.5 rounded-lg text-sm transition-all ${filterKP === kp.id
                                            ? "bg-indigo-500 text-white"
                                            : "bg-white border border-gray-200 text-gray-600 hover:border-indigo-300"
                                            }`}
                                    >
                                        {kp.section} {kp.title.slice(0, 8)}...
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 题目内容 */}
            <div className="p-6">
                {/* 知识点标签 */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {/* 年份和题号 */}
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        📅 {currentQuestion?.year}年第{(currentQuestion as any)?.questionNumber}题
                    </span>
                    {subject && (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${subject.color} text-white`}>
                            {subject.icon} {subject.name}
                        </span>
                    )}
                    {kp && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            <BookOpen className="inline w-3 h-3 mr-1" />
                            {kp.section} {kp.title}
                        </span>
                    )}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${currentQuestion?.difficulty === 1 ? "bg-green-100 text-green-700" :
                        currentQuestion?.difficulty === 2 ? "bg-yellow-100 text-yellow-700" :
                            "bg-red-100 text-red-700"
                        }`}>
                        {currentQuestion?.difficulty === 1 ? "简单" : currentQuestion?.difficulty === 2 ? "中等" : "困难"}
                    </span>
                </div>

                {/* 题目文字 */}
                <h3 className="text-lg font-medium text-gray-900 mb-6 leading-relaxed">
                    {currentQuestion?.content}
                </h3>

                {/* 选项 */}
                <div className="space-y-3 mb-6">
                    {currentQuestion?.options.map((option) => {
                        const isSelected = selectedAnswer === option.label;
                        const isCorrect = option.label === currentQuestion.answer;
                        const showResult = showExplanation;

                        let optionClass = "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50";
                        if (showResult) {
                            if (isCorrect) {
                                optionClass = "border-green-500 bg-green-50";
                            } else if (isSelected && !isCorrect) {
                                optionClass = "border-red-500 bg-red-50";
                            } else {
                                optionClass = "border-gray-200 opacity-50";
                            }
                        } else if (isSelected) {
                            optionClass = "border-indigo-500 bg-indigo-50";
                        }

                        return (
                            <motion.button
                                key={option.label}
                                onClick={() => handleSelect(option.label)}
                                disabled={showExplanation}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${optionClass}`}
                                whileHover={!showExplanation ? { scale: 1.01 } : {}}
                                whileTap={!showExplanation ? { scale: 0.99 } : {}}
                            >
                                <div className="flex items-start gap-3">
                                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${showResult && isCorrect ? "bg-green-500 text-white" :
                                        showResult && isSelected && !isCorrect ? "bg-red-500 text-white" :
                                            isSelected ? "bg-indigo-500 text-white" :
                                                "bg-gray-100 text-gray-600"
                                        }`}>
                                        {showResult && isCorrect ? <CheckCircle size={18} /> :
                                            showResult && isSelected && !isCorrect ? <XCircle size={18} /> :
                                                option.label}
                                    </span>
                                    <span className="text-gray-700 pt-1">{option.text}</span>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>

                {/* 解析 */}
                <AnimatePresence>
                    {showExplanation && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-6"
                        >
                            <div className={`p-4 rounded-xl ${selectedAnswer === currentQuestion?.answer
                                ? "bg-green-50 border border-green-200"
                                : "bg-red-50 border border-red-200"
                                }`}>
                                <div className="flex items-center gap-2 mb-2">
                                    {selectedAnswer === currentQuestion?.answer ? (
                                        <>
                                            <CheckCircle className="text-green-500" size={20} />
                                            <span className="font-semibold text-green-700">回答正确！</span>
                                        </>
                                    ) : (
                                        <>
                                            <XCircle className="text-red-500" size={20} />
                                            <span className="font-semibold text-red-700">
                                                回答错误，正确答案是 {currentQuestion?.answer}
                                            </span>
                                        </>
                                    )}
                                </div>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    {currentQuestion?.explanation}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 下一题按钮 */}
                {showExplanation && (
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={handleNext}
                        className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all flex items-center justify-center gap-2"
                    >
                        {currentIndex < questions.length - 1 ? (
                            <>
                                下一题
                                <ChevronRight size={20} />
                            </>
                        ) : (
                            "查看结果"
                        )}
                    </motion.button>
                )}
            </div>
        </div>
    );
}
