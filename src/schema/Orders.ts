import { z } from "zod"
import validator from "validator"

export const OrdersValidation = z.object({
    name: z.string()
        .min(2, { message: "Please enter a valid name" }),
    phone: z.string()
        .length(10)
        .refine(validator.isMobilePhone),
    email: z.string().email(),
    address: z.string()
        .min(10, { message: "Please enter full address and enter details as much as you can." }),
    pinCode: z.string().transform((val) => {
        if (val.length !== 6) throw new Error("Please enter correct PIN Code.")
        return parseInt(val, 10);
    })
})