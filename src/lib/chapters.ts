// CSAPP 章节数据结构

export interface Chapter {
  id: string;
  part: number;
  number: number;
  title: string;
  titleEn: string;
  description: string;
  icon: string;
  color: string;
}

export interface ChapterProgress {
  chapterId: string;
  progress: number; // 0-100
  isUnlocked: boolean;
  isCompleted: boolean;
  lastAccessed?: string;
}

// CSAPP 12个章节的完整数据
export const chapters: Chapter[] = [
  // Part 1: 程序结构和执行
  {
    id: "ch01",
    part: 1,
    number: 1,
    title: "计算机系统漫游",
    titleEn: "A Tour of Computer Systems",
    description: "了解计算机系统的整体结构，从源代码到可执行程序的完整过程",
    icon: "🚀",
    color: "#6366f1",
  },
  {
    id: "ch02",
    part: 1,
    number: 2,
    title: "信息的表示和处理",
    titleEn: "Representing and Manipulating Information",
    description: "深入理解二进制、整数、浮点数在计算机中的表示方式",
    icon: "🔢",
    color: "#8b5cf6",
  },
  {
    id: "ch03",
    part: 1,
    number: 3,
    title: "程序的机器级表示",
    titleEn: "Machine-Level Representation of Programs",
    description: "探索汇编语言与程序结构，理解高级代码如何转变为机器指令",
    icon: "⚙️",
    color: "#a855f7",
  },
  {
    id: "ch04",
    part: 1,
    number: 4,
    title: "处理器体系结构",
    titleEn: "Processor Architecture",
    description: "设计和实现一个简单的处理器，理解CPU的工作原理",
    icon: "🧠",
    color: "#c026d3",
  },
  {
    id: "ch05",
    part: 1,
    number: 5,
    title: "优化程序性能",
    titleEn: "Optimizing Program Performance",
    description: "学习编写高效代码的技术，理解编译器优化和硬件特性",
    icon: "⚡",
    color: "#e11d48",
  },
  {
    id: "ch06",
    part: 1,
    number: 6,
    title: "存储器层次结构",
    titleEn: "The Memory Hierarchy",
    description: "理解缓存、内存、磁盘的层次结构和工作原理",
    icon: "💾",
    color: "#f97316",
  },

  // Part 2: 在系统上运行程序
  {
    id: "ch07",
    part: 2,
    number: 7,
    title: "链接",
    titleEn: "Linking",
    description: "理解程序是如何被链接成可执行文件的",
    icon: "🔗",
    color: "#eab308",
  },
  {
    id: "ch08",
    part: 2,
    number: 8,
    title: "异常控制流",
    titleEn: "Exceptional Control Flow",
    description: "探索异常、中断、信号和进程的概念",
    icon: "🌊",
    color: "#22c55e",
  },
  {
    id: "ch09",
    part: 2,
    number: 9,
    title: "虚拟内存",
    titleEn: "Virtual Memory",
    description: "深入理解虚拟内存系统和内存管理",
    icon: "🗺️",
    color: "#14b8a6",
  },

  // Part 3: 程序间的交互和通信
  {
    id: "ch10",
    part: 3,
    number: 10,
    title: "系统级 I/O",
    titleEn: "System-Level I/O",
    description: "学习Unix I/O和文件操作",
    icon: "📁",
    color: "#0ea5e9",
  },
  {
    id: "ch11",
    part: 3,
    number: 11,
    title: "网络编程",
    titleEn: "Network Programming",
    description: "构建客户端-服务器应用，理解网络通信",
    icon: "🌐",
    color: "#3b82f6",
  },
  {
    id: "ch12",
    part: 3,
    number: 12,
    title: "并发编程",
    titleEn: "Concurrent Programming",
    description: "掌握线程、同步和并发程序设计",
    icon: "🔀",
    color: "#6366f1",
  },
];

// 按部分分组的章节
export const chaptersByPart = {
  1: {
    title: "第一部分：程序结构和执行",
    titleEn: "Part I: Program Structure and Execution",
    chapters: chapters.filter((ch) => ch.part === 1),
  },
  2: {
    title: "第二部分：在系统上运行程序",
    titleEn: "Part II: Running Programs on a System",
    chapters: chapters.filter((ch) => ch.part === 2),
  },
  3: {
    title: "第三部分：程序间的交互和通信",
    titleEn: "Part III: Interaction and Communication Between Programs",
    chapters: chapters.filter((ch) => ch.part === 3),
  },
};

// 获取章节通过ID
export function getChapterById(id: string): Chapter | undefined {
  return chapters.find((ch) => ch.id === id);
}

// 获取下一章节
export function getNextChapter(currentId: string): Chapter | undefined {
  const currentIndex = chapters.findIndex((ch) => ch.id === currentId);
  if (currentIndex === -1 || currentIndex === chapters.length - 1) {
    return undefined;
  }
  return chapters[currentIndex + 1];
}

// 获取前一章节
export function getPrevChapter(currentId: string): Chapter | undefined {
  const currentIndex = chapters.findIndex((ch) => ch.id === currentId);
  if (currentIndex <= 0) {
    return undefined;
  }
  return chapters[currentIndex - 1];
}
