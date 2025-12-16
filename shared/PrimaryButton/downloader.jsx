import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import FileViewer from 'react-native-file-viewer';
import PrimaryButton from '../../shared/PrimaryButton';
import { sendAnalytics, events } from '../../utils/firebaseAnalytics';
import ReactNativeBlobUtil from 'react-native-blob-util';

export default function DownloaderButton({
  iconName,
  title,
  buttonStyle,
  fileUuid,
  fileUrl,
}) {
  const [loading, setLoading] = useState(false);

  const startDownload = () => {
    setLoading(true)
    ReactNativeBlobUtil.config({
      fileCache: true,
      appendExt: 'pdf'
    })
      .fetch('GET', fileUrl, {})
      .then((res) => {
        setLoading(false)
        sendAnalytics(events.file_download, fileUrl)
        FileViewer.open(res.path())
      })
      .catch(() => {
        setLoading(false);
      });
  }

  return (
    <View style={{ justifyContent: "center" }}>
      <PrimaryButton
        iconName={iconName}
        title={title}
        buttonStyle={buttonStyle}
        onPress={startDownload}
        disabled={loading}
      />
      {loading ? (
        <View style={styles.loaderStyle}>
          <ActivityIndicator />
        </View>
      ) : null}
    </View>
  );
}

const styles = ScaledSheet.create({
  loaderStyle: {
    position: 'absolute', right: '50@ms',
  }
})
