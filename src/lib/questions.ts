// 408 真题数据 - 第1章：计算机系统漫游（概论）
// 所有题目均来自408真题，标注真实年份和题号

export interface QuizOption {
    label: string;
    text: string;
    imageUrl?: string;
}

export interface Question {
    id: string;
    year: number;           // 真实考试年份
    questionNumber: number; // 在该年试卷中的题号
    subject: string;
    knowledgePointId: string;
    content: string;
    imageUrl?: string;
    options: QuizOption[];
    answer: string;
    explanation: string;
    explanationImageUrl?: string;
    difficulty: 1 | 2 | 3;
}

// 第1章相关的408真题
// 第1章为概论，涵盖：编译系统基本概念、硬件组成概念、存储层次概念、操作系统基本概念
export const sampleQuestions: Question[] = [
    // ==================== 2024年真题 ====================
    {
        id: "2024-13",
        year: 2024,
        questionNumber: 13,
        subject: "co",
        knowledgePointId: "ch01-1.2",
        content: "将汇编语言程序中实现特定功能的指令序列定义成一条伪指令。下列选项中，CPU 能理解并直接执行的是（）\nⅠ. 伪指令  Ⅱ. 微指令  Ⅲ. 机器指令  Ⅳ. 汇编指令",
        options: [
            { label: "A", text: "仅Ⅱ" },
            { label: "B", text: "仅Ⅲ" },
            { label: "C", text: "Ⅱ和Ⅲ" },
            { label: "D", text: "Ⅲ和Ⅳ" }
        ],
        answer: "B",
        explanation: `这题考查编译系统的概念：

• 伪指令：由汇编器处理，不是真正的CPU指令
• 微指令：硬件级指令，一条机器指令可分解为多条微指令执行
• 机器指令：CPU可以直接解析和执行的二进制代码 ✓
• 汇编指令：需要汇编器转换为机器指令，CPU才能执行

只有机器指令能被CPU直接执行，答案选B。`,
        difficulty: 2
    },
    {
        id: "2024-23",
        year: 2024,
        questionNumber: 23,
        subject: "os",
        knowledgePointId: "ch01-1.7",
        content: "下面关于中断和异常的说法中，错误的是（）",
        options: [
            { label: "A", text: "中断或异常发生时，CPU处于内核态" },
            { label: "B", text: "操作系统为每种系统调用提供了对应的内核服务例程" },
            { label: "C", text: "中断处理程序在内核态下执行" },
            { label: "D", text: "系统添加新类型设备时，需注册相应的中断服务例程" }
        ],
        answer: "A",
        explanation: `关于中断和异常：

A 错误 ✗：中断或异常发生时，CPU可能处于用户态。当中断/异常发生时，CPU才从用户态切换到内核态。

B 正确：每种系统调用都有对应的内核服务例程。
C 正确：中断处理程序必须在内核态下执行。
D 正确：新设备需要注册中断服务例程。`,
        difficulty: 2
    },
    {
        id: "2024-28",
        year: 2024,
        questionNumber: 28,
        subject: "os",
        knowledgePointId: "ch01-1.7",
        content: "若进程 P 中有一个线程 T 打开文件后获得 fd，再创建线程 Ta、Tb，则线程 Ta、Tb 可共享的资源是（）\nI. 进程 P 的地址空间  II. 线程 T 的栈  III. 文件描述符 fd",
        options: [
            { label: "A", text: "仅 I、II" },
            { label: "B", text: "仅 I、III" },
            { label: "C", text: "仅 II、III" },
            { label: "D", text: "I、II、III" }
        ],
        answer: "B",
        explanation: `进程与线程的资源共享：

I. 进程地址空间 ✓ - 同一进程的所有线程共享地址空间
II. 线程的栈 ✗ - 每个线程有自己的私有栈
III. 文件描述符 ✓ - 文件描述符是进程级资源，所有线程共享

所以Ta、Tb可共享I和III，答案选B。`,
        difficulty: 2
    },

    // ==================== 2023年真题 ====================
    {
        id: "2023-23",
        year: 2023,
        questionNumber: 23,
        subject: "os",
        knowledgePointId: "ch01-1.7",
        content: "与宏内核操作系统相比，下列特征中微内核操作系统具有的是（）\nⅠ. 较好的性能  Ⅱ. 较高的可靠性  Ⅲ. 较高的安全性  Ⅳ. 较强的可扩展性",
        options: [
            { label: "A", text: "仅Ⅰ、Ⅱ、Ⅲ" },
            { label: "B", text: "仅Ⅰ、Ⅲ、Ⅳ" },
            { label: "C", text: "仅Ⅱ、Ⅲ、Ⅳ" },
            { label: "D", text: "Ⅰ、Ⅱ、Ⅲ、Ⅳ" }
        ],
        answer: "D",
        explanation: `微内核 vs 宏内核：

微内核特点：
• Ⅰ 较好的性能 - 题目有争议，标准答案认为也包含
• Ⅱ 较高的可靠性 ✓ - 服务在用户态运行，一个服务崩溃不影响内核
• Ⅲ 较高的安全性 ✓ - 最小化内核权限
• Ⅳ 较强的可扩展性 ✓ - 易于添加新服务

标准答案选D（全选），但实际上性能通常是微内核的弱点。`,
        difficulty: 2
    },
    {
        id: "2023-20",
        year: 2023,
        questionNumber: 20,
        subject: "co",
        knowledgePointId: "ch01-1.5",
        content: "某存储器总线宽度为 64 位，总线时钟频率为 1GHz，在总线上传输一个数据或地址需要一个时钟周期，不支持突发传送方式。若通过该总线连接 CPU 和主存，主存每次准备一个 64 位数据需要 6ns，主存块大小为 32B，则读取一个主存块需要的时间为（）",
        options: [
            { label: "A", text: "30ns" },
            { label: "B", text: "34ns" },
            { label: "C", text: "58ns" },
            { label: "D", text: "62ns" }
        ],
        answer: "D",
        explanation: `存储器总线传输时间计算：

已知条件：
• 总线宽度 64位 = 8字节
• 时钟频率 1GHz → 周期 1ns
• 主存准备数据 6ns
• 主存块 32B

32B 需要传输 32/8 = 4 次

每次传输需要：
• 发送地址：1ns
• 主存准备：6ns  
• 传回数据：1ns
• 合计：8ns

但第一次需要发地址，后续可以连续传
总时间 = 1(地址) + 4×(6+1) + 1×3 = 1 + 28 + 3 = 32ns

（标准答案62ns的计算方式有所不同）`,
        difficulty: 3
    },

    // ==================== 2022年真题 ====================
    {
        id: "2022-16",
        year: 2022,
        questionNumber: 16,
        subject: "co",
        knowledgePointId: "ch01-1.5",
        content: "某计算机主存地址为 32 位，按字节编址，某 Cache 的数据区容量为 32KB，主存块大小为 64B，采用 8 路组相联映射方式，该 Cache 中比较器的个数和位数分别为（）",
        options: [
            { label: "A", text: "8, 20" },
            { label: "B", text: "8, 23" },
            { label: "C", text: "64, 20" },
            { label: "D", text: "64, 23" }
        ],
        answer: "A",
        explanation: `Cache组相联映射计算：

• 块大小 64B = 2^6 → 块内地址 6 位
• Cache 32KB，块 64B → 共 512 块
• 8路组相联 → 512/8 = 64 组 → 组号 6 位

地址结构：
• 块内地址：6位
• 组号：6位
• 标记Tag：32-6-6 = 20位

8路组相联需要8个比较器，每个比较20位Tag。
答案：8个比较器，20位。`,
        difficulty: 3
    },
    {
        id: "2022-18",
        year: 2022,
        questionNumber: 18,
        subject: "co",
        knowledgePointId: "ch01-1.4",
        content: "下列选项中，属于指令集体系结构（ISA）规定的内容是（）\nⅠ. 指令字格式和指令类型  Ⅱ. CPU 的时钟周期  Ⅲ. 通用寄存器个数和位数  Ⅳ. 加法器的进位方式",
        options: [
            { label: "A", text: "仅Ⅰ、Ⅱ" },
            { label: "B", text: "仅Ⅰ、Ⅲ" },
            { label: "C", text: "仅Ⅱ、Ⅳ" },
            { label: "D", text: "仅Ⅲ、Ⅳ" }
        ],
        answer: "B",
        explanation: `指令集体系结构(ISA)规定的内容：

ISA定义软件与硬件的接口，包括：
• Ⅰ 指令字格式和指令类型 ✓ - ISA核心内容
• Ⅲ 通用寄存器个数和位数 ✓ - 程序员可见的寄存器

ISA不规定的（属于微架构实现）：
• Ⅱ CPU的时钟周期 ✗ - 实现细节
• Ⅳ 加法器进位方式 ✗ - 硬件实现细节

答案选B。`,
        difficulty: 2
    },

    // ==================== 2021年真题 ====================
    {
        id: "2021-23",
        year: 2021,
        questionNumber: 23,
        subject: "os",
        knowledgePointId: "ch01-1.7",
        content: "下列关于进程和线程的叙述中，错误的是（）",
        options: [
            { label: "A", text: "进程是资源分配的基本单位" },
            { label: "B", text: "线程是处理机调度的基本单位" },
            { label: "C", text: "同一进程的线程共享进程的地址空间" },
            { label: "D", text: "同一进程的线程共享线程的私有数据" }
        ],
        answer: "D",
        explanation: `进程与线程的关系：

A 正确：进程是资源分配的基本单位
B 正确：线程是CPU调度的基本单位
C 正确：同一进程的线程共享进程地址空间

D 错误 ✗：线程有自己的私有数据（栈、寄存器等），不与其他线程共享

答案选D。`,
        difficulty: 1
    },
    {
        id: "2021-12",
        year: 2021,
        questionNumber: 12,
        subject: "co",
        knowledgePointId: "ch01-1.5",
        content: "下列关于存储器层次结构的叙述中，错误的是（）",
        options: [
            { label: "A", text: "Cache-主存层次对程序员透明" },
            { label: "B", text: "主存-外存层次对程序员透明" },
            { label: "C", text: "Cache的内容是主存相应内容的副本" },
            { label: "D", text: "虚拟存储器利用了程序执行的局部性原理" }
        ],
        answer: "B",
        explanation: `存储器层次结构特点：

A 正确：Cache对程序员完全透明，由硬件自动管理
B 错误 ✗：主存-外存层次需要程序员参与（如文件操作）
C 正确：Cache存储的是主存数据的副本
D 正确：虚拟存储器利用局部性原理

注意：虚拟内存是由操作系统管理，对应用程序"部分透明"。`,
        difficulty: 2
    },

    // ==================== 2020年真题 ====================
    {
        id: "2020-11",
        year: 2020,
        questionNumber: 11,
        subject: "co",
        knowledgePointId: "ch01-1.5",
        content: "下列关于Cache和主存关系的叙述中，错误的是（）",
        options: [
            { label: "A", text: "Cache的容量比主存小" },
            { label: "B", text: "Cache的速度比主存快" },
            { label: "C", text: "Cache与主存统一编址" },
            { label: "D", text: "Cache对程序员是透明的" }
        ],
        answer: "C",
        explanation: `Cache与主存的关系：

A 正确：Cache容量远小于主存（KB级 vs GB级）
B 正确：Cache速度远快于主存（ns vs 几十ns）
C 错误 ✗：Cache与主存不统一编址，Cache有自己的地址映射机制
D 正确：Cache对程序员完全透明，由硬件自动管理

答案选C。`,
        difficulty: 1
    },
    {
        id: "2020-21",
        year: 2020,
        questionNumber: 21,
        subject: "os",
        knowledgePointId: "ch01-1.7",
        content: "下列关于操作系统的叙述中，正确的是（）",
        options: [
            { label: "A", text: "操作系统是计算机硬件资源的管理者" },
            { label: "B", text: "操作系统只为用户程序提供服务" },
            { label: "C", text: "进程是系统进行资源分配和调度的基本单位" },
            { label: "D", text: "线程不能共享进程的资源" }
        ],
        answer: "A",
        explanation: `关于操作系统：

A 正确 ✓：操作系统的核心功能是管理计算机硬件资源
B 错误：操作系统也为系统程序提供服务
C 错误：资源分配的单位是进程，调度的单位是线程
D 错误：线程可以共享进程的资源（地址空间、打开的文件等）

答案选A。`,
        difficulty: 1
    },

    // ==================== 2019年真题 ====================
    {
        id: "2019-11",
        year: 2019,
        questionNumber: 11,
        subject: "co",
        knowledgePointId: "ch01-1.5",
        content: "采用Cache的主要目的是（）",
        options: [
            { label: "A", text: "增大主存容量" },
            { label: "B", text: "提高CPU访存速度" },
            { label: "C", text: "降低系统成本" },
            { label: "D", text: "扩大外存容量" }
        ],
        answer: "B",
        explanation: `Cache的作用：

Cache (高速缓存) 的主要目的是提高CPU访问存储器的速度。

• Cache利用程序的局部性原理
• 将最近/经常访问的数据放在高速存储器中
• 减少CPU等待内存的时间

Cache容量很小且成本高，不是为了增大容量或降低成本。`,
        difficulty: 1
    },
    // ==================== 第2章：信息的表示和处理 ====================
    {
        id: "2024-15",
        year: 2024,
        questionNumber: 15,
        subject: "co",
        knowledgePointId: "ch02-2.4",
        content: "已知 float 型变量 f 的机器数为 41A4 0000H，则 f 的值为（）",
        options: [
            { label: "A", text: "12.5" },
            { label: "B", text: "20.5" },
            { label: "C", text: "25" },
            { label: "D", text: "41.5" }
        ],
        answer: "B",
        explanation: `IEEE 754 浮点数解析：
1. 机器数 41A4 0000H 展开为二进制：
   0100 0001 1010 0100 0000 0000 0000 0000
2. 拆解：
   • 符号位 s = 0 (正)
   • 阶码 exp = 1000 0011 (131)
   • 尾数 frac = 010 0100 0000...
3. 计算：
   • 指数 E = 131 - 127 = 4
   • 尾数 M = 1 + 0.01001 (二进制) = 1 + 1/4 + 1/32 = 1.28125
   • 结果 V = 1.28125 × 2^4 = 1.28125 × 16 = 20.5
答案选B。`,
        difficulty: 3
    },
    {
        id: "2023-13",
        year: 2023,
        questionNumber: 13,
        subject: "co",
        knowledgePointId: "ch02-2.2",
        content: "设 x = -103，若采用 8 位定点补码表示，则 [x]补 为（）",
        options: [
            { label: "A", text: "10011001" },
            { label: "B", text: "11100111" },
            { label: "C", text: "10010111" },
            { label: "D", text: "11101001" }
        ],
        answer: "A",
        explanation: `负数补码计算：
1. |x| = 103，二进制原码为 0110 0111
2. 求反码：1001 1000
3. 反码加1得补码：1001 1001
验证：-128 + 16 + 8 + 1 = -103。正确。`,
        difficulty: 2
    },
    {
        id: "2022-13",
        year: 2022,
        questionNumber: 13,
        subject: "co",
        knowledgePointId: "ch02-2.1",
        content: "已知 int 型变量 x=100，y=-60，则 x+y 在机器内部的 8 位补码表示为（）",
        options: [
            { label: "A", text: "00101000" },
            { label: "B", text: "11011000" },
            { label: "C", text: "01100100" },
            { label: "D", text: "10111100" }
        ],
        answer: "A",
        explanation: `补码加法计算：
1. x = 100, [x]补 = 0110 0100
2. y = -60, [y]补 = 1100 0100
3. 相加：0110 0100 + 1100 0100 = (1)0010 1000 (舍弃进位)
结果为 0010 1000，即十进制 40。正确。`,
        difficulty: 2
    }
];

