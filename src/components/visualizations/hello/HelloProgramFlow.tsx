"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, ChevronRight } from "lucide-react";

// 解析 Markdown 加粗语法 **text** 为 <strong> 标签
function parseMarkdownBold(text: string): React.ReactNode[] {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={index} className="font-semibold">{part.slice(2, -2)}</strong>;
        }
        return part;
    });
}

interface HelloProgramFlowProps {
    onInteract?: () => void;
}

// 执行步骤数据
const steps = [
    {
        id: "shell",
        title: "Shell 读取命令",
        icon: "💻",
        color: "from-gray-600 to-gray-700",
        description: "你在终端输入 ./hello 并按下回车",
        detail: `当你输入命令时，发生了什么？

1. Shell（命令行解释器）等待你的输入
2. 每按一个键，键盘控制器产生中断
3. Shell 读取你输入的字符："./hello"
4. 按下回车，Shell 知道你想执行这个程序

Shell 就像一个"翻译官"，把你的命令翻译成系统能理解的操作。`,
        visual: {
            keyboard: true,
            shell: "$ ./hello_",
        },
    },
    {
        id: "load",
        title: "加载程序到内存",
        icon: "📦",
        color: "from-blue-500 to-blue-600",
        description: "操作系统把 hello 程序从磁盘加载到内存",
        detail: `程序是怎么进入内存的？

1. Shell 调用系统调用（fork + exec）
2. 操作系统在磁盘上找到 hello 文件
3. 通过 DMA 把程序代码和数据复制到内存
4. 设置好程序的运行环境

这个过程叫做"程序加载"，是操作系统的职责。`,
        visual: {
            diskToMemory: true,
        },
    },
    {
        id: "execute",
        title: "CPU 执行指令",
        icon: "⚙️",
        color: "from-orange-500 to-orange-600",
        description: "CPU 从内存读取指令并执行",
        detail: `CPU 如何执行程序？

1. **取指令(Fetch)**: 从内存读取下一条指令
2. **解码(Decode)**: 理解这条指令要做什么
3. **执行(Execute)**: 完成指令的操作
4. **写回(Write-back)**: 保存结果

这个循环叫做"取指-执行周期"，CPU 每秒执行数十亿次！`,
        visual: {
            cpuCycle: true,
        },
    },
    {
        id: "printf",
        title: "调用 printf 函数",
        icon: "📝",
        color: "from-green-500 to-green-600",
        description: 'printf 函数把 "hello, world\\n" 准备好',
        detail: `printf 做了什么？

1. printf 是 C 标准库函数
2. 解析格式字符串 "hello, world\\n"
3. 把字符串放入输出缓冲区
4. 调用系统调用 write() 请求输出

printf 实际上是对系统调用的封装，让程序员更方便地输出信息。`,
        visual: {
            buffer: "hello, world\\n",
        },
    },
    {
        id: "output",
        title: "显示到屏幕",
        icon: "🖥️",
        color: "from-purple-500 to-purple-600",
        description: "字符通过显卡最终显示在屏幕上",
        detail: `字符如何显示出来？

1. 系统调用把字符串发送给显示驱动
2. 显示驱动把字符转换为像素图案
3. 显卡把像素数据写入显存
4. 显示器从显存读取数据并显示

从代码到屏幕上的字符，经过了好几个层次的转换！`,
        visual: {
            screen: "hello, world",
        },
    },
    {
        id: "exit",
        title: "程序结束",
        icon: "✅",
        color: "from-teal-500 to-teal-600",
        description: "main 函数返回 0，程序正常结束",
        detail: `程序如何优雅地结束？

1. main() 返回 0，表示成功执行
2. C 运行时库调用 exit() 系统调用
3. 操作系统回收程序占用的资源
4. Shell 重新获得控制权，等待下一个命令

返回值 0 表示成功，其他值通常表示出错。`,
        visual: {
            returnValue: 0,
        },
    },
];

