import { IsISO8601 } from 'class-validator';

export class GetMsTimeFromISOdate {
  constructor(ISOdate: string) {
    this.ISOdate = ISOdate;
  }
  
  @IsISO8601()
  ISOdate: string;
}

export class GetYearsBetweenTwoTimes {
  @IsISO8601()
  firstTime: string;

  @IsISO8601()
  secondTime: string;
}
