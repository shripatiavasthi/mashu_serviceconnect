import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Overlay} from 'react-native-elements';
import { ScaledSheet } from 'react-native-size-matters';
import {setLanguage} from './store/dispatchers';
import {Pressable, Text, View} from 'react-native';
import {useTheme, CheckBox} from 'react-native-elements';
import * as RNLocalize from 'react-native-localize';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';

export default LanguageSelector = props => {
  const dispatch = useDispatch();

  let language = useSelector(({settings}) => settings.language);

  if (!language) {
    return (
      <Overlay isVisible={true}>
        <Picker
          onSubmit={lng => {
            dispatch(setLanguage({language: lng}));
          }}
        />
      </Overlay>
    );
  }
  return props.children;
};

const Picker = props => {
  const [language, setLanguage] = useState(
    RNLocalize.getLocales()[0].languageCode == 'es' ? 'es' : 'en',
  );
  const {colors, fontSize, fontFamily} = useTheme().theme;
  FontAwesome.loadFont();

  return (
    <View style={{}}>
      <View style={{padding: 20}}>
        <Text style={{color:'black'}}>Please select language</Text>
      </View>

      <CheckBox
        title="English"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={language == 'en'}
        onPress={() => setLanguage('en')}
      />

      <CheckBox
        title="Español"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={language == 'es'}
        onPress={() => setLanguage('es')}
      />
      <View style={styles.singleLinkCard}>
        <Pressable
          onPress={() => props.onSubmit(language)}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? colors.primary : colors.secondary,
            },
            styles.wrapperCustom,
          ]}>
          {({pressed}) => <Text style={styles.text}>{'Proceed'}</Text>}
        </Pressable>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 12,
    marginVertical: 2,
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
  logBox: {
    padding: 20,
    margin: 10,

    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9',
  },
  singleLinkCard: {
    padding: '15@ms',
    margin: 5,
    width: 300,
    alignItems: 'flex-end',
  },
  languageSelector: colors =>
    ScaledSheet.create({
      backgroundColor: colors.primaryText,
      color: 'red',
      width: '110@ms',
      height: '35@ms',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: '16@ms',
      borderColor: colors.secondary,
    }),
  container: (title, colors) =>
    ScaledSheet.create({
      height: '45@ms',
      width: '100%',
      backgroundColor: colors.white,
      flexDirection: 'row',
    }),
  image: {
    height: '30@ms',
    width: '76@ms',
  },
  leftSection: () => {
    return ScaledSheet.create({
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    });
  },
  rightSection: () =>
    ScaledSheet.create({
      flex: 2,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    }),
  pressableContainer: {
    //backgroundColor: 'red',
    paddingHorizontal: '10@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: (colors, fontSize, fontFamily) =>
    ScaledSheet.create({
      fontSize: fontSize.standard,
      color: colors.black,
      fontFamily: fontFamily.regular,
      paddingTop: '2@ms',
    }),
});
