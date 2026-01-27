"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, Pause, RotateCcw, Info } from "lucide-react";

interface CompilationPipelineProps {
    onInteract?: () => void;
}

// 编译阶段数据
const stages = [
    {
        id: "source",
        name: "源代码",
        nameEn: "Source Code",
        file: "hello.c",
        icon: "📝",
        color: "from-blue-500 to-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        description: "程序员编写的高级语言代码",
        detail: `这是你写的 C 代码，计算机其实看不懂！
计算机只认识 0 和 1（机器码），所以需要把你的代码"翻译"成机器能理解的语言。`,
        code: `// ========== 源代码 hello.c ==========
// 这是你写的 C 语言程序

#include <stdio.h>   // 第1行：引入标准输入输出库（让我们能用 printf）

int main() {         // 第2行：程序入口，从这里开始执行
    printf("hello, world\\n");  // 第3行：在屏幕上打印文字
    return 0;        // 第4行：告诉系统程序正常结束
}`,
    },
    {
        id: "preprocessor",
        name: "预处理",
        nameEn: "Preprocessing",
        file: "hello.i",
        icon: "🔧",
        color: "from-purple-500 to-purple-600",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200",
        description: "处理 #include、#define 等预处理指令",
        detail: `预处理器做了什么？
• 把 #include 的头文件内容"复制粘贴"进来
• 把 #define 定义的宏替换成实际值
• 删除注释

就像做菜前的"备料"工作！`,
        code: `// ========== 预处理后 hello.i ==========
// stdio.h 的内容被插入这里
// （大约有几百行！）

extern int printf(const char *, ...);  
// ↑ 这是 printf 函数的声明，告诉编译器这个函数存在

int main() {         // 我们的代码保持不变
    printf("hello, world\\n");
    return 0;
}`,
    },
    {
        id: "compiler",
        name: "编译",
        nameEn: "Compilation",
        file: "hello.s",
        icon: "⚙️",
        color: "from-orange-500 to-orange-600",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
        description: "将 C 代码翻译成汇编语言",
        detail: `编译器是最核心的"翻译官"！
• 检查语法是否正确
• 把高级语言翻译成汇编语言
• 进行各种优化

汇编语言是人类可读的最后一站，再往下就是机器的世界了。`,
        code: `.section .rodata
.LC0:
    .string "hello, world\\n"

.text
.globl main
main:
    pushq   %rbp
    movq    %rsp, %rbp
    leaq    .LC0(%rip), %rdi
    call    printf
    movl    $0, %eax
    popq    %rbp
    ret`,
    },
    {
        id: "assembler",
        name: "汇编",
        nameEn: "Assembly",
        file: "hello.o",
        icon: "🔩",
        color: "from-green-500 to-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        description: "将汇编代码转换为机器码（目标文件）",
        detail: `汇编器把汇编语言变成二进制机器码！
• 每条汇编指令对应一条或多条机器指令
• 生成的 .o 文件是二进制格式
• 但此时还不能运行，因为缺少库函数的实现

就像有了零件，但还没组装成完整产品。`,
        code: `ELF 目标文件（二进制）

机器码示例：
55                    push   %rbp
48 89 e5              mov    %rsp,%rbp  
48 8d 3d 00 00 00 00  lea    0x0(%rip),%rdi
e8 00 00 00 00        call   printf
b8 00 00 00 00        mov    $0x0,%eax
5d                    pop    %rbp
c3                    ret`,
    },
    {
        id: "linker",
        name: "链接",
        nameEn: "Linking",
        file: "hello",
        icon: "🔗",
        color: "from-red-500 to-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        description: "将目标文件与库函数链接成可执行文件",
        detail: `链接器把所有零件组装起来！
• 把你的代码和 printf 函数的实现合并
• 确定所有函数和变量的最终地址
• 生成可以直接运行的程序

这就是完整的 hello 程序，双击就能运行！`,
        code: `ELF 可执行文件

$ ./hello
hello, world

现在程序可以运行了！
printf 函数的代码也被包含进来了。`,
    },
];

