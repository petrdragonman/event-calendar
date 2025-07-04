import * as z from "zod";

export const schema = z.object({
  id: z.coerce.number().min(1).catch(0),
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
