import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import CustomIcon from '../CustomIcon';
//import Tags from '../Tags';
import { useTheme } from 'react-native-elements';
import ApplicationImageOverlay from '../ApplicationImageOverlay';
import ApplicationBoxShadow from '../ApplicationBoxShadow';

export default function ApplicationBoxContainer({
  image_id,
  showTag = false,
  tag = null,
  contentBoxStyle,
  onPress,
  children,
}) {
  const {colors, fontFamily, fontSize} = useTheme().theme;

  const boxChild = (
    <View>
      <View style={styles.tagsStyle}>
        {/* {showTag ? (
          <Tags containerStyle={styles.tagsContainer} userType={tag} />
        ) : null} */}
      </View>
      <View
        style={showTag ? styles.childContainer : styles.childContainerNoTags}>
        <View style={showTag ? styles.rowContainer : styles.rowContainerNoTags}>
          {children}
        </View>
      </View>
      {/* <View
        style={[
          styles.rightContainer(colors, fontFamily, fontSize),
          styles.containerArrow
        ]}>
        <CustomIcon iconName={'Arrow'} width={6} height={12} />
      </View> */}
      {/* <View style={[styles.containerArrow]}>        
        <EventsIcon icon={'rightcircle'} fontType={'FontAwesome5'}></EventsIcon>
      </View> */}
    </View>
  );
  const box = image_id ? (
    <ApplicationImageOverlay
      style={contentBoxStyle}
      imageId={image_id}
      imageStyle={styles.containerOverlay}
      overlayStyle={styles.containerOverlay}>
      {boxChild}
    </ApplicationImageOverlay>
  ) : (
    <ApplicationBoxShadow style={[styles.containerBackground, contentBoxStyle]}>
      {boxChild}
    </ApplicationBoxShadow>
  );

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={onPress}>
        {/* <View style={styles.tagsStyle}>
          {showTag ? (
            <Tags containerStyle={styles.tagsContainer} userType={tag} />
          ) : null}
        </View> */}
        <View style={styles.touchableStyle}>{box}</View>
      </TouchableOpacity>
    </View>
  );
}

const styles = ScaledSheet.create({
  mainContainer: {
    flex: 1,
    position: 'relative',
    marginLeft: '10@ms',
    marginRight: '10@ms',
    marginBottom: '10@ms',
    marginTop: '10@ms',
  },
  childContainer: {
    marginBottom: '10@ms',
    flexDirection: 'row',
    borderRadius: '10@ms',
    marginRight: '10@ms',
    alignItems: 'center',
  },
  rowContainer: {
    //width: '90%',
    //top: '40@ms',
  },
  touchableStyle: {
    //height: '80%',
    //top: '40@ms',
  },
  childContainerNoTags: {
    flexDirection: 'row',
    borderRadius: '10@ms',
    alignItems: 'center',
    margin: '2%',
  },
  rowContainerNoTags: {
    width: '90%',
    height: '100%',
    // backgroundColor: 'red',
  },
  containerBackground: {
    backgroundColor: '#007e7e',
    borderRadius: '10@ms',
  },
  containerOverlay: {
    borderRadius: '10@ms',
  },
  containerArrow: {
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
    right: 0,
    // borderRadius: '10@ms',
    // borderTopLeftRadius: 0,
    // borderBottomLeftRadius: 0,
  },
  tagsContainer: {
    //top: '20@ms',
    width: '90%',
    left: '19@ms',
    marginTop: '10@ms',
    //position: 'absolute',
  },
  tagsStyle: {
    //height: '20%',
  },
  rightContainer: colors =>
    ScaledSheet.create({
      backgroundColor: colors.primaryLight,
      flex: 0.15,
      justifyContent: 'center',
      alignItems: 'center',
    }),
});
