import intersection from "ramda/src/intersection"

export const getCommonKeys = (obj1, ob2) => {
  if (!obj1 || !ob2) {
    return []
  }
  return intersection(Object.keys(obj1), Object.keys(ob2))
}
