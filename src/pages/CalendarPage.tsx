import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isToday,
  startOfMonth,
} from "date-fns";

import { cn } from "clsx-for-tailwind";
import { useState } from "react";
import Modal from "../components/modal/Modal";

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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
              onClick={() => handleDayClick(day)}
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
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : ""}
      >
        <div className="space-y-4">
          <p>Form here ...</p>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={handleCloseModal}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleCloseModal}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
            >
              Save Event
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CalendarPage;
