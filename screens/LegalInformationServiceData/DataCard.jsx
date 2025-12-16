import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import PrimaryButton from '../../shared/PrimaryButton';
import YouTubeVideo from '../../shared/YouTubeVideo';

export default function DataCard({ data, labels, navigate }) {
  if (data.type == 'link') {
    return (
      <View style={styles.singleLinkCard}>
        <PrimaryButton
          title={labels.actionButtons.websiteUrl}
          iconUrl={data.iconUrl}
          onPress={() => { navigate("webViewScreen", { uri: data.url }) }}
        />
      </View>
    );
  } else if (data.type == 'video')
    return (
      <View style={styles.singleLinkCard}>
        <YouTubeVideo url={data.url} />
      </View>
    );
  return null;
}

const styles = ScaledSheet.create({
  singleLinkCard: { padding: '15@ms', paddingTop: 0 },
});
