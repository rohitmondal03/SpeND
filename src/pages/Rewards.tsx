import { useUser } from "@supabase/auth-helpers-react";

import { useMediaQuery } from "usehooks-ts";

import { motion } from "framer-motion";

import { Separator } from "@/components/ui/separator";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import SignInBtn from "@/components/signin-btn";


type listDataForRewardsTypes = {
    id: number
    title: string
}

const listDataForRewards: listDataForRewardsTypes[] = [
    {
        id: 1,
        title: "Travel more with earned points: Explore, journey, and wanderlust fulfilled"
    },
    {
        id: 2,
        title: "Cashback on spend: Shop, save, and reap rewards on purchases"
    },
    {
        id: 3,
        title: "Instant discounts: Swipe, smile, and enjoy instant savings everywhere"
    },
    {
        id: 4,
        title: "Luxury rewards: Elevate, indulge, and treat yourself to exceptional experiences"
    },
    {
        id: 5,
        title: "Exclusive deals: Perks, discounts, and privileges for our valued customers"
    }
]


const listContainerVariant = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};


const listItemVariant = {
    hidden: { opacity: 0, x: 300 },
    show: {
        opacity: 1, x: 0,
        transition: { duration: 0.6 }
    },
};



const Rewards = () => {
    const mediaQuery = useMediaQuery(`(min-width: 640px)`);

    const user = useUser();


    return (
        <section className="pt-16 pb-10 px-7 sm:px-16 flex flex-col gap-y-8 sm:gap-y-12 items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-y-8">
                <motion.h1
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    animate={{ opacity: 1 }}
                    className="text-3xl sm:text-5xl text-center font-bold text-pink-500 dark:text-amber-500"
                >
                    Check out rewards for using our credit card services
                </motion.h1>
            </div>


            <div className="flex flex-row sm:gap-x-16">
                {!mediaQuery ? (
                    null
                ) : (
                    <Separator
                        orientation="vertical"
                        className="bg-zinc-700 dark:bg-white w-[2px] h-[12]"
                    />
                )}

                <motion.ul
                    className="flex flex-col font-bold gap-y-5 sm:gap-y-3 py-5 text-xl list-disc sm:list-decimal"
                    variants={listContainerVariant}
                    initial="hidden"
                    animate="show"
                >
                    {listDataForRewards.map((items: listDataForRewardsTypes) => (
                        <motion.li
                            key={items.id}
                            variants={listItemVariant}
                        >
                            {items.title}
                        </motion.li>
                    ))}
                </motion.ul>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-center justify-center"
            >
                <Card className="sm:w-2/3 p-2 sm:p-5 border-black dark:border-zinc-200">
                    <CardHeader className="flex flex-col items-center justify-center">
                        <h1 className="text-sm sm:text-xl text-black dark:text-zinc-300">Smart credit cards with split-card flexibility for spending and saving. Biometric security, real-time alerts. Tailored rewards. Insights-driven app. Contactless payments. Global acceptance. Empower your finances with us.</h1>
                    </CardHeader>

                    {!user ? (
                        <CardFooter>
                            <SignInBtn className="mx-auto" />
                        </CardFooter>
                    ) : (
                        null
                    )}
                </Card>
            </motion.div>
        </section>
    );
};

export default Rewards;