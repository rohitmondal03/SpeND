import { Link } from "react-router-dom"
import { useUser } from "@supabase/auth-helpers-react"

import { useMediaQuery } from "usehooks-ts"

import { MenuIcon } from "lucide-react"

import { ModeToggle } from "./mode-toggle"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import SignInBtn from "./signin-btn"
import SignOutBtn from "./signout-btn"


const listItemsClasses: string = "cursor-pointer transition-all duration-200 ease-out hover:scale-[125%] hover:text-red-600 dark:hover:text-amber-500"

type navListProps = {
    title: string,
    redirect: string,
}

const navList: Array<navListProps> = [
    {
        title: "Credit Card",
        redirect: "/new-credit-card"
    },
    {
        title: "Check Rewards",
        redirect: "/rewards"
    }
]


const Navbar = () => {
    const mediaQuery = useMediaQuery('(min-width: 875px)')

    const user = useUser();


    return (
        <nav className={`flex flex-row items-center justify-around py-8 px-0`}>
            <Link to={`/`}>
                <h1 className={`font-bold text-3xl dark:text-zinc-300 sm:text-5xl sm:underline transition-all duration-300 cursor-pointer hover:scale-110`}>SpeND</h1>
            </Link>

            {mediaQuery ? (
                <>
                    <ul className="flex items-center sm:text-lg justify-evenly sm:gap-x-12">
                        {navList.map((items: navListProps) => (
                            <Link to={items.redirect} key={items.redirect}>
                                <li className={listItemsClasses}>
                                    {items.title}
                                </li>
                            </Link>
                        ))}
                    </ul>

                    <div className={`flex sm:flex-row sm:text-xl items-center sm:gap-x-5`}>
                        {user ? (
                            <SignOutBtn />
                        ) : (
                            <SignInBtn />
                        )}
                        <ModeToggle />
                    </div>
                </>
            ) : (
                <div className="flex flex-row gap-x-8 items-center justify-center">
                    <ModeToggle />

                    <Sheet>
                        <SheetTrigger asChild>
                            <MenuIcon />
                        </SheetTrigger>


                        <SheetContent className="py-24">
                            <SheetHeader>
                                <SheetTitle className="text-5xl text-center">
                                    SpeND
                                </SheetTitle>
                            </SheetHeader>

                            <Separator className="my-7 h-1 bg-zinc-800 dark:bg-zinc-300" orientation="horizontal" />

                            <div className="flex flex-col items-center justify-center gap-y-6">
                                {navList.map((items: navListProps) => (
                                    <SheetClose key={items.title} asChild>
                                        <Link
                                            className={`${listItemsClasses} text-xl`}
                                            to={items.redirect}
                                        >
                                            {items.title}
                                        </Link>
                                    </SheetClose>
                                ))}
                                <SheetClose>
                                    {user ? (
                                        <SignOutBtn />
                                    ) : (
                                        <SignInBtn />
                                    )}
                                </SheetClose>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            )}
        </nav>
    )
}

export default Navbar