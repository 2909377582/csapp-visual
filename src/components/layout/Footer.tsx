import Link from "next/link";
import { Github, Mail, Heart } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white font-bold text-lg">
                                CS
                            </div>
                            <span className="font-bold text-xl">
                                CSAPP<span className="text-indigo-400">可视化</span>
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            通过交互式可视化，让每一个计算机系统概念都变得生动有趣。
                            适合零基础学习者的深入学习平台。
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">快速链接</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/courses"
                                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                                >
                                    全部课程
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/progress"
                                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                                >
                                    学习进度
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                                >
                                    关于我们
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">联系方式</h3>
                        <div className="space-y-3">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors"
                            >
                                <Github size={18} />
                                <span>GitHub</span>
                            </a>
                            <a
                                href="mailto:contact@csapp-visual.com"
                                className="flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors"
                            >
                                <Mail size={18} />
                                <span>contact@csapp-visual.com</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm">
                        © 2025 CSAPP可视化. All rights reserved.
                    </p>
                    <p className="text-gray-500 text-sm flex items-center gap-1">
                        Made with <Heart size={14} className="text-red-500" /> for learners
                    </p>
                </div>
            </div>
        </footer>
    );
}
