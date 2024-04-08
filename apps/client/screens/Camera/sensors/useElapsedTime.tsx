import { atom } from "jotai";
import { PrimitiveTimeAtom, TimeAtomValue } from "./types";

export const elapsedTimeAtom = atom("00:00:00");
export const startTimeAtom = atom<TimeAtomValue>(null) as PrimitiveTimeAtom;
export const endTimeAtom = atom<TimeAtomValue>(null) as PrimitiveTimeAtom;
