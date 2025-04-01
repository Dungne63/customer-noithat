import { parseDate } from '@internationalized/date';
import moment from 'moment';

import CONST from '@/services/const';

export function handleParseDate(dateValue: string) {
  return parseDate(
    moment(dateValue, 'YYYYMMDD').isValid()
      ? moment(dateValue, 'YYYYMMDD').format('YYYY-MM-DD')
      : moment(dateValue, 'DDMMYYYY').format('YYYY-MM-DD')
  );
}

export function handleDate(dateValue: string) {
  return moment(dateValue, 'YYYYMMDD').isValid()
    ? moment(dateValue, 'YYYYMMDD').format('DD-MM-YYYY')
    : moment(dateValue, 'DDMMYYYY').format('DD-MM-YYYY');
}

export function getToVietNamDay(dayIndex?: 0 | 1 | 2 | 3 | 4 | 5 | 6) {
  return CONST.VIETNAM_DAYS_OF_WEEK[dayIndex ? dayIndex : moment().day()];
}
