
import { Link, useNavigate } from "react-router-dom";

import { useMediaQuery } from "usehooks-ts";

import {
    GithubIcon,
    LinkedinIcon,
    LucideIcon,
    TwitterIcon,
    SidebarOpenIcon
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";


type socialLinksDataTypes = {
    link: string;
    icon: LucideIcon;
    id: number;
    title: string
};

const socialLinksData: Array<socialLinksDataTypes> = [
    {
        id: 1,
        link: "https://github.com/rohitmondal03/SpeND",
        icon: GithubIcon,
        title: "Github",
    },
    {
        id: 2,
        link: "https://twitter.com/RohitMo62534745",
        icon: TwitterIcon,
        title: "Twitter",
    },
    {
        id: 3,
        link: "https://www.linkedin.com/in/rohit-mondal-61662a16b/",
        icon: LinkedinIcon,
        title: "LinkedIn",
    },
];

const Footer = () => {
    const navigate = useNavigate();

    const mediaQuery = useMediaQuery(`(max-width: 410px)`)


    return (
        <>
            <Separator orientation="horizontal" className="h-[1px] bg-zinc-500" />

            <footer className="flex sm:flex-row items-center justify-between md:justify-around px-10 py-8">
                <div className="flex flex-col items-center justify-center gap-y-2">
                    <h1
                        className="sm:text-4xl text-2xl underline font-bold cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        SpeND
                    </h1>

                    <p className="text-xs text-zinc-500">&copy;Rohit Mondal, 2023</p>
                </div>

                <ul className={`md:flex text-md md:items-center md:gap-x-4 md:justify-center hidden `}>
                    <Link
                        to={`/new-credit-card`}
                        className="hover:text-pink-500 transition-all"
                    >
                        Credit Card
                    </Link>

                    <Link
                        to={`/rewards`}
                        className="hover:text-pink-500 transition-all"
                    >
                        Rewards
                    </Link>
                </ul>

                <div className={`md:flex hidden md:items-center md:gap-x-4 md:justify-center`}>
                    {socialLinksData.map((items: socialLinksDataTypes) => (
                        <Link
                            key={items.id}
                            to={items.link}
                            target="_blank"
                        >
                            <items.icon size={20} className="hover:scale-150 hover:rotate-12 transition-all" />
                        </Link>
                    ))}
                </div>


                <Sheet>
                    <SheetTrigger className="md:hidden block">
                        <SidebarOpenIcon size={35} />
                    </SheetTrigger>

                    <SheetContent className={`${mediaQuery ? "py-8 px-2" : "py-12"}`}>
                        <SheetHeader>
                            <SheetTitle className={`${mediaQuery ? "text-4xl" : "text-5xl"} text-center`}>
                                Spend
                            </SheetTitle>
                        </SheetHeader>

                        <Separator className={`${mediaQuery ? "my-5" : "my-9"} h-[1px] bg-zinc-800 dark:bg-zinc-400 orientation="horizontal`} />

                        <div className="text-center space-y-10">
                            <h1 className={`${mediaQuery ? "text-xl" : "text-3xl"}`}>Social Links</h1>

                            <div className="flex flex-col gap-y-3">
                                {socialLinksData.map((items: socialLinksDataTypes) => (
                                    <Link
                                        key={items.id}
                                        to={items.link}
                                        target="_blank"
                                        className="rounded-2xl border-2 border-zinc-600 py-1 flex flex-row gap-x-5 text-lg justify-center items-center"
                                    >
                                        <items.icon />
                                        <p className={`${mediaQuery ? "text-sm" : "text-xl"}`}>{items.title}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </footer>
        </>
    );
};

export default Footer;