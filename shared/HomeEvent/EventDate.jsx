import React from 'react';
import DynamicText from '../DynamicText';
import {formatDateTime} from '../../utils/FormatDateTime';

export default function EventDate({event, textStyle}) {

  const startDate = formatDateTime(event.startDate).format('MM-DD-YYYY');
  const endDate = formatDateTime(event.endDate).format('MM-DD-YYYY');
  const startTime = formatDateTime(event.startDate).format('hh:mma');
  const endTime = formatDateTime(event.endDate).format('hh:mma');

  return (
    <DynamicText
      style={textStyle}
      text={
        startDate === endDate
          ? `${startDate} | ${startTime} - ${endTime}`
          : `${startDate} ${startTime} to ${endDate} ${endTime}`
      }
    />
  );
}
