import { motion } from "framer-motion";

export const LandingImg = () => {
    return (
        <div className="relative min-h-[400px] w-full overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex justify-center perspective-[3000px]"
            >
                <motion.div
                    className="relative border border-[var(--sand-5)] bg-[var(--sand-4)] rounded-xl p-1 w-fit h-fit"
                >


                    <motion.img
                        src="/Home.png"
                        alt="Home"
                        loading="eager"
                        draggable={false}
                        className="
              w-full
              max-w-[900px]
              rounded-xl
              object-cover
              transform-gpu
            "
                    />
                </motion.div>
            </motion.div>
        </div>
    );
};