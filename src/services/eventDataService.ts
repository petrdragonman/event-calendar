export interface EventData {
  id: number;
  eventName: string;
  startDate: string;
  endDate: string;
  location: string;
  label: string;
}

const EC2_BASE_URL =
  "http://ec2-13-211-209-251.ap-southeast-2.compute.amazonaws.com:8080/";

export const getAllEvents = async () => {
  const response = await fetch(EC2_BASE_URL + "events");
  if (!response.ok) {
    throw new Error("Failed to fetch.");
  }
  return (await response.json()) as EventData[];
};

export const deleteEvent = async (id: number) => {
  try {
    const response = await fetch(EC2_BASE_URL + "events/" + id, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete item");
    }
  } catch (error) {
    console.error("Error deleting item: ", error);
  }
};

export const createEvent = async (data: EventData) => {
  const response = await fetch(EC2_BASE_URL + "events", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to create new Event");
  }
  return (await response.json()) as EventData;
};

export const updateEvent = async (id: number, data: any) => {
  const response = await fetch(EC2_BASE_URL + "events/" + id, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to update");
  }
  return (await response.json()) as EventData;
};
