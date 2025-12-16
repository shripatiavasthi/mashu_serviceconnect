import * as React from 'react';
import GradientCard from './card';

export default function GradientCardList(props) {
  return props.list.map((item, index) => (
    <GradientCard key={item.id || index} item={item} {...props} />
  ));
}