export default function CompilationPipeline({
    onInteract,
}: CompilationPipelineProps) {
    const [currentStage, setCurrentStage] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    const handleInteraction = () => {
        if (!hasInteracted && onInteract) {
            setHasInteracted(true);
            onInteract();
        }
    };

    const goToStage = (index: number) => {
        setCurrentStage(index);
        handleInteraction();
    };

    const nextStage = () => {
        if (currentStage < stages.length - 1) {
            setCurrentStage(currentStage + 1);
            handleInteraction();
        } else {
            setIsPlaying(false);
        }
    };

    const prevStage = () => {
        if (currentStage > 0) {
            setCurrentStage(currentStage - 1);
            handleInteraction();
        }
    };

    const reset = () => {
        setCurrentStage(0);
        setIsPlaying(false);
        handleInteraction();
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
        handleInteraction();
    };

    // 自动播放
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isPlaying) {
            timer = setInterval(() => {
                setCurrentStage((prev) => {
                    if (prev < stages.length - 1) {
                        return prev + 1;
                    } else {
                        setIsPlaying(false);
                        return prev;
                    }
                });
            }, 3000);
        }
        return () => clearInterval(timer);
    }, [isPlaying]);

    const stage = stages[currentStage];

    return (
        <div className="bg-gradient-to-br from-gray-50 to-indigo-50 rounded-2xl p-6 sm:p-8">
            {/* 标题说明 */}
            <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-3">
                    <Info size={16} />
                    程序是如何"翻译"成机器能理解的语言的？
                </div>
            </div>

            {/* 流程图 */}
            <div className="flex flex-wrap justify-center items-center gap-2 mb-8">
                {stages.map((s, index) => (
                    <div key={s.id} className="flex items-center">
                        <motion.button
                            onClick={() => goToStage(index)}
                            className={`relative px-4 py-3 rounded-xl font-medium transition-all ${index === currentStage
                                ? `bg-gradient-to-r ${s.color} text-white shadow-lg`
                                : index < currentStage
                                    ? "bg-green-100 text-green-700 border border-green-200"
                                    : "bg-white text-gray-500 border border-gray-200 hover:border-gray-300"
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-lg">{s.icon}</span>
                                <span className="hidden sm:inline text-sm">
                                    {s.name}
                                </span>
                            </div>
                            {index === currentStage && (
                                <motion.div
                                    className="absolute -bottom-1 left-1/2 w-2 h-2 bg-white rounded-full"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    layoutId="indicator"
                                />
                            )}
                        </motion.button>
                        {index < stages.length - 1 && (
                            <ArrowRight
                                className={`mx-1 flex-shrink-0 ${index < currentStage
                                    ? "text-green-500"
                                    : "text-gray-300"
                                    }`}
                                size={20}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* 当前阶段详情 */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={stage.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`${stage.bgColor} ${stage.borderColor} border-2 rounded-2xl p-6`}
                >
                    {/* 阶段标题 */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <span className="text-4xl">{stage.icon}</span>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">
                                    {stage.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {stage.nameEn}
                                </p>
                            </div>
                        </div>
                        <div className="px-3 py-1 bg-white rounded-lg text-sm font-mono text-gray-600">
                            {stage.file}
                        </div>
                    </div>

                    {/* 简要说明 */}
                    <p className="text-gray-700 mb-4">{stage.description}</p>

                    {/* 详细解释 */}
                    <div className="bg-white/80 rounded-xl p-4 mb-4">
                        <div className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
                            {stage.detail}
                        </div>
                    </div>

                    {/* 代码展示 */}
                    <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
                        <pre className="text-sm text-green-400 font-mono">
                            {stage.code}
                        </pre>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* 控制按钮 */}
            <div className="flex items-center justify-center gap-4 mt-6">
                <button
                    onClick={reset}
                    className="p-3 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
                    title="重置"
                >
                    <RotateCcw size={20} />
                </button>
                <button
                    onClick={prevStage}
                    disabled={currentStage === 0}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${currentStage === 0
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                        }`}
                >
                    上一步
                </button>
                <button
                    onClick={togglePlay}
                    className={`p-3 rounded-full ${isPlaying
                        ? "bg-red-500 text-white"
                        : "bg-indigo-500 text-white"
                        } shadow-lg transition-all hover:shadow-xl`}
                    title={isPlaying ? "暂停" : "自动播放"}
                >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button
                    onClick={nextStage}
                    disabled={currentStage === stages.length - 1}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${currentStage === stages.length - 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-indigo-500 text-white hover:bg-indigo-600"
                        }`}
                >
                    下一步
                </button>
            </div>

            {/* 进度指示 */}
            <div className="mt-4 flex justify-center gap-2">
                {stages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToStage(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === currentStage
                            ? "bg-indigo-500 scale-125"
                            : index < currentStage
                                ? "bg-green-400"
                                : "bg-gray-300"
                            }`}
                    />
                ))}
            </div>

            {/* 提示 */}
            <div className="mt-6 text-center text-sm text-gray-500">
                💡 点击各阶段按钮可以跳转，或使用自动播放功能
            </div>
        </div>
    );
}
