import * as z from "zod";

export const schema = z.object({
  eventId: z.coerce.number().min(1),
  eventName: z.string().min(1, { message: "Event name is required" }),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Invalid date",
  }),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Invalid date",
  }),
  location: z.string().min(1, { message: "Location is required" }),
  label: z.string().min(1, { message: "Location is required" }),
});

export type EventFormData = z.infer<typeof schema>;
