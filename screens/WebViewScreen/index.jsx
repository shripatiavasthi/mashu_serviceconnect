import React, {useRef, useEffect} from 'react';
import {ScrollView, RefreshControl} from 'react-native';
import {useSelector} from 'react-redux';
import {WebView} from 'react-native-webview';

export default function WebViewScreen({route}) {
  const webViewRef = useRef();

  let isConnected = useSelector(({settings}) => settings.isConnected);
  useEffect(() => {
    if (isConnected) {
      //crashlytics.log(`refreshing webview`);
      onRefresh();
    }
  }, [isConnected]);

  const onRefresh = () => webViewRef.current.reload();

  return (
    <ScrollView
      contentContainerStyle={{flex: 1}}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={onRefresh} />
      }>
      <WebView
        ref={webViewRef}
        automaticallyAdjustContentInsets={false}
        source={{uri: route.params.uri}}
        allowsFullscreenVideo={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
    </ScrollView>
  );
}
