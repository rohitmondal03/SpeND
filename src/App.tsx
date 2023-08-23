import { useEffect } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"

import Lenis from '@studio-freight/lenis'

import MainPage from "./pages/MainPage"
import Rewards from "./pages/Rewards"
import Signin from "./pages/Signin"
import NewCreditCard from "./pages/NewCreditCard"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { Toaster } from "@/components/ui/toaster"

import "./App.css"


function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}


export default function App() {

    useEffect(() => {
        const lenis = new Lenis();

        // @ts-ignore
        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
    }, [])


    return (
        <BrowserRouter>
            <ScrollToTop />
            <Navbar />
            <Routes>
                <Route index element={<MainPage />} />
                <Route path="/rewards" element={<Rewards />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/new-credit-card" element={<NewCreditCard />} />
            </Routes>
            <Footer />
            <Toaster />
        </BrowserRouter>
    )
}