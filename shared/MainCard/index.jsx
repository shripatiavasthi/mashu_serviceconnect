import React from 'react';
import {
  TouchableHighlight, View
} from 'react-native';
import { useTheme } from 'react-native-elements';
import { ScaledSheet } from 'react-native-size-matters';
import CustomIcon from '../CustomIcon';
import DynamicText from '../DynamicText';
import CardTitle from './CardTitle';
const MainCard = ({
  title,
  TitleComponent,
  titleLine,
  name,
  description,    
  textType,
  showNavigationOnRightSide,
  iconName,
  iconWidth,
  iconHeight,
  iconUrl,
  titleStyle,
  titleTextStyle,
  leftContainerStyle,
  rightContainerStyle,
  descriptionStyle,
  descriptionSectionStyle,
  descriptionNumberOfLines,
  navigation,
  onPress,
  serviceId,  
  ...props
}) => {
  const {colors, fontFamily, fontSize} = useTheme().theme;
  return (
    <View
      style={[
        styles.skeleton(colors, fontFamily, fontSize),
        {...props.cardSkeleton},
      ]}>
      <TouchableHighlight
        onPress={
          navigation
            ? () =>
                navigation.push('service', {
                  service: name,
                  title: title?.text,
                  iconUrl: iconUrl,
                })
            : onPress
            ? onPress
            : null
        }
        underlayColor="#ebedf0"
        style={styles.topContainer}>
        <View style={styles.topContainer}>
          <View style={[styles.leftContainer, leftContainerStyle]}>
            {title && (
              <CardTitle
                titleLine={titleLine}
                titleStyle={titleStyle}
                titleTextStyle={titleTextStyle}
                iconUrl={iconUrl}
                iconWidth={iconWidth}
                iconHeight={iconHeight}
                title={title}
                textType={textType}
              />
            )}
            
            {TitleComponent? <TitleComponent />: null}

            {description ? (
              <View
                style={[styles.descriptionSection, descriptionSectionStyle]}>
                <DynamicText
                  numberOfLines={descriptionNumberOfLines}
                  textType={textType}
                  text={description.text}
                  textTypeLabel={description.textTypeLabel}
                  style={[styles.description, descriptionStyle]}
                />
              </View>
            ) : null}            
          </View>
          {showNavigationOnRightSide && (
            <View
              style={[
                styles.rightContainer(colors, fontFamily, fontSize),
                rightContainerStyle,
              ]}>
              <CustomIcon iconName={'Arrow'} width={6} height={12} />
            </View>
          )}
        </View>
      </TouchableHighlight>
      {props.children}
    </View>
  );
};
const styles = ScaledSheet.create({
  skeleton: colors =>
    ScaledSheet.create({
      backgroundColor: colors.white,
      //borderWidth: 1,
      borderRadius: '10@ms',
      //borderColor: colors.borderColor,
      //shadowColor: colors.black,
      //shadowOffset: {width: 0, height: 2},
      //shadowOpacity: 0.5,
      //shadowRadius: '2@ms',
      elevation: 2,
      overflow: 'hidden',
      marginTop: '7.5@ms',
      marginBottom: '7.5@ms',
      margin: '3@ms',
    }),

  topContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
    flex: 1,
    //
  },
  descriptionSection: {
    padding: '5@ms',
    paddingLeft: '7@ms',
    // flex: 1,
    //marginBottom: 2,
    //backgroundColor: 'green',
  },
  description: {
    color: "black",
    fontSize: '14@ms',       
  },
  leftContainer: {
    margin: '10@ms',
    //marginBottom: '0@ms',
    flex: 1,
    overflow: 'hidden',
    //backgroundColor: 'green',
  },
  rightContainer: colors =>
    ScaledSheet.create({
      backgroundColor: colors.primaryLight,
      flex: 0.15,
      justifyContent: 'center',
      alignItems: 'center',
    }),
});
export default MainCard;
