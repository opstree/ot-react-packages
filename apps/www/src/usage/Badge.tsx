import { motion } from "motion/react"

interface BadgesubItems {
    title: string,
    desc: string
}
interface BadgeProps {
    data: BadgesubItems[]
}

const Badge = ({ data }: BadgeProps) => {
    return (
        <>
            {data.map((card: BadgesubItems, idx: number) => (
                <motion.div
                    whileHover={{ y: -4 }}
                    key={idx}
                    className="p-5 rounded-2xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/20 transition-all cursor-pointer"
                >
                    <h4 className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-3">{card.title}</h4>
                    <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{card.desc}</p>
                </motion.div>
            ))}
        </>
    )
}
export default Badge;