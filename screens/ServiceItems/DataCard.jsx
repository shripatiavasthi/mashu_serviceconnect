import React, { useState } from 'react';
import { View, Text, Linking } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import PrimaryButton from '../../shared/PrimaryButton';
import YouTubeVideo from '../../shared/YouTubeVideo';
import CheckBox from '@react-native-community/checkbox';
import { useTheme } from 'react-native-elements';
import DynamicText from '../../shared/DynamicText';
import { sendAnalytics, events } from '../../utils/firebaseAnalytics';




const MyCheckBoxes = ({ types }) => {
  const { colors } = useTheme().theme;

  const [myChecks, setMyChecks] = useState(types.map(() => {
    return false;
  }))
  const checkHandler = (handleIndex, newValue) => {
    setMyChecks(myChecks.map((item, index) => {
      if (index == handleIndex) return newValue;
      else return item;
    }))
  }
  return (
    <View style={styles.checkBoxesContainer}>
      {types.map((item, index) => {
        return (<View style={styles.checkContainer}>

          <CheckBox
            disabled={false}
            value={myChecks[index]}
            onValueChange={(newValue) => { checkHandler(index, newValue) }}
            tintColors={{ true: colors.primary, false: colors.black }}
          />
          <DynamicText
            text={item}
            style={{ color: myChecks[index] ? colors.primary : colors.black }}
          />
        </View>
        )
      })}
    </View >
  )
}

export default function DataCard({ data, labels, navigate }) {
  const { types, action } = data;
  return (
    <>
      {data.type == 'link' && <View style={styles.singleLinkCard}>
        <PrimaryButton
          title={labels.actionButtons.websiteUrl}
          iconUrl={data.iconUrl}
          onPress={() => {
            sendAnalytics(events.link_clicked, data.url)
            Linking.openURL(data.url)
          }}
        />
      </View>}
      {
        data.type == 'video' && <View style={styles.singleLinkCard}>
          <YouTubeVideo url={data.url} />
        </View>
      }
      {types &&
        <View >
          <MyCheckBoxes types={types} />
          <PrimaryButton
            title={action.title}
            buttonStyle={styles.buttonStyle}
          />
        </View>
      }
    </>
  )
}

const styles = ScaledSheet.create({
  singleLinkCard: { padding: '15@ms', paddingTop: 0 },
  checkBoxesContainer: { flexDirection: "row", flexWrap: 'wrap', paddingHorizontal: 20, },
  checkContainer: { flexDirection: "row", alignItems: "center", width: "50%" },
  buttonStyle: {
    marginVertical: 20,
    width: "300@ms"
  }

})
