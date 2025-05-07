import { useForm } from "react-hook-form";
import { EventFormData, schema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

interface EventFormProps {
  onSubmit: (data: EventFormData) => unknown;
  existingData?: EventFormData;
  onCancel: () => void;
}

const EventForm = ({ onSubmit, existingData, onCancel }: EventFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<EventFormData>({
    resolver: zodResolver(schema),
    defaultValues: existingData || {},
  });

  useEffect(() => {
    reset(existingData || {});
  }, [existingData, reset]);

  // if (!existingData) {
  //   console.log("UPDATE and display time to go");
  // } else {
  //   console.log("CREATE");
  // }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {existingData ? "Edit Event" : "Create New Event"}
      </h2>

      <div className="space-y-4">
        {/* Event ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event ID
          </label>
          <input
            type="text"
            {...register("eventId")}
            className={`w-sm px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
              errors.eventName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter event ID"
          />
          {errors.eventId && (
            <small className="text-red-500 text-xs mt-1 block">
              {errors.eventId.message}
            </small>
          )}
        </div>
        {/* Event Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Name
          </label>
          <input
            type="text"
            {...register("eventName")}
            className={`w-sm px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
              errors.eventName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter event name"
          />
          {errors.eventName && (
            <small className="text-red-500 text-xs mt-1 block">
              {errors.eventName.message}
            </small>
          )}
        </div>
        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            {...register("startDate")}
            className={`w-sm px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
              errors.startDate ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.startDate && (
            <small className="text-red-500 text-xs mt-1 block">
              {errors.startDate.message}
            </small>
          )}
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            {...register("endDate")}
            className={`w-sm px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
              errors.endDate ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.endDate && (
            <small className="text-red-500 text-xs mt-1 block">
              {errors.endDate.message}
            </small>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            {...register("location")}
            className={`w-sm px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
              errors.location ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter location"
          />
          {errors.location && (
            <small className="text-red-500 text-xs mt-1 block">
              {errors.location.message}
            </small>
          )}
        </div>

        {/* Label */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Label
          </label>
          <input
            type="text"
            {...register("label")}
            className={`w-sm px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
              errors.label ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter label (e.g., Conference, Meeting)"
          />
          {errors.label && (
            <small className="text-red-500 text-xs mt-1 block">
              {errors.label.message}
            </small>
          )}
        </div>
        {/* Cancel Button */}
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          Cancel
        </button>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-sm mt-6 bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          {existingData ? "Update Event" : "Create Event"}
        </button>
      </div>
    </form>
  );
};

export default EventForm;

// import { useForm } from "react-hook-form";
// import { EventFormData, schema } from "./schema";
// import { zodResolver } from "@hookform/resolvers/zod";

// interface EventFormProps {
//   onSubmit: () => unknown;
// }
// const EventForm = ({ onSubmit }: EventFormProps) => {
//   const {
//     handleSubmit,
//     register,
//     formState: { errors },
//   } = useForm<EventFormData>({
//     resolver: zodResolver(schema),
//   });

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <article>
//         <label>Event Name</label>
//         <input
//           className="border-2 border-amber-400 focus:border-orange-700"
//           type="text"
//           {...register("eventName")}
//         />
//         {errors.eventName && <small>{errors.eventName.message}</small>}
//       </article>
//       <article>
//         <label> Start Date</label>
//         <input type="text" {...register("startDate")} />
//         {errors.startDate && <small>{errors.startDate.message}</small>}
//       </article>
//       <article>
//         <label>End Date</label>
//         <input type="text" {...register("endDate")} />
//         {errors.endDate && <small>{errors.endDate.message}</small>}
//       </article>
//       <article>
//         <label>Location</label>
//         <input type="text" {...register("location")} />
//         {errors.location && <small>{errors.location.message}</small>}
//       </article>
//       <article>
//         <label>Label</label>
//         <input type="text" {...register("label")} />
//         {errors.label && <small>{errors.label.message}</small>}
//       </article>
//     </form>
//   );
// };

// export default EventForm;
