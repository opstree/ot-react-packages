import { motion } from "framer-motion";
import React from "react";

interface HeaderProps {
  page: string;
  subPage?: string;
  action?: React.ReactNode;
}

const Header = ({ page, subPage, action }: HeaderProps) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative top-4 z-40 mx-5 mb-6 rounded-lg dark:bg-[var(--bg)] bg-neutral-200 px-6 py-3 flex items-center justify-between"
    >
      {page && (
        <div className='flex flex-col'>
          <h1 className='text-lg font-bold dark:text-white text-slate-800 tracking-tight'>{page}</h1>
          {subPage && <span className='text-xs font-medium dark:text-neutral-400 text-slate-500 mt-0.5'>{subPage}</span>}
        </div>
      )}

      <div className="flex items-center gap-4">
        {action}
      </div>
    </motion.header>
  )
}

export default Header
