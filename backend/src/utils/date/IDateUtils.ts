export interface IDateUtils {
  getMsTimeFromISOdate(ISOdate: string): Promise<Number>;
  getDaysBetweenTwoTimes(
    firstTime: string,
    secondTime: string,
  ): Promise<Number>;
  getYearsBetweenTwoTimes(
    firstTime: string,
    secondTime: string,
  ): Promise<Number>;
}
