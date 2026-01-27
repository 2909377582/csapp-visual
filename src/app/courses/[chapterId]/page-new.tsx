import { getAllChapterIds } from "@/lib/chapters";
import ChapterPageClient from "./ChapterPageClient";

// 生成所有章节的静态参数
export function generateStaticParams() {
    return getAllChapterIds().map((chapterId) => ({
        chapterId: chapterId,
    }));
}

interface ChapterPageProps {
    params: Promise<{ chapterId: string }>;
}

export default async function ChapterPage({ params }: ChapterPageProps) {
    const { chapterId } = await params;
    return <ChapterPageClient chapterId={chapterId} />;
}
