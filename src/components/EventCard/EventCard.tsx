import { EventFormData } from "../EventForm/schema";

interface EventCardProps {
  event: EventFormData;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <section className="border-1 border-solid border-orange-300 rounded-md ">
      {event.eventName}
    </section>
  );
};

export default EventCard;
