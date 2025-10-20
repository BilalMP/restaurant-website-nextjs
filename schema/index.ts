import * as z from "zod";

export const reserveTableFormSchema = z.object({
    fullName: z.string()
        .min(1, { message: "Full name should be at least 1 character" })
        .max(20, { message: "Full name should be at most 20 characters" }),

    email: z.string()
        .email({ message: "Invalid email address" }),

    phoneNumber: z.string()
        .min(7, { message: "Phone number should be at least 7 characters" })
        .max(15, { message: "Phone number should be at most 15 characters" }),

    numberOfGuests: z.number({ message: "Please enter the number of guests" })
        .min(1, { message: "Please enter the number of guests" })
        .max(10, { message: "Please enter a number between 1 and 10" }),

    date: z.date({
        message: "Please select a date for your reservation",
    }).refine((date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
    }, { message: "Please select a date that is today or in the future" }),

    time: z.string({ message: "Please select a time for your reservation" })
        .min(1, { message: "Please select a time for your reservation" })
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Please enter a valid time format (HH:MM)" }),

    specialRequests: z.string({ message: "Please enter your special requests" })
        .min(1, { message: "Please enter your special requests" })
        .max(300, { message: "Special requests should be at most 300 characters" }),
})