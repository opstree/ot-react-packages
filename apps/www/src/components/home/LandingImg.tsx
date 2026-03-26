import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { useRef } from "react"

export const LandingImg = () => {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start start", "end end"],
    });
    const rotateX = useTransform(scrollYProgress, [0, 1], [0, 30]);
    const rotateY = useTransform(scrollYProgress, [0, 1], [0, 20]);
    const rotateZ = useTransform(scrollYProgress, [0, 1], [0, -20]);
    return (
        <div className="relative min-h-[400px] perspective-distant w-full">
            <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="perspective-[4000px] items-start justify-center flex w-full">
                <motion.div
                    ref={scrollRef}
                    className="relative"
                    style={{ rotateX, rotateY, rotateZ }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className={cn(
                            "absolute inset-0 -z-10",
                            "rounded-xl blur-xl opacity-50",
                            "bg-gradient-to-br from-indigo-200 via-purple-300/20 to-pink-300/20",
                        )}
                    />
                    <img
                        src="./Home.png"
                        alt="Home"
                        className={cn(
                            "lg:max-w-[900px] max-w-[600px] w-full rounded-xl shadow-2xl object-cover z-2",
                            "mask-b-from-80% mask-t-from-100%",
                        )}
                    />
                </motion.div>
            </motion.div>
        </div>
    )
}
