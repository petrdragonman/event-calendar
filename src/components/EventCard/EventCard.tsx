import { EventData } from "../../services/eventDataService";

interface EventCardProps {
  event: EventData;
  onClick?: (event: EventData) => void;
}

const EventCard = ({ event, onClick }: EventCardProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.(event);
  };
  return (
    <div
      className="text-xs p-1 mt-1 bg-orange-50 rounded cursor-pointer hover:bg-orange-100"
      onClick={handleClick}
    >
      {event.eventName}
    </div>
  );
};

export default EventCard;
