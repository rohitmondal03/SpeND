import { ChangeEvent, useCallback, useState } from "react";

import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

// import { faker } from "@faker-js/faker"

import { v4 as uuidv4 } from "uuid";

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { OrdersValidation } from "@/schema/Orders";


type customerDetailsType = {
    name: string
    email: string
    phone: string
    address: string
    pinCode: string
}


type orderDetailsType = z.infer<typeof OrdersValidation>


const errorClasses = "text-red-500 text-sm"



export default function DialogForCreditCard() {
    const { toast } = useToast();

    const user = useUser();
    const supabase = useSupabaseClient();

    const userID = user?.id;


    const [customerDetails, setCustomerDetails] = useState<customerDetailsType>({
        name: "",
        phone: "",
        email: String(user?.email),
        address: "",
        pinCode: ""
    })

    const {
        register,
        formState: { errors }
    } = useForm<orderDetailsType>({
        resolver: zodResolver(OrdersValidation)
    })


    // ORDER SUBMIT POP UP
    const toastPop = useCallback(async () => {
        const { error } = await supabase
            .from("Order")
            .insert({
                OrderID: uuidv4() + userID,
                CustomerName: customerDetails.name,
                CustomerEmail: customerDetails.email,
                CustomerAddress: customerDetails.address,
                CustomerPh: customerDetails.phone,
                CustomerID: userID,
            })

        if (error) {
            toast({
                title: "Already ordered !!",
                description: "You have already ordered your Credit Card.",
                action: (
                    <ToastAction altText="Undo">Close</ToastAction>
                ),
            })
        } else {
            toast({
                title: "Ordered !!",
                description: "Thanks for ordering Credit Card from us. Your Credit Card will be delivered in the given address.",
                action: (
                    <ToastAction altText="Undo">Undo</ToastAction>
                ),
            })
        }

    }, [])



    return (
        <DialogContent className="border-black dark:border-white border">
            <DialogHeader>
                <DialogTitle>Order a new Credit Card</DialogTitle>
                <DialogDescription>
                    Enter your profile details and order your Credit Card.
                </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
                <Alert className="text-sm border-zinc-500 text-red-600 dark:text-red-500">As of now, we can only provide one credit card to each customer, so please fill the details carefully.</Alert>

                <>
                    <div className="flex flex-row items-center gap-x-4">
                        <Label htmlFor="name" className="text-right text-sm">
                            Name
                        </Label>
                        <Input
                            {...register("name")}
                            value={customerDetails.name}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setCustomerDetails({
                                    ...customerDetails,
                                    name: e.target.value
                                })
                            }
                            id="name"
                            placeholder="Your Name"
                            className="col-span-3"
                            autoComplete="off"
                        />
                    </div>
                    {errors.name && (
                        <p className={errorClasses}>
                            {errors.name.message}
                        </p>
                    )}
                </>

                <Separator />

                <>
                    <div className="flex flex-row justify-center items-center gap-4">
                        <Label htmlFor="phone" className="text-right text-sm">
                            Phone
                        </Label>
                        <Input
                            {...register("phone")}
                            value={customerDetails.phone}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setCustomerDetails({
                                    ...customerDetails,
                                    phone: e.target.value
                                })
                            }
                            id="phone"
                            placeholder="Your phone number"
                            className="col-span-3"
                            autoComplete="off"
                        />
                    </div>
                    {errors.phone && (
                        <p className={errorClasses}>{errors.phone.message}</p>
                    )}
                </>

                <Separator />

                <>
                    <div className="flex flex-row justify-center items-center gap-4">
                        <Label htmlFor="email" className="text-right text-sm">
                            Email
                        </Label>
                        <Input
                            {...register("email")}
                            value={customerDetails.email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setCustomerDetails({
                                    ...customerDetails,
                                    email: e.target.value
                                })
                            }
                            id="email"
                            placeholder="Your Email-ID"
                            className="col-span-3"
                            autoComplete="off"
                        />
                    </div>
                    {errors.email && (
                        <p className={errorClasses}>{errors.email.message}</p>
                    )}
                </>

                <Separator />

                <>
                    <div className="flex flex-row justify-center items-center gap-4">
                        <Label htmlFor="address" className="text-right text-sm">
                            Address
                        </Label>
                        <Textarea
                            {...register("address")}
                            value={customerDetails.address}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                setCustomerDetails({
                                    ...customerDetails,
                                    address: e.target.value
                                })
                            }
                            id="address"
                            placeholder="Your full Shipping Address with PIN"
                            className="col-span-3"
                        />
                    </div>
                    {errors.address && (
                        <p className={errorClasses}>{errors.address.message}</p>
                    )}
                </>
            </div>

            <DialogFooter>
                {/* SUBMIT BUTTON */}
                <Button
                    className="font-bold transition-all hover:scale-110"
                    onClick={() => {
                        toastPop();
                    }}
                >
                    Order Credit Card
                </Button>
            </DialogFooter>
        </DialogContent >
    );
};
