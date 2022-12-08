import { validate } from 'class-validator';
import { GetMsTimeFromISOdate } from './DateUtilsValidators';
import { IDateUtils } from './IDateUtils';

class DateUtils implements IDateUtils {
  async getMsTimeFromISOdate(ISOdate: string) {
    const ISOdateToValidate = new GetMsTimeFromISOdate(ISOdate);
    const validation = await validate(ISOdateToValidate);
    if (validation.length > 0) throw validation[0];
    return new Date(ISOdate).getTime();
  }

  async getDaysBetweenTwoTimes(firstTime: string, secondTime: string) {
    const firstTimeInMs = await this.getMsTimeFromISOdate(firstTime);
    const secondTimeInMs = await this.getMsTimeFromISOdate(secondTime);
    const differenceBetweenTwoDatesInMs = Math.abs(
      secondTimeInMs - firstTimeInMs,
    );
    const daysBetweenTwoDates = Math.floor(
      differenceBetweenTwoDatesInMs / (1000 * 60 * 60 * 24),
    );
    return daysBetweenTwoDates;
  }

  async getYearsBetweenTwoTimes(firstTime: string, secondTime: string) {
    const daysBetweenTwoDates = await this.getDaysBetweenTwoTimes(
      firstTime,
      secondTime,
    );
    const yearsBetweenTwoDates = Math.floor(daysBetweenTwoDates / 365);
    return yearsBetweenTwoDates;
  }
}

export const dateUtils = new DateUtils();
