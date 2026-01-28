"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  BookOpen,
  Brain,
  Zap,
  Lock,
  Trophy,
  ArrowRight,
  Play,
} from "lucide-react";
import { chapters } from "@/lib/chapters";

// 动画变体
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

// 特性卡片数据
const features = [
  {
    icon: Sparkles,
    title: "交互式可视化",
    description: "动态演示复杂概念，让抽象变得具体可见",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: Brain,
    title: "深度理解",
    description: "不只是学知识，而是真正理解计算机系统的工作原理",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Zap,
    title: "动手实验",
    description: "亲自操作模拟器，体验计算机底层运行过程",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: Lock,
    title: "循序渐进",
    description: "章节解锁系统确保你掌握前置知识后再进入下一阶段",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Trophy,
    title: "游戏化学习",
    description: "成就系统和进度追踪，让学习充满成就感",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: BookOpen,
    title: "完整课程",
    description: "覆盖CSAPP全部12章，3大主题，系统学习计算机体系",
    color: "from-violet-500 to-purple-500",
  },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: "2s" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-8">
              <Sparkles size={16} />
              <span>为零基础学习者打造</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              深入理解
              <br />
              <span className="gradient-text">计算机系统</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              通过交互式可视化和动手实验，让 CSAPP 的每一个概念都变得生动有趣。
              <br className="hidden sm:block" />
              不只是学习，而是真正理解计算机的工作原理。
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/courses"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-bg text-white font-semibold text-lg shadow-xl shadow-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/40 transition-all duration-300 transform hover:scale-105"
              >
                开始学习之旅
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-gray-300 text-gray-700 font-semibold text-lg hover:border-indigo-500 hover:text-indigo-600 transition-all duration-300">
                <Play size={20} />
                观看演示
              </button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">12</div>
                <div className="text-sm text-gray-500">完整章节</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">50+</div>
                <div className="text-sm text-gray-500">交互演示</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">∞</div>
                <div className="text-sm text-gray-500">学习可能</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              为什么选择我们？
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              我们重新定义了学习计算机系统的方式，让复杂概念变得触手可及
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="group relative p-8 rounded-2xl bg-white border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Course Preview Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              课程预览
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              CSAPP 共分为3大部分，12个精心设计的交互式章节
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {chapters.slice(0, 8).map((chapter, index) => (
              <motion.div
                key={chapter.id}
                className="group relative p-6 rounded-xl bg-white border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.03 }}
              >
                <div
                  className="text-4xl mb-3"
                  style={{ filter: index > 0 ? "grayscale(1)" : "none" }}
                >
                  {chapter.icon}
                </div>
                <div className="text-xs text-gray-400 mb-1">
                  第 {chapter.number} 章
                </div>
                <div className="font-medium text-gray-900 text-sm line-clamp-2">
                  {chapter.title}
                </div>
                {index > 0 && (
                  <div className="absolute top-3 right-3">
                    <Lock size={14} className="text-gray-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
            >
              查看全部 12 章
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              准备好开始你的学习之旅了吗？
            </h2>
            <p className="text-lg text-indigo-100 mb-10">
              加入我们，用全新的方式探索计算机系统的奥秘
            </p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-white text-indigo-600 font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              立即开始
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
