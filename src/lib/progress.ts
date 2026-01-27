// 学习进度管理模块 - 使用 LocalStorage 存储

import { chapters, ChapterProgress } from "./chapters";

const STORAGE_KEY = "csapp-visual-progress";

// 初始化默认进度（第一章解锁，其他锁定）
function getDefaultProgress(): Record<string, ChapterProgress> {
    const progress: Record<string, ChapterProgress> = {};

    chapters.forEach((chapter, index) => {
        progress[chapter.id] = {
            chapterId: chapter.id,
            progress: 0,
            isUnlocked: index === 0, // 只有第一章默认解锁
            isCompleted: false,
        };
    });

    return progress;
}

// 从 LocalStorage 获取进度
export function getAllProgress(): Record<string, ChapterProgress> {
    if (typeof window === "undefined") {
        return getDefaultProgress();
    }

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error("Failed to load progress from localStorage:", error);
    }

    return getDefaultProgress();
}

// 保存进度到 LocalStorage
function saveProgress(progress: Record<string, ChapterProgress>): void {
    if (typeof window === "undefined") return;

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
        console.error("Failed to save progress to localStorage:", error);
    }
}

// 获取单个章节的进度
export function getChapterProgress(chapterId: string): ChapterProgress {
    const allProgress = getAllProgress();
    return allProgress[chapterId] || {
        chapterId,
        progress: 0,
        isUnlocked: false,
        isCompleted: false,
    };
}

// 更新章节进度
export function updateChapterProgress(
    chapterId: string,
    progress: number
): void {
    const allProgress = getAllProgress();

    if (!allProgress[chapterId]) {
        allProgress[chapterId] = {
            chapterId,
            progress: 0,
            isUnlocked: false,
            isCompleted: false,
        };
    }

    allProgress[chapterId].progress = Math.min(100, Math.max(0, progress));
    allProgress[chapterId].lastAccessed = new Date().toISOString();

    // 如果进度达到100%，标记为完成并解锁下一章
    if (progress >= 100) {
        allProgress[chapterId].isCompleted = true;

        // 找到下一章并解锁
        const currentIndex = chapters.findIndex((ch) => ch.id === chapterId);
        if (currentIndex < chapters.length - 1) {
            const nextChapterId = chapters[currentIndex + 1].id;
            if (!allProgress[nextChapterId]) {
                allProgress[nextChapterId] = {
                    chapterId: nextChapterId,
                    progress: 0,
                    isUnlocked: true,
                    isCompleted: false,
                };
            } else {
                allProgress[nextChapterId].isUnlocked = true;
            }
        }
    }

    saveProgress(allProgress);
}

// 检查章节是否已解锁
export function isChapterUnlocked(chapterId: string): boolean {
    const progress = getChapterProgress(chapterId);
    return progress.isUnlocked;
}

// 检查章节是否已完成
export function isChapterCompleted(chapterId: string): boolean {
    const progress = getChapterProgress(chapterId);
    return progress.isCompleted;
}

// 完成章节
export function completeChapter(chapterId: string): void {
    updateChapterProgress(chapterId, 100);
}

// 获取总体学习进度（百分比）
export function getOverallProgress(): number {
    const allProgress = getAllProgress();
    const completedCount = Object.values(allProgress).filter(
        (p) => p.isCompleted
    ).length;
    return Math.round((completedCount / chapters.length) * 100);
}

// 获取已完成章节数
export function getCompletedChaptersCount(): number {
    const allProgress = getAllProgress();
    return Object.values(allProgress).filter((p) => p.isCompleted).length;
}

// 重置所有进度（仅用于开发/测试）
export function resetAllProgress(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
}
