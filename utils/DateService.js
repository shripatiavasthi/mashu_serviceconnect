import * as R from 'ramda';

export function months(isShort = false) {
  return [
    isShort === false ? 'January' : 'Jan',
    isShort === false ? 'February' : 'Feb',
    isShort === false ? 'March' : 'Mar',
    isShort === false ? 'April' : 'Apr',
    'May',
    isShort === false ? 'June' : 'Jun',
    isShort === false ? 'July' : 'Jul',
    isShort === false ? 'August' : 'Aug',
    isShort === false ? 'September' : 'Sept',
    isShort === false ? 'October' : 'Oct',
    isShort === false ? 'November' : 'Nov',
    isShort === false ? 'December' : 'Dec',
  ];
}

export function convertServerTimestampToDate(timestamp) {
  // convert to local date
  let utcdate = new Date(timestamp);
  // convert to UTC for time conversion
  let timeOffset = utcdate.getTimezoneOffset() * 60 * 1000;
  let time = utcdate.getTime() + timeOffset;
  utcdate = new Date(time);
  return utcdate;
}

export function convertServerTimestampDateToLocalDate(timestamp) {
  return new Date(timestamp);
}
export function convertDateToISOString(dateString) {
  let utcdate = new Date(dateString);
  let timeOffset = utcdate.getTimezoneOffset() * 60 * 1000;
  let time = utcdate.getTime() + timeOffset;
  utcdate = new Date(time);
  return utcdate.toISOString();
}
export function extract(date) {
  return {
    year: date.getFullYear().toString(),
    month: (date.getMonth() + 1).toString(),
    monthName: months()[date.getMonth()],
    shortMonthName: months(true)[date.getMonth()],
    day: date.getDate().toString(),
    hours: date.getHours().toString(),
    minutes: date.getMinutes().toString(),
  };
}

export function formaServerDatetToUSDate(timestamp) {
  const utcDate = convertServerTimestampToDate(timestamp);
  const {month, day, year} = extract(utcDate);
  return `${month}/${day}/${year}`;
}

export function extractDateRange(
  startTimestampString,
  endTimestampString = null,
  convertToLocal = false,
) {
  const concatZeroIfNumberLessThanTen = R.ifElse(
    R.lt(R.__, 10),
    R.concat('0'),
    R.identity,
  );
  const extractDateDetails = R.compose(
    R.evolve({
      day: concatZeroIfNumberLessThanTen,
      month: concatZeroIfNumberLessThanTen,
    }),
    R.pick([
      'day',
      'month',
      'monthName',
      'shortMonthName',
      'year',
      'hours',
      //'minutes',
    ]),
    extract,
    convertToLocal
      ? convertServerTimestampDateToLocalDate //convertTimestampToLocalDate
      : convertServerTimestampToDate,
  );
  const dateRange = [startTimestampString];
  if (endTimestampString) {
    dateRange.push(endTimestampString);
  }
  const dateRangeDetails = R.compose(
    R.uniq,
    R.map(extractDateDetails),
  )(dateRange);
  const startDateDetails = R.head(dateRangeDetails);
  const endDateDetails = R.ifElse(
    R.compose(R.equals(1), R.length),
    R.always(null),
    R.last,
  )(dateRangeDetails);

  return {
    startDateDetails,
    endDateDetails,
  };
}

export function getFormattedDateRangeText(
  startTimestampString,
  endTimestampString,
) {
  const {startDateDetails, endDateDetails} = extractDateRange(
    startTimestampString,
    endTimestampString,
  );

  let dateRangeText = `${startDateDetails.month}/${startDateDetails.day}/${startDateDetails.year}`;
  if (endDateDetails && startDateDetails.day !== endDateDetails.day) {
    dateRangeText = `${dateRangeText}  To  ${endDateDetails.month}/${endDateDetails.day}/${endDateDetails.year}`;
  }
  return dateRangeText;
}

export function extractTimeRange(
  startTimestampString,
  endTimestampString = null,
  convertToLocal = false,
) {
  const formatTimeValue = R.compose(
    R.ifElse(R.lt(R.__, 10), R.compose(R.concat('0'), R.toString), R.toString),
    value => parseInt(value),
  );
  const formatMinuteValue = R.over(R.lensIndex(1), formatTimeValue);
  const formatHourValue = R.ifElse(
    // convert the 24 hour format to 12 hour format
    R.compose(R.gte(R.__, 12), value => parseInt(value), R.head),
    R.compose(
      R.append('pm'),
      R.over(
        R.lensIndex(0),
        // convert 24 hour format to 12 hour format
        R.compose(
          formatTimeValue,
          Math.abs,
          R.ifElse(R.equals('12'), R.add(0), R.subtract(12)),
        ),
      ),
    ),
    R.compose(
      R.append('am'),
      R.over(
        R.lensIndex(0),
        R.compose(
          formatTimeValue,
          Math.abs,
          R.ifElse(R.equals('0'), R.subtract(12), R.subtract(0)),
        ),
      ),
    ),
  );

  const getMinutesAndHours = R.compose(
    formatMinuteValue,
    formatHourValue,
    R.props(['hours', 'minutes']),
    extract,
    convertToLocal
      ? convertServerTimestampDateToLocalDate //convertTimestampToLocalDate
      : convertServerTimestampToDate,
  );
  // gives time range in array [hours, minutes, am|pm identifier]
  const getTimeRange = R.compose(R.uniq, R.map(getMinutesAndHours));

  // varible which store start time and end time value provided
  const timeRange = [startTimestampString];
  if (endTimestampString) {
    timeRange.push(endTimestampString);
  }
  const timeRangeDetails = getTimeRange(timeRange);
  let startTimeDetails = R.head(timeRangeDetails);
  let endTimeDetails = R.ifElse(
    R.compose(R.equals(1), R.length),
    R.always(null),
    R.last,
  )(timeRangeDetails);

  const extractTimeDetails = value => {
    return {
      hours: R.head(value),
      minutes: (value => {
        const minutes = R.view(R.lensIndex(1));
        return minutes(value);
      })(value),
      amPmIdentifier: R.last(value),
    };
  };

  startTimeDetails = extractTimeDetails(startTimeDetails);
  if (endTimeDetails) {
    endTimeDetails = extractTimeDetails(endTimeDetails);
  }

  return {
    startTimeDetails,
    endTimeDetails,
  };
}

export function getFormattedTimeRangeText(
  startTimestampString,
  endTimestampString,
  convertToLocal = false,
) {
  const {startTimeDetails, endTimeDetails} = extractTimeRange(
    startTimestampString,
    endTimestampString,
    convertToLocal,
  );
  const {hours, minutes, amPmIdentifier} = startTimeDetails;

  let timeRangeText = `${hours}:${minutes} ${amPmIdentifier}`;
  if (endTimeDetails) {
    const {
      hours: endHours,
      minutes: endMinutes,
      amPmIdentifier: endAmPmIndentifier,
    } = endTimeDetails;
    timeRangeText = `${timeRangeText} - ${endHours}:${endMinutes} ${endAmPmIndentifier}`;
  }
  return timeRangeText;
}
