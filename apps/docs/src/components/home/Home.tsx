import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { buttonVariants, containerVariants, textVariants } from '../../lib/variants'
import { cn } from '@/lib/cn'

const Home = () => {
    return (
        <section className={cn(" relative flex min-h-[600px] h-[70vh] max-h-[900px] border rounded-2xl overflow-hidden mx-auto w-full max-w-[1400px] bg-origin-border")}>
            <div className="flex flex-col z-2 px-4 size-full md:p-8 max-md:items-center max-md:text-center">
                <motion.div
                    className="space-y-2 w-full"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        className=' mt-20 lg:mt-10 w-fit backdrop-blur-2xl bg-white/10 border border-white/10 lg:w-fit px-2 md:px-4 py-1 rounded-2xl flex items-center justify-center gap-3 mb-5 shadow-[var(--shadow-sm)]'
                        variants={textVariants}
                    >
                        <p className=' text-[8px] md:text-[10px]'>A modern UI library designed for speed, flexibility, and simplicity.</p>
                    </motion.div>
                    <motion.h1
                        className="font-serif text-5xl md:text-6xl lg:text-6xl leading-[1.1] text-balance font-serif text-5xl leading-[1.1] text-balance"
                        variants={textVariants}
                    >
                        Build beautiful
                        <br />
                        consistent UIs — fast.
                    </motion.h1>
                    <motion.div variants={buttonVariants} className='ml-1'>
                        <Link to="/docs/introduction">
                            <button className="inline-flex cursor-pointer items-center gap-2 dark:bg-primary dark:text-primary-foreground  text-primary-foreground bg-[var(--bg)] dark:text-[var(--text)] px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors ring-1 dark:ring-neutral-200 ring-neutral-200">
                                Get Started
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
            <motion.img
                initial={{ opacity: 0, y: 100, filter: 'blur(10px)' }}
                animate={{
                    opacity: 1,
                    y: [0, -20, 0],
                    filter: 'blur(0px)',
                }}
                src="./Home.png"
                alt="Home"
                className="absolute top-[460px] -right-[20px] max-w-[900px] rounded-xl border-2 lg:top-[400px] mr-2 shadow-2xl"
            />
        </section>
    )
}

export default Home
