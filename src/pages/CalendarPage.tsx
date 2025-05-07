import {
  addMonths,
  subMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isToday,
  startOfMonth,
  getDate,
} from "date-fns";

import { cn } from "clsx-for-tailwind";
import { useMemo, useState } from "react";
import Modal from "../components/modal/Modal";
import EventForm from "../components/EventForm/EventForm";
import { EventFormData } from "../components/EventForm/schema";
import EventCard from "../components/EventCard/EventCard";
import { EventData } from "../services/eventDataService";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [eventsData, setEventsData] = useState<EventData[]>([]);

  const WEEKDAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const firstDayOfTheMonth = startOfMonth(currentDate);
  const lastDayOfTheMonth = endOfMonth(currentDate);
  const daysInTheMonth = eachDayOfInterval({
    start: firstDayOfTheMonth,
    end: lastDayOfTheMonth,
  });
  const firstDayIndex = getDay(firstDayOfTheMonth);
  //const lastDayIndex = getDay(lastDayOfTheMonth);

  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleEventClick = (event: EventData) => {
    setSelectedDate(new Date(event.startDate));
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setSelectedEvent(null);
  };

  const handleEdit = () => {
    console.log("handle edit");
    setIsEditing(true);
  };

  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const goToPrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const onSubmit = (data: EventFormData) => {
    if (eventsData.filter((e) => e.eventId === data.eventId).length !== 0) {
      setEventsData((prevEvents) =>
        prevEvents.map((event) =>
          event.eventId === data.eventId ? data : event
        )
      );
    } else {
      setEventsData((prevEvents) => [...prevEvents, data]);
    }
    setIsModalOpen(false);
  };

  const eventsByDate = useMemo(() => {
    return eventsData.reduce((acc: { [key: string]: EventData[] }, event) => {
      const dateKey = format(event.startDate, "yyyy-MM-dd");
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(event);
      return acc;
    }, {});
  }, [eventsData]);

  const modalContent =
    selectedEvent && !isEditing ? (
      <div className="space-y-4">
        <h3 className="text-lg font-bold">{selectedEvent.eventName}</h3>
        <p>Start Date: {format(new Date(selectedEvent.startDate), "PPPP")}</p>
        <p>End Date: {format(new Date(selectedEvent.endDate), "PPPP")}</p>
        <p>Location: {selectedEvent.location}</p>
        <p>Label: {selectedEvent.label}</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
          >
            Edit
          </button>
          <button
            onClick={handleCloseModal}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    ) : (
      <EventForm
        onSubmit={onSubmit}
        existingData={selectedEvent || undefined}
        onCancel={() => {
          if (selectedEvent) {
            setIsEditing(false); // Switch back to view mode if editing
          } else {
            handleCloseModal(); // Close if creating new
          }
        }}
      />
    );

  return (
    <div className="container mx-auto p-4">
      <article className="flex flex-row gap-4 justify-center pb-6 pt-12">
        <div>
          <img
            src="./right.svg"
            alt="left chevron"
            className="w-5 rotate-180"
            onClick={goToPrevMonth}
          />
        </div>
        <div>
          <h2 className="text-xl">{format(currentDate, "MMMM, yyyy")}</h2>
        </div>
        <div>
          <img
            src="./right.svg"
            alt="right chevron"
            className="w-5"
            onClick={goToNextMonth}
          />
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
              // className="border rounded-md p-4 text-center"
            ></div>
          );
        })}
        {daysInTheMonth.map((day, index) => {
          const dateKey = format(day, "yyyy-MM-dd");
          const todaysEvents = eventsByDate[dateKey] || [];
          return (
            <div
              key={index}
              onClick={() => handleDayClick(day)}
              className={cn(
                "border rounded-md p-6 text-center h-20 hover:border-orange-700 hover:text-orange-700",
                {
                  "bg-orange-100": isToday(day),
                  "text-orange-700": isToday(day),
                }
              )}
            >
              {day.getDate()}
              {todaysEvents.map((event) => {
                return (
                  <EventCard
                    key={event.eventName}
                    event={event}
                    onClick={handleEventClick}
                  ></EventCard>
                );
              })}
            </div>
          );
        })}
        {/* {Array.from({ length: lastDayIndex + 1 }).map((_, index) => {
          return (
            <div
              key={index}
              className="border rounded-md p-4 text-center"
            ></div>
          );
        })} */}
      </section>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={
          selectedDate
            ? format(selectedDate, "EEEE, MMMM d, yyyy")
            : "Event Details"
        }
      >
        {modalContent}
      </Modal>
    </div>
  );
};

export default CalendarPage;
