import React from 'react';
import {View} from 'react-native';
import NoteCard from './NoteCard';
import OverviewCard from './OverviewCard';

const MainHeader = ({note, textType, overview, ...props}) => {
  return (
    <View>
      <NoteCard note={note} textType={textType} />
      <OverviewCard overview={overview} textType={textType} />
    </View>
  );
};

export default MainHeader;
