import { atom } from "jotai";
import { PrimitiveTimeAtom, TimeReading } from "./types";

/**
 * TODO: elapsedTimeAtom should depend on startTimeAtom
 */
export const elapsedTimeAtom = atom("00:00:00");
// export const elapsedTimeAtom = atom((get) => {
//   const startTime = get(startTimeAtom);
//   const start = startTime || Date.now();

//   const totalSeconds = Math.floor((Date.now() - start) / 1000);
//   const hours = Math.floor(totalSeconds / 3600);
//   const minutes = Math.floor((totalSeconds % 3600) / 60);
//   const seconds = totalSeconds % 60;

//   return `${hours.toString().padStart(2, "0")}:${minutes
//     .toString()
//     .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
// });
export const startTimeAtom = atom<TimeReading>(null) as PrimitiveTimeAtom;
export const endTimeAtom = atom<TimeReading>(null) as PrimitiveTimeAtom;
