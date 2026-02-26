import { useRef, useState } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export default function SpotlightCard({ children, className, spotlightColor = "rgba(255, 255, 255, 0.15)" }) {
    const divRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e) => {
        if (!divRef.current || isFocused) return;
        const div = divRef.current;
        const rect = div.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => { setIsFocused(true); setOpacity(1); };
    const handleBlur = () => { setIsFocused(false); setOpacity(0); };
    const handleMouseEnter = () => { setOpacity(1); };
    const handleMouseLeave = () => { setOpacity(0); };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={twMerge(
                clsx(
                    "relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-8 backdrop-blur-xl transition-colors duration-300",
                    className
                )
            )}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
                    zIndex: 0
                }}
            />
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
