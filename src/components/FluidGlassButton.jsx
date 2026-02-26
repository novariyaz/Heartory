import { motion } from "framer-motion";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export default function FluidGlassButton({ children, className, onClick, ...props }) {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={twMerge(
                clsx(
                    "relative overflow-hidden rounded-full border border-white/20 bg-white/5 px-8 py-3 font-medium text-white shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-lg transition-all",
                    "hover:bg-white/15 hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]",
                    className
                )
            )}
            {...props}
        >
            <div className="relative z-10 flex items-center justify-center gap-2">{children}</div>
            <motion.div
                className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
            />
        </motion.button>
    );
}
