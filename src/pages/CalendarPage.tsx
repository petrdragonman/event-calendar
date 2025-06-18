import {
  addMonths,
  subMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isToday,
  startOfMonth,
  addYears,
  subYears,
} from "date-fns";

import { cn } from "clsx-for-tailwind";
import { useEffect, useMemo, useState } from "react";
import Modal from "../components/modal/Modal";
import EventForm from "../components/EventForm/EventForm";
import { EventFormData } from "../components/EventForm/schema";
import EventCard from "../components/EventCard/EventCard";
import {
  createEvent,
  EventData,
  getAllEvents,
  updateEvent,
  deleteEvent,
} from "../services/eventDataService";
import { countDown } from "../components/EventForm/utils";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [eventsData, setEventsData] = useState<EventData[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const WEEKDAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const firstDayOfTheMonth = startOfMonth(currentDate);
  const lastDayOfTheMonth = endOfMonth(currentDate);
  const daysInTheMonth = eachDayOfInterval({
    start: firstDayOfTheMonth,
    end: lastDayOfTheMonth,
  });
  const firstDayIndex = getDay(firstDayOfTheMonth);

  useEffect(() => {
    getAllEvents()
      .then((events) => setEventsData(events))
      .catch((e) => console.log(e));
  }, []);

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
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedEvent) return;

    try {
      await deleteEvent(selectedEvent.id);
      setEventsData((prevEvents) =>
        prevEvents.filter((event) => event.id !== selectedEvent.id)
      );
      setIsDeleteModalOpen(false);
      handleCloseModal();
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const goToNextYear = () => {
    setCurrentDate(addYears(currentDate, 1));
  };

  const goToPrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const goToPrevYear = () => {
    setCurrentDate(subYears(currentDate, 1));
  };

  const onSubmit = async (data: EventFormData) => {
    if (eventsData.filter((e) => e.id === data.id).length !== 0) {
      const updatedEvent = await updateEvent(data.id, data);
      setEventsData((prevEvents) =>
        prevEvents.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event
        )
      );
    } else {
      const newEvent = await createEvent(data);
      setEventsData((prevEvents) => [...prevEvents, newEvent]);
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
        <h2 className="text-orange-600 font-bold ">
          {countDown(selectedEvent.startDate)}
        </h2>
        <p>Start Date: {format(new Date(selectedEvent.startDate), "PPPP")}</p>
        <p>End Date: {format(new Date(selectedEvent.endDate), "PPPP")}</p>
        <p>Location: {selectedEvent.location}</p>
        <p>Label: {selectedEvent.label}</p>

        <div className="flex justify-between">
          <section className="flex justify-start space-x-2 gap-2">
            <button
              onClick={handleDeleteClick}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </section>
          <section className="flex justify-end space-x-2 gap-2">
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
          </section>
        </div>
      </div>
    ) : (
      <EventForm
        onSubmit={onSubmit}
        existingData={selectedEvent || undefined}
        onCancel={() => {
          if (selectedEvent) {
            setIsEditing(false);
          } else {
            handleCloseModal();
          }
        }}
      />
    );

  return (
    <div className="container mx-auto p-4">
      <article className="flex flex-row gap-4 justify-center pb-6 pt-12">
        <div>
          <img
            src="./double-right.svg"
            alt="double left chevron"
            className="w-5 rotate-180"
            onClick={goToPrevYear}
          />
        </div>
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
        <div>
          <img
            src="./double-right.svg"
            alt="double right chevron"
            className="w-5"
            onClick={goToNextYear}
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
                    key={event.id}
                    event={event}
                    onClick={handleEventClick}
                  ></EventCard>
                );
              })}
            </div>
          );
        })}
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
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
      >
        <div className="space-y-4">
          <p>
            Are you sure you want to delete "{selectedEvent?.eventName}" event?
          </p>
          <div className="flex justify-end space-x-2 gap-2">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CalendarPage;
