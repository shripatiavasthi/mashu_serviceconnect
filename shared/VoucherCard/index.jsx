import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Button, Card, CheckBox} from 'react-native-elements';
import {useTheme} from 'react-native-elements';
import {ScaledSheet} from 'react-native-size-matters';
import LangText from '../LangText';
import PrimaryButton from '../PrimaryButton';

export default function VoucherCard({contact}) {
  const {colors, fontSize, fontFamily} = useTheme().theme;
  const [checkedFood, toggleCheckedFood] = useState(false);
  const [checkedTaxi, toggleCheckedTaxi] = useState(false);
  const [checkedTrain, toggleCheckedTrain] = useState(false);
  const [checkedBus, toggleCheckedBus] = useState(false);

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            textAlign: 'left',
            fontSize: 14,
            fontFamily: 'Arial',
            color: black,
            opacity: 1,
          }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </Text>
      </View>

      <View
        style={{
          flex: 1, //backgroundColor: 'pink'
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            //backgroundColor: 'red',
          }}>
          <View style={{width: 150}}>
            <CheckBox
              title="Food"
              checked={checkedFood}
              onPress={() => toggleCheckedFood(!checkedFood)}
              containerStyle={{backgroundColor: 'white', borderColor: 'white'}}
              textStyle={{fontSize: 15, fontWeight: 'bold'}}
            />
          </View>

          <View style={{width: 150}}>
            <CheckBox
              title="Taxi"
              checked={checkedTaxi}
              onPress={() => toggleCheckedTaxi(!checkedTaxi)}
              containerStyle={{backgroundColor: 'white', borderColor: 'white'}}
              textStyle={{fontSize: 15, fontWeight: 'bold'}}
            />
          </View>
        </View>

        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{width: 150}}>
            <CheckBox
              title="Train"
              checked={checkedTrain}
              onPress={() => toggleCheckedTrain(!checkedTrain)}
              containerStyle={{backgroundColor: 'white', borderColor: 'white'}}
              textStyle={{fontSize: 15, fontWeight: 'bold'}}
            />
          </View>

          <View style={{width: 150}}>
            <CheckBox
              title="Bus"
              checked={checkedBus}
              onPress={() => toggleCheckedBus(!checkedBus)}
              containerStyle={{backgroundColor: 'white', borderColor: 'white'}}
              textStyle={{fontSize: 15, fontWeight: 'bold'}}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          height: 80,
          //backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <PrimaryButton title={'SEND REQUEST FOR VOUCHER'} />
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    //margin: '10@ms',
    padding: '5@ms',
    paddingBottom: '20@ms',
    paddingHorizontal: '15@ms',
    // /backgroundColor: 'pink',
    //borderRadius: '10@ms',
  },
  phoneFaxSection: {
    flex: 1,
    paddingTop: '5@ms',
    flexDirection: 'row',
    flexWrap: 'wrap',
    //backgroundColor: 'red',
    // justifyContent: 'space-between',
  },

  headingText: (colors, fontSize, fontFamily) =>
    ScaledSheet.create({
      fontSize: fontSize.h3odd,
      color: colors.black,
      fontFamily: fontFamily.bold,
    }),

  phoneContainer: {
    flexDirection: 'row',
  },
  faxContainer: {
    flexDirection: 'row',
    paddingLeft: '10@ms',
  },
  addressText: (colors, fontSize, fontFamily) =>
    ScaledSheet.create({
      fontSize: fontSize.h3,
      color: colors.black,
      fontFamily: fontFamily.regular,
    }),
  phoneFax: (colors, fontSize, fontFamily) =>
    ScaledSheet.create({
      fontSize: fontSize.h3,
      color: colors.black,
      fontFamily: fontFamily.bold,
      paddingLeft: '5@ms',
    }),
});
