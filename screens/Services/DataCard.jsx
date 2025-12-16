import React from 'react';
import { FlatList, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import BusinessContactCard from '../../shared/BusinessContactCard';
import CalendarCard from '../../shared/CalendarCard';
import ContactInfo from '../../shared/ContactInfo';
import CustomLink from '../../shared/CustomLink';

const renderItem = (item, name, labels) => {
  switch (name) {
    case 'contactInformation':
      return <BusinessContactCard contact={item} labels={labels} />;
    case 'myTeam':
      return <ContactInfo contact={item} labels={labels} />;
    case 'calendar':
      return <CalendarCard contact={item} labels={labels} />;
  }
  return <View />
};

export default function DataCard({ data, name, labels }) {
  if (Array.isArray(data)) {
    return (
      <View style={styles.descriptionSection}>
        <FlatList
          data={data}
          renderItem={({ item }) => renderItem(item, name, labels)}
        />
      </View>
    );
  } else if (data.link)
    return (
      <View style={styles.singleLinkCard}>
        <CustomLink data={data} />
      </View>
    );
  else return null;
}

const styles = ScaledSheet.create({
  descriptionSection: {
    //backgroundColor: 'green',
    paddingBottom: '15@ms',
  },
  singleLinkCard: { padding: '15@ms', paddingTop: 0, paddingLeft: '20@ms' },
});
