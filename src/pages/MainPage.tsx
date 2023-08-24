import { Suspense, lazy } from "react"

import MainIntro from "@/components/main-intro"
import Loading from "@/components/loading"

// DYNAMIC IMPORTS
const AdvantagesSection = lazy(() => import("@/components/AdvantagesSection"))
const CEOWordsSection = lazy(() => import("@/components/ceo-words"))
const CreditCardIntro = lazy(() => import("@/components/credit-intro-section"))


const MainPage = () => {
    return (
        <>
            <MainIntro />
            <Suspense fallback={<Loading />}>
                <CreditCardIntro />
                <CEOWordsSection />
                <AdvantagesSection />
            </Suspense>
        </>
    )
}

export default MainPage