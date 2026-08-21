import { ArrowRight, Github } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { buttonVariants, containerVariants, textVariants } from '../../lib/variants'
import NoiseBackgroundDemo from '../docs/ts/Button';
import { ReactSVG } from './components/React';
import ComponentGrid from './ComponentsGrid';

const Home = () => {
    return (
        <div className="relative z-20 mx-auto w-full max-w-[84rem] px-4">
            <div className=''>
                <div className="mt-4 flex flex-col items-start px-2 md:px-8 xl:px-0">
                    <div className="flex items-center gap-0.5 whitespace-nowrap rounded-full ring-black/20 md:justify-start xl:h-8 xl:gap-3 xl:px-3 xl:ring-1 shadow-[2px_2px_1px_#121212] w-fit mb-4">
                        <div className="flex items-center gap-1.5 xl:gap-2.5">
                            <ReactSVG />
                            <span className="text-ln-paragraph-sm text-ln-gray-600">Built for
                                <span className="font-medium text-ln-gray-800 xl:font-normal ml-1">React</span>
                            </span>
                        </div>
                        <div className="hidden h-4 w-px bg-[var(--sand-6)] xl:block"></div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-5 text-ln-gray-300 xl:hidden"><path fill="currentColor" d="M10.003 11.108a1.183 1.183 0 0 1-1.176-1.176c0-.644.532-1.176 1.176-1.176s1.176.532 1.176 1.176-.532 1.176-1.176 1.176"></path></svg>
                        <div className="flex items-center gap-1.5 xl:gap-2.5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="size-4 shrink-0"><path fill="#23B2E7" fill-rule="evenodd" d="M10 5Q6 5 5 8.334q1.5-1.668 3.5-1.25c.76.158 1.305.618 1.906 1.127C11.386 9.041 12.522 10 15 10q4 0 5-3.333-1.5 1.667-3.5 1.25c-.76-.159-1.305-.619-1.906-1.128C13.614 5.96 12.479 5 10 5m-5 5q-4 0-5 3.334 1.5-1.668 3.5-1.25c.76.158 1.305.618 1.906 1.127C6.386 14.041 7.521 15 10 15q4 0 5-3.333-1.5 1.667-3.5 1.25c-.76-.159-1.305-.619-1.906-1.128C8.614 10.96 7.478 10 5 10" clip-rule="evenodd"></path></svg>
                            <span className="text-ln-paragraph-sm text-ln-gray-600">Styled with<span className="font-medium text-ln-gray-800 xl:font-normal ml-1">TailwindCSS</span>
                            </span>
                        </div>
                    </div>
                    <h1 className="relative mt-4 max-w-4xl text-left text-4xl font-bold tracking-tight text-balance text-neutral-900 sm:text-5xl md:text-6xl xl:text-6xl dark:text-neutral-50">
                        Craft beautiful interfaces effortlessly.
                    </h1>
                    <div className=" mt-4 flex w-full flex-col items-start justify-between gap-4 md:mt-4 md:flex-row md:items-end md:gap-10 font-medium">
                        <p className='relative mb-8 max-w-2xl text-left text-sm tracking-wide text-neutral-600 antialiased sm:text-base md:text-base dark:text-neutral-400'>
                            Accelerate your development with 10+ pre-built, fully customizable components
                        </p>
                    </div>
                    <div className="relative mb-4 flex w-full flex-col justify-center gap-y-2 sm:flex-row sm:justify-start sm:space-y-0 sm:space-x-4">
                        <motion.div variants={buttonVariants} className='ml-1 flex items-center gap-4'>
                            <Link to="/docs/introduction">
                                <NoiseBackgroundDemo variant="default" className="inline-flex cursor-pointer items-center w-fit ">
                                    Brower Components
                                </NoiseBackgroundDemo>
                            </Link>
                            {/* <Link to="https://github.com/opstree/ot-react-packages" target="_blank" rel="noopener noreferrer">
                            <NoiseBackgroundDemo variant="emerald" className="inline-flex cursor-pointer items-center gap-2">
                                Github
                                <Github size={16} />
                            </NoiseBackgroundDemo>
                        </Link> */}
                        </motion.div>
                    </div>
                </div>
                <ComponentGrid />
            </div>
        </div>
    )
}

export default Home
