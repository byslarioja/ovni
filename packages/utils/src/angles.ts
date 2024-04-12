import { SpaceType } from "types-sensors";

const RAD = 180 / Math.PI;

export const degToDMS = (deg: number, dplaces = 0) => {
  var d = Math.floor(deg);
  var m = Math.floor((deg - d) * 60);
  var s =
    Math.round(((deg - d) * 60 - m) * 60 * Math.pow(10, dplaces)) /
    Math.pow(10, dplaces);
  s == 60 && (m++, (s = 0));
  m == 60 && (d++, (m = 0));

  return d + "° " + m + "' " + s + '"';
};

export const spaceToAngle = (space: SpaceType) => {
  let angle = 0;
  if (space) {
    let { x, y, z } = space;
    if (Math.atan2(y, x) >= 0) {
      angle = Math.atan2(y, x) * RAD;
    } else {
      angle = (Math.atan2(y, x) + 2 * Math.PI) * RAD;
    }
  }

  return angle;
};

export const calculateDeviceRotation = (
  h: number,
  c1: number,
  c2: number,
  toFixed = 2
) => {
  const angle = Math.atan2(h, Math.sqrt(c1 * c1 + c2 * c2)) * RAD;

  return angle.toFixed(toFixed) + "°";
};
