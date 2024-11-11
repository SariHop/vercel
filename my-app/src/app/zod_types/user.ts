import { z } from 'zod';

// Define the schema with transformation for dateOfBirth
export const schema = z.object({
    firstName: z.string().min(2, { message: "String must contain at least 2 character(s)" }),
    lastName: z.string().min(2, { message: "String must contain at least 2 character(s)" }),
    idNumber: z.string().min(9, { message: "String must contain at least 9 character(s)" }),
    dateOfBirth: z.date().transform((str) => new Date(str)).refine((date) => date < new Date(), {
      message: "Date of Birth must be in the past",
    }),
    email: z.string().email({ message: "Invalid email" }),
  });

export type FormData = z.input<typeof schema>;