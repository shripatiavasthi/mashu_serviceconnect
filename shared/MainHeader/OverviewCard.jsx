import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-elements';
import {ScaledSheet} from 'react-native-size-matters';
import DynamicText from '../DynamicText';

const OverviewCard = ({overview, textType, ...props}) => {
  if (!overview) return <View style={styles.overViewEmptyContainer}></View>;

  const {colors, fontFamily, fontSize} = useTheme().theme;
  return (
    <View style={styles.overViewContainer}>
      <DynamicText
        textType={textType}
        textTypeLabel={overview.textTypeLabel}
        text={overview.text}
        style={styles.overViewText(colors, fontFamily, fontSize)}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  overViewContainer: {
    padding: '20@ms',
    paddingBottom: '10@ms',    
  },
  overViewEmptyContainer: {
    padding: '20@ms',
    paddingBottom: '0@ms',    
  },
  overViewText: (colors, fontSize, fontFamily) =>
    ScaledSheet.create({
      color: colors.black,
      fontSize: fontSize.h3,
      fontFamily: fontFamily.regular,
      lineHeight: '20@ms',
    }),
});

export default OverviewCard;