export default function HelloProgramFlow({
    onInteract,
}: HelloProgramFlowProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    const handleInteraction = () => {
        if (!hasInteracted && onInteract) {
            setHasInteracted(true);
            onInteract();
        }
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isPlaying) {
            timer = setInterval(() => {
                setCurrentStep((prev) => {
                    if (prev < steps.length - 1) {
                        return prev + 1;
                    } else {
                        setIsPlaying(false);
                        return prev;
                    }
                });
            }, 4000);
        }
        return () => clearInterval(timer);
    }, [isPlaying]);

    const goToStep = (index: number) => {
        setCurrentStep(index);
        handleInteraction();
    };

    const reset = () => {
        setCurrentStep(0);
        setIsPlaying(false);
        handleInteraction();
    };

    const step = steps[currentStep];

    return (
        <div className="bg-gradient-to-br from-slate-50 to-indigo-50 rounded-2xl p-6 sm:p-8">
            {/* 标题 */}
            <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    运行 hello 程序
                </h3>
                <p className="text-sm text-gray-600">
                    从输入命令到看到输出，经历了哪些步骤？
                </p>
            </div>

            {/* 步骤指示器 */}
            <div className="flex items-center justify-center mb-8 overflow-x-auto pb-2">
                {steps.map((s, index) => (
                    <div key={s.id} className="flex items-center">
                        <motion.button
                            onClick={() => goToStep(index)}
                            className={`relative w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${index === currentStep
                                ? `bg-gradient-to-r ${s.color} text-white shadow-lg`
                                : index < currentStep
                                    ? "bg-green-100 text-green-600"
                                    : "bg-gray-100 text-gray-400"
                                }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {s.icon}
                        </motion.button>
                        {index < steps.length - 1 && (
                            <ChevronRight
                                className={`mx-1 flex-shrink-0 ${index < currentStep
                                    ? "text-green-500"
                                    : "text-gray-300"
                                    }`}
                                size={20}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* 当前步骤详情 */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className={`bg-gradient-to-br ${step.color} rounded-xl p-6 text-white mb-6`}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-4xl">{step.icon}</span>
                        <div>
                            <div className="text-sm opacity-80">
                                步骤 {currentStep + 1} / {steps.length}
                            </div>
                            <h4 className="text-xl font-bold">{step.title}</h4>
                        </div>
                    </div>

                    <p className="text-lg mb-4">{step.description}</p>

                    {/* 可视化区域 */}
                    <div className="bg-black/30 rounded-lg p-4 mb-4 font-mono text-sm">
                        {step.visual.shell && (
                            <div className="text-green-400">{step.visual.shell}</div>
                        )}
                        {step.visual.diskToMemory && (
                            <div className="flex items-center gap-4 justify-center py-2">
                                <span>📀 磁盘</span>
                                <motion.span
                                    animate={{ x: [0, 20, 0] }}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                >
                                    →→→
                                </motion.span>
                                <span>💾 内存</span>
                            </div>
                        )}
                        {step.visual.cpuCycle && (
                            <div className="flex flex-wrap justify-center gap-2 py-2">
                                {["取指", "解码", "执行", "写回"].map((phase, i) => (
                                    <motion.span
                                        key={phase}
                                        className="px-3 py-1 bg-white/20 rounded"
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 2,
                                            delay: i * 0.5,
                                        }}
                                    >
                                        {phase}
                                    </motion.span>
                                ))}
                            </div>
                        )}
                        {step.visual.buffer && (
                            <div className="text-center py-2">
                                缓冲区: &quot;{step.visual.buffer}&quot;
                            </div>
                        )}
                        {step.visual.screen && (
                            <div className="text-center py-2">
                                <div className="inline-block bg-black px-6 py-3 rounded border-2 border-gray-600">
                                    {step.visual.screen}
                                </div>
                            </div>
                        )}
                        {step.visual.returnValue !== undefined && (
                            <div className="text-center py-2 text-green-400">
                                return 0; ✓ 程序成功结束
                            </div>
                        )}
                    </div>

                    {/* 详细说明 */}
                    <div className="bg-white/20 rounded-lg p-4">
                        <div className="text-sm leading-relaxed space-y-1">
                            {step.detail.split('\n').map((line, i) => (
                                <p key={i}>{parseMarkdownBold(line)}</p>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* 控制按钮 */}
            <div className="flex items-center justify-center gap-4">
                <button
                    onClick={reset}
                    className="p-3 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
                >
                    <RotateCcw size={20} />
                </button>
                <button
                    onClick={() => {
                        setIsPlaying(!isPlaying);
                        handleInteraction();
                    }}
                    className={`p-4 rounded-full ${isPlaying
                        ? "bg-red-500 text-white"
                        : "bg-indigo-500 text-white"
                        } shadow-lg transition-all hover:shadow-xl`}
                >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
            </div>

            {/* 提示 */}
            <div className="mt-6 text-center text-sm text-gray-500">
                💡 点击步骤图标或使用播放按钮浏览完整流程
            </div>
        </div>
    );
}
