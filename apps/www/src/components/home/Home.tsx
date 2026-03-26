import { ArrowRight, Github } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { buttonVariants, containerVariants, textVariants } from '../../lib/variants'
import { cn } from "@/lib/utils";
import NoiseBackgroundDemo from '../docs/Button';
import { LandingImg } from './LandingImg';

const Home = () => {
    return (
        <section className={cn(" relative rounded-2xl mx-auto w-full max-w-[1400px] flex flex-col items-center justify-center space-y-10")}>
            <div className={cn("flex flex-col z-2 px-4 size-full md:p-2 max-md:items-center max-md:text-center gap-10 px-4 md:px-8 lg:px-12")}>
                <motion.div
                    className="space-y-4 w-full flex justify-center items-center flex-col"
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
                        className="font-serif text-5xl md:text-6xl lg:text-6xl leading-[1.1] text-balance text-center"
                        variants={textVariants}
                    >
                        Build beautiful
                        <br />
                        consistent UIs — fast.
                    </motion.h1>
                    <motion.div variants={buttonVariants} className='ml-1 flex items-center gap-4'>
                        <Link to="/docs/introduction">
                            <NoiseBackgroundDemo variant="default" className="inline-flex cursor-pointer items-center gap-2">
                                Get Started
                                <ArrowRight className="w-4 h-4" />
                            </NoiseBackgroundDemo>
                        </Link>
                        <Link to="https://github.com/opstree/ot-react-packages" target="_blank" rel="noopener noreferrer">
                            <NoiseBackgroundDemo variant="emerald" className="inline-flex cursor-pointer items-center gap-2">
                                Github
                                <Github size={16} />
                            </NoiseBackgroundDemo>
                        </Link>
                    </motion.div>
                </motion.div>
            </div >
            <LandingImg />
        </section >
    )
}

export default Home
