import { useRef } from 'react'

import { motion, useScroll, useTransform } from 'framer-motion';

import { Separator } from '@/components/ui/separator';
import AdvantagesAccordion from './advantages-accordion';



const AdvantagesSection = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null)

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "center center"]
    });

    const headingXPos = useTransform(scrollYProgress, [0, 1], [-100, 0]);
    const headingOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);


    return (
        <motion.section
            ref={sectionRef}
            className='px-6 py-16 md:py-0 md:h-screen flex flex-col md:flex-row items-center justify-between gap-x-10'
        >
            <motion.h1
                className={`text-3xl sm:text-5xl text-center md:text-left md:text-6xl py-8 text-blue-600 font-bold `}
                style={{ x: headingXPos, opacity: headingOpacity }}
            >
                Smart Credit Cards, Smarter Choices: Explore the Advantages
            </motion.h1>

            <motion.div
                initial={{ opacity: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                whileInView={{ opacity: 1 }}
            >
                <h1 className={`text-xl md:text-4xl`}>Why to choose our services ?</h1>
                <Separator orientation='horizontal' className='sm:mb-8 mt-2 h-2' />
                <AdvantagesAccordion />
            </motion.div>
        </motion.section>
    )
}

export default AdvantagesSection;