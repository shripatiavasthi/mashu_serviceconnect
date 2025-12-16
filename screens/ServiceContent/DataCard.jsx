import React, { useState } from 'react';
import { View, Image, Linking } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import PrimaryButton from '../../shared/PrimaryButton';
import DownloaderButton from '../../shared/PrimaryButton/downloader'
import YouTubeVideo from '../../shared/YouTubeVideo';
import CheckBox from '@react-native-community/checkbox';
import { useTheme } from 'react-native-elements';
import DynamicText from '../../shared/DynamicText';
import { sendAnalytics, events } from '../../utils/firebaseAnalytics';


const MyCheckBoxes = ({ types, colors }) => {
  const [myChecks, setMyChecks] = useState(
    types.map(() => {
      return false;
    }),
  );
  const checkHandler = (handleIndex, newValue) => {
    setMyChecks(
      myChecks.map((item, index) => {
        if (index == handleIndex) return newValue;
        else return item;
      }),
    );
  };
  return (
    <View style={styles.checkBoxesContainer}>
      {types.map((item, index) => {
        return (
          <View style={styles.checkContainer}>
            <CheckBox
              disabled={false}
              value={myChecks[index]}
              onValueChange={newValue => {
                checkHandler(index, newValue);
              }}
              tintColors={{ true: colors.primary, false: colors.black }}
            />
            <DynamicText
              text={item}
              style={{
                color: myChecks[index] ? colors.primary : colors.black,
              }}
            />
          </View>
        );
      })}
    </View>
  );
};

export default function DataCard({ data, labels, navigation, contentName }) {
  const { types, action } = data;
  const { colors, fontSize } = useTheme().theme;
  return (
    <>
      {data.imageUrl ? (
        <Image style={styles.imageStyle} source={{ uri: data.imageUrl }} />
      )
        : null}
      {data.type == 'link' && (
        <View style={styles.singleLinkCard}>
          <PrimaryButton
            title={labels?.actionButtons?.websiteUrl}
            iconName="Website"
            onPress={() => {
              sendAnalytics(events.link_clicked, data.url);
              Linking.openURL(data.url)
            }
            }
          />
        </View>
      )}
      {data.type == 'video' && data.videoProvider == 'youtube' && (
        <View style={styles.singleLinkCard}>
          <YouTubeVideo url={data.url} />
        </View>
      )}
      {data.type == 'attachment' && (
        <DownloaderButton
          iconName="PdfIcon"
          title={labels?.actionButtons?.downloadPdf}
          buttonStyle={styles.buttonStyle}
          fileUuid={data.fileUuid}
          fileUrl={data.fileUrl}
        />
      )}
      {data.type == 'image' && (
        <Image style={styles.imageStyle} source={{ uri: data.fileUrl }} />
      )}

      {types && (
        <View>
          <MyCheckBoxes types={types} colors={colors} />
          <PrimaryButton
            title={action.title}
            buttonStyle={styles.buttonStyle}
          />
        </View>
      )}
    </>
  );
}

const styles = ScaledSheet.create({
  imageStyle: {
    maxWidth: '100%',
    minHeight: '180@ms',
    resizeMode: 'contain',
    margin: '8@ms',
    //backgroundColor: "red",
    marginTop: 0,
    borderRadius: 10,
    marginHorizontal: '15@ms',
  },
  singleLinkCard: { padding: '15@ms', paddingTop: 0 },
  checkBoxesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
  },
  checkContainer: { flexDirection: 'row', alignItems: 'center', width: '50%' },
  buttonStyle: {
    marginVertical: 20,
    width: '300@ms',
  },
  modalView: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: 'column',
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalText: {
    fontSize: '25@ms',
    opacity: 1,
    marginBottom: '8@ms'
  }
});
