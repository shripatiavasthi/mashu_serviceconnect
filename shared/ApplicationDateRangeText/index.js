import React from 'react';
import {
  getFormattedDateRangeText,
} from '../../utils/DateService';
import ApplicationParagraphText from '../ApplicationParagraphText';


export default function ApplicationDateRangeText({
  startTimestampString,
  endTimestampString = null,
  style,
}) {
  const dateRangeText =  getFormattedDateRangeText(startTimestampString, endTimestampString)

  return (
    <ApplicationParagraphText style={style}>
      {dateRangeText}
    </ApplicationParagraphText>
  );
}