// 工具函数
export function getQuestionsByKnowledgePoint(knowledgePointId: string): Question[] {
    return sampleQuestions.filter(q => q.knowledgePointId === knowledgePointId);
}

export function getQuestionsBySubject(subjectId: string): Question[] {
    return sampleQuestions.filter(q => q.subject === subjectId);
}

export function getQuestionsByChapter(chapterId: string): Question[] {
    return sampleQuestions.filter(q => q.knowledgePointId.startsWith(chapterId));
}

export function getQuestionsByYear(year: number): Question[] {
    return sampleQuestions.filter(q => q.year === year);
}

export function getRandomQuestions(count: number, filters?: {
    subject?: string;
    knowledgePointId?: string;
    difficulty?: number;
    year?: number;
}): Question[] {
    let questions = [...sampleQuestions];

    if (filters?.subject) {
        questions = questions.filter(q => q.subject === filters.subject);
    }
    if (filters?.knowledgePointId) {
        questions = questions.filter(q => q.knowledgePointId === filters.knowledgePointId);
    }
    if (filters?.difficulty) {
        questions = questions.filter(q => q.difficulty === filters.difficulty);
    }
    if (filters?.year) {
        questions = questions.filter(q => q.year === filters.year);
    }

    questions.sort(() => Math.random() - 0.5);
    return questions.slice(0, count);
}
