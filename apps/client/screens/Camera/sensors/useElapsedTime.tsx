import { atom } from "jotai";
import { PrimitiveTimeAtom, TimeReading } from "./types";

export const elapsedTimeAtom = atom("00:00:00");
export const startTimeAtom = atom<TimeReading>(null) as PrimitiveTimeAtom;
export const endTimeAtom = atom<TimeReading>(null) as PrimitiveTimeAtom;
