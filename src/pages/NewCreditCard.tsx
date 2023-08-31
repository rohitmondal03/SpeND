import { Suspense, useEffect, useState } from "react";

import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

import { v4 as uuidv4 } from 'uuid';

import { motion } from "framer-motion";

import { Dialog, DialogTrigger, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import DialogForCreditCard from "../components/new-credit-card";
import SignInBtn from "../components/signin-btn";
import Loading from "@/components/loading";


const NewCreditCard = () => {
    const todayDate = new Date();
    const tomorrowDate = todayDate.setDate(todayDate.getDate() + 1);

    const [queryDate, setQueryDate] = useState<Date | undefined>(new Date(tomorrowDate))
    const [date, setDate] = useState<string | undefined>()

    const user = useUser();
    const userID = user?.id;

    const supabase = useSupabaseClient();



    const querySolvingSteps: Array<{ title: string }> = [
        {
            title: "Click on any date you want us to reach back to you.",
        },
        {
            title: "We'll process your date and one of our employee will get you back",
        },
        {
            title: "That's it !! You can then ask any query related to our services to our employee."
        },
    ]


    const queryListContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                staggerDirection: -1
            },
        },
    };

    const queryListVariants = {
        hidden: { opacity: 0, x: 300 },
        show: {
            opacity: 1, x: 0,
            transition: { duration: 0.6 }
        },
    };


    // QUERY SUBMITTED OR NOT
    const queryPopUp = async () => {
        const { error } = await supabase
            .from("Query")
            .insert({ QueryId: uuidv4() + userID, CustomerID: userID, queryDate: queryDate  })
        console.log(queryDate);
        

        if (error) {
            toast({
                title: "Some error !!",
                description: `Looks like you have already registered a query or not have not selected a date !!!`,
                action: (
                    <ToastAction altText="Close">Close</ToastAction>
                )
            })
        }
        else {
            toast({
                title: "Scheduled: Query Registered !!",
                description: `Dont worry, we'll get you back at ${date}`,
                action: (
                    <ToastAction altText="Close">Okay !!!</ToastAction>
                )
            })
        }
    }


    useEffect(() => {
        const monthArray = ["Jan", "Feb", "March", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

        // FOR CONVERTING MONTH'S NAME FROM NUMBER 
        const getMonthFromQueryDate = () => {
            const monthInString = monthArray[queryDate?.getMonth() as number]
            return monthInString;
        }

        // FOR GETTING DATE IN NUMBERS
        function fullDate() {
            const month = getMonthFromQueryDate();
            let date = queryDate?.getDate();
            const year = queryDate?.getFullYear();

            let fullDate;

            if (date === 1) fullDate = `${date}st ${month}, ${year}`
            else if (date === 2) fullDate = `${date}nd ${month}, ${year}`
            else if (date === 3) fullDate = `${date}rd ${month}, ${year}`
            else fullDate = `${date}th ${month}, ${year}`

            return fullDate;
        }
        if(queryDate === undefined) setDate("Please select a Date !!!")
        else setDate(fullDate())
    }, [queryDate])



    return (
        <section className="py-8 px-5 md:py-12 sm:px-8">
            <div className="flex flex-col md:flex-row-reverse items-center sm:px-10 md:py-20 sm:gap-x-16 sm:justify-between">
                <motion.div
                    className="flex flex-col items-center justify-center gap-y-6 md:gap-y-9"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.75 }}
                >
                    <h1
                        className={`md:text-6xl sm:text-4xl text-3xl text-center font-bold text-blue-500 dark:text-emerald-300`}
                    >
                        Seamless Spending, Boundless Rewards: Experience the Future of
                        Credit Cards Today!
                    </h1>

                    {!user ? (
                        <p className="text-lg sm:text-xl text-center dark:text-zinc-400">Sign In to get your Credit Card</p>
                    ) :
                        null
                    }

                    {user ? (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="font-bold text-md sm:text-lg md:text-xl py-6 bg-purple-600 hover:bg-purple-700 text-white">
                                    Order your Credit Card
                                </Button>
                            </DialogTrigger>
                            <DialogForCreditCard />
                        </Dialog>
                    ) : (
                        <SignInBtn />
                    )}
                </motion.div>
            </div>


            <Separator
                orientation="horizontal"
                className="h-[4px] bg-zinc-500 dark:bg-zinc-100 my-16"
            />

            <Suspense fallback={<Loading />}>
                <div className="flex flex-col md:flex-row items-center justify-around gap-y-12 md:gap-x-8">
                    <div className="font-bold">
                        <>
                            <h1 className="text-4xl text-center sm:text-5xl sm:text-left md:text-6xl text-orange-400">Have some Query ?</h1>
                            <p className="text-xl text-center sm:text-left md:text-2xl">Dont worry, we got your back...</p>
                        </>

                        <div className="flex flex-row mt-10 sm:gap-x-10">
                            <Separator
                                orientation="vertical"
                                className="bg-zinc-700 dark:bg-white w-[2px] h-[10] hidden sm:block"
                            />

                            <motion.ul
                                className="text-xl text-green-500 dark:text-zinc-300 list-disc sm:list-decimal py-3 md:py-1"
                                variants={queryListContainer}
                                initial={`hidden`}
                                whileInView={`show`}
                                viewport={{ once: true }}
                            >
                                {querySolvingSteps.map((items: { title: string }) => (
                                    <motion.li
                                        key={items.title}
                                        variants={queryListVariants}
                                    >
                                        {items.title}
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Calendar
                            mode="single"
                            selected={queryDate}
                            onSelect={setQueryDate}
                            className="border rounded-lg border-zinc-900 dark:border-zinc-200"
                            disabled={{ before: new Date(tomorrowDate) }}
                        />
                        <Alert className="text-center border border-zinc-900 dark:border-zinc-200">
                            <AlertTitle className="text-xl font-bold">Selected Date</AlertTitle>
                            <AlertDescription>{date}</AlertDescription>
                        </Alert>

                        {user ? (
                            <Button
                                className="w-full font-bold"
                                onClick={() => {
                                    queryPopUp();
                                }}
                            >
                                Submit
                            </Button>
                        ) : (
                            <SignInBtn className="w-full" />
                        )}
                    </div>
                </div>
            </Suspense>
        </section>
    );
};

export default NewCreditCard;