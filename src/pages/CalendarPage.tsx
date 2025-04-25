import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isToday,
  startOfMonth,
} from "date-fns";

import { cn } from "clsx-for-tailwind";

const CalendarPage = () => {
  const currentDate = new Date();
  const WEEKDAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const firstDayOfTheMonth = startOfMonth(currentDate);
  const lastDayOfTheMonth = endOfMonth(currentDate);
  const daysInTheMonth = eachDayOfInterval({
    start: firstDayOfTheMonth,
    end: lastDayOfTheMonth,
  });
  const firstDayIndex = getDay(firstDayOfTheMonth);
  const lastDayIndex = getDay(lastDayOfTheMonth);

  return (
    <div className="container mx-auto p-4">
      <article className="flex flex-row gap-4 justify-center pb-6 pt-12">
        <div>
          <img
            src="./right.svg"
            alt="left chevron"
            className="w-5 rotate-180"
          />
        </div>
        <div>
          <h2 className="">{format(currentDate, "MMMM, yyyy")}</h2>
        </div>
        <div>
          <img src="./right.svg" alt="right chevron" className="w-5" />
        </div>
      </article>
      <section className="grid grid-cols-7 gap-2">
        {WEEKDAYS.map((day) => {
          return (
            <div key={day} className="font-bold text-center">
              {day}
            </div>
          );
        })}
        {Array.from({ length: firstDayIndex - 1 }).map((_, index) => {
          return (
            <div
              key={index}
              className="border rounded-md p-4 text-center"
            ></div>
          );
        })}
        {daysInTheMonth.map((day, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                console.log("clicked index: ", index);
              }}
              className={cn(
                "border rounded-md p-6 text-center hover:border-orange-700 hover:text-orange-700",
                {
                  "bg-orange-100": isToday(day),
                  "text-orange-700": isToday(day),
                }
              )}
            >
              {format(day, "d")}
            </div>
          );
        })}
        {Array.from({ length: lastDayIndex + 1 }).map((_, index) => {
          return (
            <div
              key={index}
              className="border rounded-md p-4 text-center"
            ></div>
          );
        })}
      </section>
    </div>
  );
};

export default CalendarPage;
