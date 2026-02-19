import { WindowControls } from "#components";
import { techStack } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import { TerminalSquare, ChevronRight, Hash, Code2, Database, Globe, GraduationCap, Cpu, Activity, User, Monitor } from "lucide-react";

const getIcon = (category) => {
    const map = {
        "Languages": Code2,
        "Frameworks": Globe,
        "Backend & DB": Database,
        "DevOps": TerminalSquare,
        "Coursework": GraduationCap,
    };
    return map[category] || Hash;
};

const Terminal = () => {
    return (
        <>
            <div id="window-header">
                <WindowControls target="terminal" />
                <div className="flex items-center gap-2 justify-center flex-1 pr-12">
                    <TerminalSquare size={14} className="text-gray-400" />
                    <span className="font-semibold text-gray-500 text-xs">user@portfolio — zsh — 80x24</span>
                </div>
            </div>

            <div className="bg-[#0c0c0c] h-full flex flex-col min-h-0 text-[#d4d4d4] font-mono text-xs relative leading-relaxed overflow-hidden">
                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar p-5 pb-10 space-y-6">

                    {/* Header Info (Neofetch Style) */}
                    <div className="flex flex-wrap gap-6 items-start border-b border-[#222] pb-6">
                        <div className="flex flex-col items-center">
                            <div className="text-blue-500 mb-2">
                                <TerminalSquare size={48} />
                            </div>
                            <div className="flex gap-1 justify-center">
                                <span className="size-2 bg-red-500 rounded-full" />
                                <span className="size-2 bg-green-500 rounded-full" />
                                <span className="size-2 bg-yellow-500 rounded-full" />
                                <span className="size-2 bg-blue-500 rounded-full" />
                                <span className="size-2 bg-purple-500 rounded-full" />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="flex gap-2 mb-2">
                                <span className="text-blue-400 font-bold">user</span>
                                <span className="text-gray-600">@</span>
                                <span className="text-blue-400 font-bold">portfolio</span>
                            </div>
                            <div className="text-[10px] space-y-0.5">
                                <div className="flex gap-2">
                                    <span className="text-blue-400 w-16">OS:</span>
                                    <span>MostafaOS x86_64</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-blue-400 w-16">Host:</span>
                                    <span>Portfolio v2.0.0</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-blue-400 w-16">Kernel:</span>
                                    <span>6.5.0-react-ready</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-blue-400 w-16">Shell:</span>
                                    <span>zsh 5.9</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-blue-400 w-16">WM:</span>
                                    <span>Antigravity</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Skill Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {techStack.map((tech, idx) => {
                            const Icon = getIcon(tech.category);
                            return (
                                <div
                                    key={idx}
                                    className="bg-[#161616] rounded-md p-3 border border-[#222] hover:border-[#333] transition-all group"
                                >
                                    <div className="flex items-center gap-2 mb-3 text-blue-400 border-b border-[#222] pb-2">
                                        <Icon size={14} className="group-hover:text-blue-300 transition-colors" />
                                        <h3 className="font-bold text-[10px] uppercase tracking-widest">{tech.category}</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {tech.items.map((item, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-0.5 rounded-sm text-[10px] bg-[#222] text-[#aaa] border border-[#2d2d2d] hover:text-white hover:bg-blue-900/40 hover:border-blue-700/50 transition-all cursor-default"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Final Prompt */}
                    <div className="flex items-center gap-2 text-green-500 pt-2">
                        <span className="bg-[#2ecc71] text-[#0c0c0c] px-1 font-bold">~</span>
                        <ChevronRight size={14} />
                        <span className="text-[#eee]">status --check</span>
                        <span className="w-2 h-4 bg-gray-400 animate-pulse ml-1" />
                    </div>
                </div>

                {/* Status Bar */}
                <div className="bg-[#111] border-t border-[#222] py-1 px-4 text-[9px] text-gray-500 flex justify-between items-center select-none">
                    <div className="flex items-center gap-5">
                        <div className="flex items-center gap-1.5">
                            <span className="text-green-500">●</span>
                            <span>NODE_ENV: production</span>
                        </div>
                        <div className="flex items-center gap-1.5 hidden sm:flex">
                            <Activity size={10} className="text-blue-400" />
                            <span>CPU: 42%</span>
                        </div>
                        <div className="flex items-center gap-1.5 hidden md:flex">
                            <Monitor size={10} className="text-purple-400" />
                            <span>LATENCY: 24ms</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                            <Hash size={10} /> main*
                        </span>
                        <span className="text-blue-400">UTF-8</span>
                    </div>
                </div>
            </div>
        </>
    )
}

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;