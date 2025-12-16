import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-elements';
import { ScaledSheet } from 'react-native-size-matters';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
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
      <SwiperFlatList
        data={banners}
        renderItem={({ item }) => (
          <BannerSlide slide={item} textType={textType} labels={labels} navigation={navigation} />
        )}
        showPagination
        paginationStyle={styles.pagination()}
        paginationStyleItem={styles.paginationDot(colors)}
        paginationActiveColor={colors.white}
        paginationDefaultColor={'rgba(255,255,255,0.3)'}
      />
    </View>
  );
}

const styles = ScaledSheet.create({
  container: (title, colors) =>
    ScaledSheet.create({
      marginBottom:5
    }),
  paginationDot: colors =>
    ScaledSheet.create({
      width: '8@ms',
      height: '8@ms',
      borderRadius: '4@ms',
      marginHorizontal: '3@ms',
      marginVertical: '3@ms',
      backgroundColor: colors.white,
    }),
  pagination: () =>
    ScaledSheet.create({
      justifyContent: 'flex-start',
      left: '19@ms',
      bottom: '20@ms'
    }),
});
