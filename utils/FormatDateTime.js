import moment from 'moment';

export function formatDateTime(date) {
  if (typeof date === "number") {
    return moment(date)
  }
  else return moment.utc(date);

}
