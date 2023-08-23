import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


type dataProps = {
    id: string
    heading: string
    desc: string
}


const data: Array<dataProps> = [
    {
        id: "item-1",
        heading: "1. Seamless Convenience",
        desc: "Experience the ease of managing your finances with our user-friendly mobile app and online portal. Access your account, make payments, and track expenses effortlessly, all at your fingertips."
    },
    {
        id: "item-2",
        heading: "2. Enhanced Security",
        desc: "Your financial well-being is our top priority. Our advanced security features, including real-time transaction alerts and biometric authentication, ensure your peace of mind while using your credit card."
    },
    {
        id: "item-3",
        heading: "3. Tailored for You",
        desc: "We understand that everyone's financial needs are unique. That's why our credit card options offer customizable features, allowing you to choose rewards, benefits, and credit limits that align with your lifestyle."
    },
    {
        id: "item-4",
        heading: "4. Smart Rewards",
        desc: "Elevate your spending experience with our exclusive rewards program. Earn points on every purchase and redeem them for travel, cashback, or merchandise. It's your life, your rewards."
    },
    {
        id: "item-5",
        heading: "5. Financial Insights",
        desc: "Gain valuable insights into your spending patterns and financial habits. Our data-driven tools help you make informed decisions and achieve your financial goals faster."
    }
]



export default function AdvantagesAccordion() {
    return (
        <Accordion type="single" collapsible className="w-[90vw] md:w-[35vw]">
            {data.map((items: dataProps) => (
                <AccordionItem
                    key={items.id}
                    value={items.id}
                    className=""
                >
                    <AccordionTrigger className="dark:text-slate-400 sm:text-2xl font-semibold">
                        {items.heading}
                    </AccordionTrigger>

                    <AccordionContent className="text-sm sm:text-xl">
                        {items.desc}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}