import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {SvgUri} from 'react-native-svg';

import getLocalIcon from './LocalIcon';

export default function CustomIcon(props) {
  const width = moderateScale(props.width || props.size || 29);
  const height = moderateScale(props.height || props.size || 29);
  const color = props.color || '#036CB6';

  if (props.iconUrl) {
    return (
      <SvgUri width={width} height={height} color={color} uri={props.iconUrl} />
    );
  }

  if (props.iconName) {
    let SvgLocal = getLocalIcon(props.iconName);
    return <SvgLocal style={{color: color}} fill={color} width={width} height={height} />;
  }

  return null;
}
