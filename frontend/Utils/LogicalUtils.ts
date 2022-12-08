export class LogicalUtils {
  static getAllMonthNames = () => {
    const allMonthNames: String[] = [];
    for (let monthNum = 1; monthNum < 13; monthNum++) {
      const monthName = new Date(`0${monthNum}/05/2022`).toLocaleDateString(
        [],
        {
          month: "long",
        }
      );
      allMonthNames.push(monthName);
    }
    return allMonthNames;
  };
}
