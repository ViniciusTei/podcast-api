import { hoursToSeconds, minutesToSeconds } from 'date-fns';

// get a string in the format 00:00:00 and converts to seconds
export default function timeStringToSeconds(timeString: string): number {
  const timeSplit = timeString.split(':');
  if (timeSplit.length > 1) {
    const hours = parseInt(timeString.split(':')[0], 10);
    const minutes = parseInt(timeString.split(':')[1], 10);
    const seconds = parseInt(timeString.split(':')[2], 10);

    const timeToSeconds = hoursToSeconds(hours) + minutesToSeconds(minutes) + seconds;

    return timeToSeconds;
  }
  return parseInt(timeString, 10);
}
