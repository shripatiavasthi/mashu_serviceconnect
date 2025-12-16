import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-elements';
import { ScaledSheet } from 'react-native-size-matters';
import Swiper from 'react-native-swiper';
import { useDispatch, useSelector } from 'react-redux';
import { getBanners } from '../../screens/Home/store/dispatchers';
import BannerSlide from './BannerSlide';

export default function HomeBanner({ navigation }) {
  const { colors } = useTheme().theme;
  const dispatch = useDispatch();

  useEffect(() => {
    const loadBanners = async () => {
      await dispatch(getBanners());
    };
    loadBanners();
  }, [dispatch]);

  let bannersData = useSelector(({ home }) => home.bannersData);
  if (!bannersData) return null;

  const { banners, textType, labels } = bannersData

  return (
    <View style={styles.container()}>
      <Swiper
        height='100%'
        paginationStyle={styles.pagination()}
        dot={<View style={styles.dot(colors)} />}
        activeDot={<View style={styles.activeDot(colors)} />}>
        {(banners).map((slide, index) => (
          <BannerSlide key={index} slide={slide} textType={textType} labels={labels} navigation={navigation} />
        ))}
      </Swiper>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: (title, colors) =>
    ScaledSheet.create({
      marginBottom:5
    }),
  dot: colors =>
    ScaledSheet.create({
      backgroundColor: colors.white,
      opacity: 0.3,
      width: '8@ms',
      height: '8@ms',
      borderRadius: '4@ms',
      marginLeft: '3@ms',
      marginRight: '3@ms',
      marginTop: '3@ms',
      marginBottom: '3@ms',
    }),
  activeDot: colors =>
    ScaledSheet.create({
      backgroundColor: colors.white,
      width: '8@ms',
      height: '8@ms',
      borderRadius: '4@ms',
      marginLeft: '3@ms',
      marginRight: '3@ms',
      marginTop: '3@ms',
      marginBottom: '3@ms',
    }),
  pagination: () =>
    ScaledSheet.create({
      justifyContent: 'flex-start',
      left: '19@ms',
      bottom: '20@ms'
    }),
});
