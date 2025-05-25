import { differenceInSeconds } from "date-fns";

export const capitalise = (str: string) => {
  return str
    .split("")
    .map(
      (word) => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
    )
    .join("");
};

export const countDown = (date: string) => {
  let delta = differenceInSeconds(new Date(date), new Date());
  if (delta < 0) {
    return "This event has already happened.";
  }
  // calculate (and subtract) whole days
  var days = Math.floor(delta / 86400);
  delta -= days * 86400;

  // calculate (and subtract) whole hours
  var hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  // calculate (and subtract) whole minutes
  var minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  // what's left is seconds
  //var seconds = delta % 60; // in theory the modulus is not required

  return `Event in ${days} days ${hours} hours ${minutes} minutes`;
};
