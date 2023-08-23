import { motion } from "framer-motion";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TextOpacityAnimations from "./text-opacity-animation.jsx";


const CEOWordsSection = () => {
    return (
        <div className="px-2 md:p-12">
            <motion.div
                className="flex flex-row gap-x-3 items-center justify-center mb-8"
                initial={{ opacity: 0, x: -200 }}
                transition={{
                    duration: 0.2,
                    delay: 0.2,
                    type: "spring",
                    stiffness: 200,
                }}
                whileInView={{ opacity: 1, x: 0 }}
            >
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <h1 className="text-md md:text-2xl font-bold text-emerald-500">
                    John Doe, Co-Founder and CEO -
                </h1>
            </motion.div>

            <TextOpacityAnimations
                text={` " At SpeND, we're driven by the vision of revolutionizing financial services through technology. Our mission is to empower individuals with innovative credit card solutions that offer security, customization, and valuable insights. We believe in a future where financial decisions are smarter and more accessible. As we embark on this journey, we invite investors to join us in shaping tomorrow's financial landscape. With your support, we'll accelerate our growth, expand our reach, and create lasting impact. Together, let's make finance a force for good. " `}
                className="text-xl sm:text-3xl md:text-[2.5rem] md:leading-tight font-semibold text-center leading-tight dark:text-zinc-300"
            />
        </div>
    );
};

export default CEOWordsSection;