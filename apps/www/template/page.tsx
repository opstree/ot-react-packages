import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Code2, Plus, Type, Wrench, Zap } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import axios from "axios"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TableScehma, TableSchema } from "../src/lib/Schema"
import Navbar from "@/components/navbar/Navbar"

const CATEGORIES = [
    { id: "ui", label: "UI Component", icon: Zap, color: "text-blue-400" },
    { id: "types", label: "Types / Interfaces", icon: Type, color: "text-purple-400" },
    { id: "lib", label: "Library / Utility", icon: Wrench, color: "text-green-400" },
    { id: "hook", label: "React Hook", icon: Code2, color: "text-orange-400" },
]

const Template = () => {
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)
    const [dependencyInput, setDependencyInput] = React.useState("")

    const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<TableSchema>({
        resolver: zodResolver(TableScehma),
        defaultValues: {
            category: CATEGORIES[0].id,
            name: "",
            code: "",
            dependencies: [],
        }
    });

    const name = watch("name")
    const categoryId = watch("category")
    const activeDependencies = watch("dependencies") || []
    const category = CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[0]

    const onsubmit = async (data: TableSchema) => {
        try {
            const res = await axios.post("/api/template", data)
            console.log(res.data);
        } catch (error) {
            console.log("Error in Uploading New Component", error);
        }
        finally {
            setValue("name", "")
            setValue("category", CATEGORIES[0].id)
            setValue("code", "")
            setValue("dependencies", [])
            setDependencyInput("")
            setIsDropdownOpen(false)
        }
    }

    return (
        <section className="w-screen min-h-screen">
            <Navbar />
            <div className="max-w-screen-xl w-full mx-auto py-10 px-6 space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-1"
                >
                    <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">
                        Add New Component
                    </h1>
                    <p className="text-neutral-400 text-sm">
                        Create and register a new building block for the Ops-UI registry.
                    </p>
                </motion.div>
                <form onSubmit={handleSubmit(onsubmit)}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-8 space-y-8">
                            <div className="space-y-4">
                                <p className="flex items-center justify-between">
                                    <label className="text-sm text-neutral-400 uppercase ">
                                        Component Name
                                    </label>
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                                </p>
                                <div className="relative group mt-2">
                                    <input
                                        type="text"
                                        {...register("name")}
                                        placeholder="e.g. DynamicTable"
                                        className="w-full bg-[var(--bg)] ring-1 ring-white/30 rounded-sm px-2 py-2 text-sm outline-none placeholder:text-neutral-700"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <p className="flex items-center justify-between">
                                    <label className="text-sm text-neutral-400 uppercase ">
                                        Dependencies
                                    </label>
                                    {errors.dependencies && <p className="text-red-500 text-xs mt-1">{errors.dependencies.message}</p>}
                                </p>
                                <div className="relative group mt-2">
                                    <input
                                        type="text"
                                        value={dependencyInput}
                                        onChange={(e) => setDependencyInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault()
                                                if (dependencyInput.trim()) {
                                                    const newDeps = [...activeDependencies, dependencyInput.trim()]
                                                    setValue("dependencies", newDeps, { shouldValidate: true })
                                                    setDependencyInput("")
                                                }
                                            }
                                        }}
                                        placeholder="Type dependency and press Enter"
                                        className="w-full bg-[var(--bg)] ring-1 ring-white/30 rounded-sm px-2 py-2 text-sm outline-none placeholder:text-neutral-700"
                                    />
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        <AnimatePresence>
                                            {activeDependencies.map((dep, index) => (
                                                <motion.div
                                                    key={`${dep}-${index}`}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    className="flex items-center gap-2 bg-neutral-900 ring-1 ring-white/20 px-3 py-1 rounded-full text-xs text-neutral-300"
                                                >
                                                    <span>{dep}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newDeps = activeDependencies.filter((_, i) => i !== index)
                                                            setValue("dependencies", newDeps, { shouldValidate: true })
                                                        }}
                                                        className="hover:text-red-500 transition-colors"
                                                    >
                                                        <Plus className="w-3 h-3 rotate-45 cursor-pointer" />
                                                    </button>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-medium text-neutral-400 uppercase">
                                    Implementation Code
                                </label>
                                <div className="relative group rounded-sm mt-2 overflow-hidden border border-neutral-800 bg-[#0D0D0D]">
                                    <div className="absolute top-0 left-0 right-0 h-10 bg-neutral-900 border-b border-neutral-800 flex items-center px-4 justify-between">
                                        <div className="flex gap-1.5">
                                            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                                            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40" />
                                        </div>
                                        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-tighter">
                                            {name ? `${name.toLowerCase()}.tsx` : "component.tsx"}
                                        </span>
                                    </div>
                                    <textarea
                                        {...register("code")}
                                        placeholder={`""\n\nexport const ${name || "Component"} = () => {\n  return <div>Hello World</div>\n}`}
                                        className="w-full h-[500px] bg-transparent pt-14 pb-6 px-6 font-mono text-sm text-neutral-300 outline-none resize-none scrollbar-hide"
                                    />
                                    {errors.code && <p className="text-red-500 text-xs p-2">{errors.code.message}</p>}
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-4 space-y-8">
                            <div className="space-y-4">
                                <label className="text-sm font-medium text-neutral-400 uppercase ">
                                    Category
                                </label>
                                <div className="relative mt-2">
                                    <div
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="w-full flex ring-1 ring-white/30 items-center justify-between bg-neutral-900/50 px-2 py-2 rounded-sm cursor-pointer transition-colors group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <category.icon className={cn("w-5 h-5", category.color)} />
                                            <span className="font-medium">{category.label}</span>
                                        </div>
                                        <ChevronDown className={cn("w-4 h-4 text-neutral-500 transition-transform duration-300", isDropdownOpen && "rotate-180")} />
                                    </div>

                                    <AnimatePresence>
                                        {isDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-full left-0 right-0 ring-1 ring-white/30 mt-2 z-50 bg-[#141414] rounded-sm overflow-hidden shadow-2xl backdrop-blur-xl"
                                            >
                                                <div className="p-1.5">
                                                    {CATEGORIES.map((cat) => (
                                                        <button
                                                            key={cat.id}
                                                            type="button"
                                                            onClick={() => {
                                                                setValue("category", cat.id, { shouldValidate: true })
                                                                setIsDropdownOpen(false)
                                                            }}
                                                            className={cn(
                                                                "w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200",
                                                                category.id === cat.id
                                                                    ? "bg-white/10 text-white"
                                                                    : "text-neutral-500 hover:text-neutral-200"
                                                            )}
                                                        >
                                                            <cat.icon className={cn("w-5 h-5", cat.color)} />
                                                            <span className="font-medium text-sm">{cat.label}</span>
                                                            {category.id === cat.id && (
                                                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                            </div>
                            <div className="pt-0 lg:pt-8">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className=' flex ring-[.5px] ring-white/30 justify-between cursor-pointer relative items-center lg:w-fit bg-[var(--bg)] shadow-[var(--shadow-s)] rounded-lg px-2 py-2 mt-1 outline-0 text-sm gap-2 items-center flex duration-600 ease-inOut'
                                >
                                    <Plus className={cn("w-4 h-4", isSubmitting && "animate-spin")} />
                                    <p className='text-sm'>
                                        {isSubmitting ? "Adding..." : "Add Component"}
                                    </p>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Template