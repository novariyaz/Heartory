import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function VariableProximity({ text, className }) {
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className={`flex flex-wrap ${className}`}>
            {text.split(" ").map((word, wordIdx) => (
                <React.Fragment key={wordIdx}>
                    <span className="inline-block whitespace-nowrap">
                        {word.split("").map((char, charIdx) => {
                            return (
                                <CharWithProximity
                                    key={charIdx}
                                    char={char}
                                    mousePos={mousePos}
                                />
                            );
                        })}
                    </span>
                    <span className="inline-block w-[0.25em]">&nbsp;</span>
                </React.Fragment>
            ))}
        </div>
    );
}

function CharWithProximity({ char, mousePos }) {
    const charRef = useRef(null);
    const [distance, setDistance] = useState(1000);

    useEffect(() => {
        if (!charRef.current) return;
        const rect = charRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate distance to mouse
        const dist = Math.sqrt(Math.pow(mousePos.x - centerX, 2) + Math.pow(mousePos.y - centerY, 2));
        setDistance(dist);
    }, [mousePos]);

    // Max distance considered for proximity is 200px
    const maxDist = 200;
    const proximity = Math.max(0, 1 - distance / maxDist);

    // Interpolations
    const fontWeight = 200 + proximity * 700;
    const yOffset = -proximity * 4;
    const opacity = 0.4 + proximity * 0.6;
    const scale = 1 + proximity * 0.15;

    return (
        <motion.span
            ref={charRef}
            className="inline-block origin-bottom transition-all duration-75 ease-out"
            style={{
                fontWeight: fontWeight,
                y: yOffset,
                opacity: opacity,
                scale: scale,
                color: proximity > 0.6 ? '#fff' : 'rgba(255,255,255,0.7)',
                textShadow: proximity > 0.8 ? '0 0 15px rgba(255,255,255,0.6)' : 'none'
            }}
        >
            {char}
        </motion.span>
    );
}
