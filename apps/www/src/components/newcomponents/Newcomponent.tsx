import React from "react"
import { motion } from "framer-motion";

const LatestComponent = () => {
    const bentoItems = [
        {
            title: "Performance",
            description: "Lightning fast components optimized for speed.",
            className: "md:col-span-3 md:row-span-2 bg-gradient-to-br from-blue-500/50 to-cyan-500/10",
            icon: "🚀"
        },
        {
            title: "Customizable",
            description: "Easily tweak styles to match your brand.",
            className: "md:col-span-3 md:row-span-2 bg-gradient-to-br from-purple-500/10 to-pink-500/10",
            icon: "🎨"
        },
        {
            title: "Accessibility",
            description: "Built with a11y in mind for every user.",
            className: "md:col-span-3 md:row-span-2 bg-gradient-to-br from-orange-500/10 to-yellow-500/10",
            icon: "♿"
        },
        {
            title: "Responsive",
            description: "Looks great on any screen size.",
            className: "md:col-span-3 md:row-span-2 bg-gradient-to-br from-green-500/10 to-emerald-500/10",
            icon: "📱"
        }
    ];

    return (
        <section
            className="w-full max-w-screen-md mx-auto px-4 py-20 relative"
        >
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">Our Features</h2>
                <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                    Explore the power of our component library tailored for modern web development.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[180px]">
                {bentoItems.map((item, index) => (
                    <div
                        key={index}
                        className={`group relative overflow-hidden rounded-sm border border-black/5 dark:border-white/10 p-6 flex flex-col justify-between backdrop-blur-sm transition-all ${item.className}`}
                    >
                        <div className="absolute -right-4 -top-4 text-6xl opacity-10 grayscale  transition-all duration-500">
                            {item.icon}
                        </div>

                        <div>
                            <div className="text-2xl mb-4">{item.icon}</div>
                            <h3 className="text-xl font-bold mb-2 dark:text-white">{item.title}</h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default LatestComponent;
