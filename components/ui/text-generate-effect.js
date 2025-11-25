import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
    words,
    className,
    filter = true,
    duration = 0.5,
    staggerDelay = 0.2,
    splitByPipe = false,
}) => {
    const [scope, animate] = useAnimate();

    let wordsArray = splitByPipe ? words.split("|") : words.split(" ");

    useEffect(() => {
        animate(
            "span",
            {
                opacity: 1,
                filter: filter ? "blur(0px)" : "none",
            },
            {
                duration: duration ? duration : 1,
                delay: stagger(staggerDelay),
            }
        );
    }, [scope.current]);

    const renderWords = () => {
        return (
            <motion.div ref={scope}>
                {wordsArray.map((word, idx) => {
                    return (
                        <motion.span
                            key={word + idx}
                            className={cn("opacity-0", filter ? "blur(10px)" : "none", splitByPipe ? "block" : "inline-block mr-2")}
                            style={{
                                filter: filter ? "blur(10px)" : "none",
                            }}
                        >
                            {word}
                        </motion.span>
                    );
                })}
            </motion.div>
        );
    };

    return (
        <div className={cn("font-bold", className)}>
            <div className="mt-4">
                <div className=" dark:text-white text-black text-2xl leading-snug tracking-wide">
                    {renderWords()}
                </div>
            </div>
        </div>
    );
};
