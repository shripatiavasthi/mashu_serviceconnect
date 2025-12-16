import React from 'react';
import * as R from 'ramda';
import ApplicationParagraphText from '../ApplicationParagraphText';

export default function ApplicationAddressText({
  style,
  address,
  isSingleLine,
  displayOnlyCityName = false,
}) {
  if (address) {
    const addressText = R.compose(
      R.join(', '),
      R.reject(R.isNil),
      R.props(['address_line_1', 'city_name', 'state_code', 'zip_code']),
    )(address);

    return (
      <ApplicationParagraphText
        numberOfLines={isSingleLine ? 1 : null}
        style={style}>
        {displayOnlyCityName ? address ? address.city_name : null : addressText}
      </ApplicationParagraphText>
    );
  }
  return null;
}
