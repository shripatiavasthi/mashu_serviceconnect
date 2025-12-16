import React from 'react';
import { FlatList, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import BusinessContactCard from '../../shared/BusinessContactCard';
import CustomLink from '../../shared/CustomLink';

export default function DataCard({ service, navigation }) {
  switch (service.name) {
    case 'am-i-eligible':
      return (
        <View style={styles.singleLinkCard}>
          <CustomLink
            title={service.title}
            iconUrl={service.iconUrl}
            data={service.data}
            navigation={navigation}
          />
        </View>
      );
    case 'contact-information':
      return (
        <View style={styles.descriptionSection}>
          <FlatList
            data={service.data}
            renderItem={({ item }) => <BusinessContactCard contact={item} labels={service.labels} />}
          />
        </View>
      );

    default:
      return null;
  }
}

const styles = ScaledSheet.create({
  descriptionSection: {
    paddingBottom: '15@ms',
  },
  singleLinkCard: { padding: '15@ms', paddingTop: 0, paddingLeft: '20@ms' },
});
