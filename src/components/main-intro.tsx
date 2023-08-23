import { useUser } from "@supabase/auth-helpers-react";

import { useMediaQuery } from "usehooks-ts";

import { motion } from "framer-motion";

import HeroAnimation from "./hero-animation";
import SignInBtn from "./signin-btn";


const MainIntro = () => {
    const mediaQuery = useMediaQuery('(min-width: 962px)');

    const user = useUser();


    return (
        <motion.section
            className={`max-w-7xl w-full px-8 py-20 flex ${!mediaQuery ? "flex-col gap-y-10 text-center" : "flex-row gap-x-10 text-left"} items-center justify-center mx-auto`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
        >
            <div className="md:w-[100%]">
                <span className="block mb-4 text-md md:text-xl text-indigo-500 font-semibold">
                    Changing everyday finance...
                </span>
                <h3 className="text-5xl md:text-6xl font-semibold dark:text-gray-200">
                    Welcome to <span className={`underline text-rose-500`}>SpeND</span>
                </h3>
                <p className="text-base md:text-lg dark:text-zinc-400 text-slate-800 my-4 md:my-6">
                    Welcome to SpeND, where we're redefining the way you experience credit cards. Say goodbye to the conventional and embrace the future of financial possibilities. Our cutting-edge credit card services are designed to empower you with flexibility, security, and rewards like never before.
                </p>

                {!user ? (
                    <SignInBtn />
                ) : (
                    null
                )}
            </div>

            <HeroAnimation />
        </motion.section>
    );
};


export default MainIntro;