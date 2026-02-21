import { Github, Monitor, Wand2, Paperclip, AtSign, SendHorizontal, Code, Calculator, X } from 'lucide-react'
import { motion } from 'motion/react'
import Badge from './Badge'
const Chatbot = () => {
    return (
        <section className="w-full max-w-screen-lg mx-auto rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#171717] overflow-hidden shadow-2xl transition-all duration-300">
            <header className="p-6 flex justify-between items-start">
                <div className="space-y-1">
                    <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Chat with Command Opscli Chatbot</h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        A conversational tool for web searches, citing sources, research, drafting, debugging, and more.
                    </p>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 transition-colors">
                        <Github className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 transition-colors">
                        <Monitor className="w-4 h-4" />
                    </button>
                </div>
            </header>

            <div className="px-6 py-12 flex flex-col items-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative mb-8"
                >
                    <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full" />
                    <div className="relative z-10 w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
                        <Wand2 size={18} className="text-white" />
                    </div>
                </motion.div>

                <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">Where knowledge begins</h3>
                <p className="text-neutral-500 dark:text-neutral-400 text-center mb-12 max-w-md">
                    Uses multiple sources and tools to answer questions with citations.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-16">
                    {[
                        { title: 'STAY UPDATED', desc: 'Rental Prices in North American Cities.' },
                        { title: 'RESEARCH', desc: 'Overview of the Solar Panel Industry.' },
                        { title: 'LEARN A TOPIC', desc: 'Detailed explanation of trigonometry.' }
                    ].map((card, idx) => (
                        <Badge data={[card]} key={idx} />
                    ))}
                </div>

                <div className="w-full max-w-3xl flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2 px-1">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium group cursor-default">
                            <Code className="w-3.5 h-3.5" />
                            <span>Python Runner</span>
                            <X className="w-3 h-3 ml-1 opacity-50 group-hover:opacity-100 cursor-pointer" />
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium group cursor-default">
                            <Calculator className="w-3.5 h-3.5" />
                            <span>Calculator</span>
                            <X className="w-3 h-3 ml-1 opacity-50 group-hover:opacity-100 cursor-pointer" />
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
                        <div className="relative flex items-center gap-3 p-1 bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-2xl transition-all">
                            <button className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                                <Paperclip className="w-5 h-5" />
                            </button>
                            <button className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                                <AtSign className="w-5 h-5" />
                            </button>
                            <input
                                type="text"
                                placeholder="Write a message here..."
                                className="flex-1 bg-transparent border-none outline-none text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400"
                            />
                            <button className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg shadow-green-500/20 transition-all active:scale-95">
                                <SendHorizontal size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Chatbot
