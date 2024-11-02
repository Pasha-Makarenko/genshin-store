export default class Utils {
  static strFormatter: (str: unknown) => string = str =>
    str ? str.toString().toLowerCase().trim() : ""

  static capitalize: (str: unknown) => string = str =>
    Utils.strFormatter(str)
      .split(" ")
      .map(
        substr =>
          Utils.strFormatter(substr).charAt(0).toUpperCase() +
          Utils.strFormatter(substr).slice(1)
      )
      .join(" ")

  static idToStr: (str: unknown) => string = str =>
    Utils.strFormatter(str).split("-").join(" ")

  static strIncludes: (str: unknown, search: unknown) => boolean = (
    str,
    search
  ) => Utils.strFormatter(str).includes(Utils.strFormatter(search))

  static arrayOfStrIncludes: (arr: Array<unknown>, search: unknown) => boolean =
    (arr, search) => !!arr.find(str => Utils.strIncludes(str, search))

  static strToID: (str: unknown) => string = str =>
    Utils.strFormatter(str)
      .split(" ")
      .map(substr => Utils.strFormatter(substr).split("'").join("-"))
      .join("-")

  static arrRemoveItems: <T>(
    arr: Array<T>,
    callback: (item: T, i?: number, arr?: Array<T>) => boolean
  ) => Array<T> = (arr, callback) => {
    const newArr = [...arr]

    for (let i = 0; i < newArr.length; i++) {
      if (callback(newArr[i], i, newArr)) {
        newArr.splice(i, 1)
      }
    }

    return newArr
  }
}
