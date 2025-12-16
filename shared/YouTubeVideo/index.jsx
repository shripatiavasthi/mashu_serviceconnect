import React, { useState } from 'react';
import { View } from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import YoutubePlayer from 'react-native-youtube-iframe';
import { sendAnalytics, events } from '../../utils/firebaseAnalytics';


function youtube_parser(url) {
  try {
    var regExp =
      /^https?\:\/\/(?:www\.youtube(?:\-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*\&)?vi?=|\&vi?=|\?(?:.*\&)?vi?=)([^#\&\?\n\/<>"']*)/i;
    var match = url.match(regExp);
    return match && match[1].length == 11 ? match[1] : false;
  } catch {
    return false;
  }
}

export default function YouTubeVideo({ videoId, url }) {
  const [playing, setPlaying] = useState(false);

  return (
    <View style={styles.wrapper}>
      <YoutubePlayer
        height={moderateScale(166)}
        play={playing}
        webViewStyle={{ opacity: 0.99 }}
        videoId={videoId || youtube_parser(url)}
        onChangeState={state => {
          if (state === 'ended') {
            sendAnalytics(events.video_ended, url)
            setPlaying(false);
          }
          if (state === 'playing') {
            sendAnalytics(events.video_played, url)
          }
        }}
      />
    </View>
  );
}
const styles = ScaledSheet.create({
  wrapper: {
    borderRadius: '10@ms',
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '300@ms',
  },
});
