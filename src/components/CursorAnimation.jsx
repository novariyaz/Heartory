import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorAnimation() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });

            const target = e.target;
            const isClickable = window.getComputedStyle(target).cursor === 'pointer' || target.tagName === 'BUTTON' || target.tagName === 'A';
            setIsHovering(isClickable);
        };

        window.addEventListener("mousemove", updateMousePosition);
        return () => window.removeEventListener("mousemove", updateMousePosition);
    }, []);

    return (
        <motion.div
            className="pointer-events-none fixed top-0 left-0 z-50 rounded-full border border-white/50 bg-white/10 backdrop-blur-sm mix-blend-exclusion"
            animate={{
                x: mousePosition.x - (isHovering ? 24 : 12),
                y: mousePosition.y - (isHovering ? 24 : 12),
                width: isHovering ? 48 : 24,
                height: isHovering ? 48 : 24,
            }}
            transition={{
                type: "spring",
                mass: 0.1,
                stiffness: 150,
                damping: 15,
                restDelta: 0.001
            }}
        />
    );
}
