import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";


export default function CreditCardIntro() {
    const animatedDiv = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: animatedDiv,
        offset: ["start end", "center center"],
        layoutEffect: false,
    });

    const headTextOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const headTextYPos = useTransform(scrollYProgress, [0, 1], [600, 0]);

    const imageOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const imageYPos = useTransform(scrollYProgress, [0, 1], [100, 0]);


    return (
        <div className="flex flex-row items-center justify-evenly py-20 sm:py-28 h-fit">
            <motion.div
                ref={animatedDiv}
                style={{ opacity: imageOpacity, y: imageYPos }}
                className="hidden md:block"
            >
                <img
                    src={`https://web-images.credcdn.in/_next/assets/images/home-page/phone/neopop-center.png`}
                    alt="image"
                    height={320}
                    width={320}
                    loading="eager"
                />
            </motion.div>

            <motion.h1
                className="text-center text-3xl py-6 px-4 sm:p-0 sm:text-5xl md:text-6xl text-pink-600 dark:text-pink-400 font-bold md:w-[40vw] -z-10"
                style={{ opacity: headTextOpacity, y: headTextYPos }}
            >
                Unlock Financial Freedom with Our Innovative Payments and Credit Card
                Services.
            </motion.h1>
        </div>
    );
}