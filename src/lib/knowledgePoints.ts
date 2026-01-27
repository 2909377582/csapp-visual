// 408 知识点体系定义
// 每个知识点对应 CSAPP 书中的某个章节或小节

export interface KnowledgePoint {
    id: string;          // 知识点ID，如 "ch01-1.1"
    chapterId: string;   // 所属章节ID，如 "ch01"
    section: string;     // 小节编号，如 "1.1"
    title: string;       // 知识点标题
    titleEn?: string;    // 英文标题
    keywords: string[];  // 关键词，用于搜索和匹配
}

export interface Subject {
    id: string;          // 科目ID: ds, co, os, cn
    name: string;        // 科目名称
    nameEn: string;      // 英文名称
    icon: string;        // 图标
    color: string;       // 颜色
}

// 408四门科目
export const subjects: Subject[] = [
    {
        id: "ds",
        name: "数据结构",
        nameEn: "Data Structures",
        icon: "🌳",
        color: "from-green-500 to-emerald-600"
    },
    {
        id: "co",
        name: "计算机组成原理",
        nameEn: "Computer Organization",
        icon: "🔧",
        color: "from-orange-500 to-red-600"
    },
    {
        id: "os",
        name: "操作系统",
        nameEn: "Operating Systems",
        icon: "⚙️",
        color: "from-blue-500 to-indigo-600"
    },
    {
        id: "cn",
        name: "计算机网络",
        nameEn: "Computer Networks",
        icon: "🌐",
        color: "from-purple-500 to-pink-600"
    }
];

// CSAPP 第1章知识点（只包含有题目的知识点）
export const chapter1KnowledgePoints: KnowledgePoint[] = [
    {
        id: "ch01-1.1",
        chapterId: "ch01",
        section: "1.1",
        title: "信息就是位+上下文",
        titleEn: "Information Is Bits + Context",
        keywords: ["二进制", "位", "字节", "ASCII", "编码", "补码", "浮点数"]
    },
    {
        id: "ch01-1.2",
        chapterId: "ch01",
        section: "1.2",
        title: "编译系统",
        titleEn: "Compilation System",
        keywords: ["编译", "预处理", "汇编", "链接", "gcc"]
    },
    {
        id: "ch01-1.4",
        chapterId: "ch01",
        section: "1.4",
        title: "处理器与硬件",
        titleEn: "Processors and Hardware",
        keywords: ["CPU", "总线", "内存", "I/O", "程序计数器", "ALU", "寄存器"]
    },
    {
        id: "ch01-1.5",
        chapterId: "ch01",
        section: "1.5-1.6",
        title: "存储层次结构",
        titleEn: "Memory Hierarchy",
        keywords: ["高速缓存", "cache", "L1", "L2", "L3", "局部性", "存储层次"]
    },
    {
        id: "ch01-1.7",
        chapterId: "ch01",
        section: "1.7",
        title: "操作系统管理硬件",
        titleEn: "The Operating System Manages the Hardware",
        keywords: ["操作系统", "进程", "线程", "虚拟内存", "文件", "抽象"]
    },
    {
        id: "ch01-1.8",
        chapterId: "ch01",
        section: "1.8",
        title: "网络通信",
        titleEn: "Network Communication",
        keywords: ["网络", "TCP/IP", "客户端", "服务器"]
    }
];

// 知识点与408科目的对应关系
export const knowledgePointToSubject: Record<string, string[]> = {
    "ch01-1.1": ["co"],              // 信息表示 → 计组
    "ch01-1.2": ["co"],              // 编译系统 → 计组
    "ch01-1.4": ["co"],              // 处理器 → 计组
    "ch01-1.5": ["co"],              // 存储层次 → 计组（合并了1.5和1.6）
    "ch01-1.7": ["os"],              // 操作系统 → 操作系统
    "ch01-1.8": ["cn"],              // 网络 → 计网
};

// 根据章节ID获取知识点
export function getKnowledgePointsByChapter(chapterId: string): KnowledgePoint[] {
    // 目前只实现了第1章
    if (chapterId === "ch01") {
        return chapter1KnowledgePoints;
    }
    return [];
}

// 根据科目获取相关知识点
export function getKnowledgePointsBySubject(subjectId: string): KnowledgePoint[] {
    return chapter1KnowledgePoints.filter(kp =>
        knowledgePointToSubject[kp.id]?.includes(subjectId)
    );
}

// 根据关键词搜索知识点
export function searchKnowledgePoints(keyword: string): KnowledgePoint[] {
    const lowerKeyword = keyword.toLowerCase();
    return chapter1KnowledgePoints.filter(kp =>
        kp.title.toLowerCase().includes(lowerKeyword) ||
        kp.keywords.some(k => k.toLowerCase().includes(lowerKeyword))
    );
}
