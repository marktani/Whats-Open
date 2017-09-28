import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { MapView } from 'expo';
import Touchable from 'react-native-platform-touchable';
import Marker from '../components/Marker';
import HeaderActions from '../components/ReportHeaderActions';

export default class PlaceDetails extends React.Component {
  static navigationOptions = props => {
    return {
      title: props.navigation.state.params.title,
      headerRight: props.navigation.state.params.reportScreen && <HeaderActions.Right navigation={props.navigation} />
    };
  };

  state = {
    hours: [
      { day: 'Open Today', hours: '7:00 AM to 10:00 PM' },
      { day: 'Saturday', hours: '7:00 AM to 10:00 PM' },
      { day: 'Sunday', hours: '7:00 AM to 10:00 PM' },
      { day: 'Monday', hours: '7:00 AM to 10:00 PM' },
      { day: 'Tuesday', hours: '7:00 AM to 10:00 PM' },
      { day: 'Wednesday', hours: '7:00 AM to 10:00 PM' },
      { day: 'Thursday', hours: '7:00 AM to 10:00 PM' }
    ]
  };

  render() {
    const { navigation: { state: { params } } } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <MapView
          region={{
            ...params.latlng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          showsPointsOfInterest={false}
          showsTraffic={false}
          style={{ flexShrink: 0, flexBasis: '40%' }}>
          <MapView.Marker title={params.title} description={params.description} coordinate={params.latlng}>
            <Marker status={params.status} />
          </MapView.Marker>
        </MapView>
        <View style={styles.informationView}>
          <Text style={styles.headerTitle}>{params.title}</Text>
          <Text style={styles.addressText}>{params.address}</Text>
          <Touchable style={styles.button}>
            <Text style={styles.buttonText}>Currently Open</Text>
          </Touchable>
          <View
            style={{
              borderBottomColor: 'rgb(200, 199, 204)',
              borderBottomWidth: 1,
              marginBottom: 20
            }}
          />
          <View style={styles.hoursContainer}>
            <Text style={styles.hoursText}>HOURS</Text>
            {this.state.hours.map((hour, index) => (
              <View key={index} style={styles.hoursListing}>
                <Text style={styles.day}>
                  {hour.day}
                  {': '}
                </Text>
                <Text style={styles.hours}>{hour.hours}</Text>
              </View>
            ))}
          </View>
          <View
            style={{
              borderBottomColor: 'rgb(200, 199, 204)',
              borderBottomWidth: 1,
              marginBottom: 20
            }}
          />
          <Text style={styles.reportedByText}>Reported by 31 people</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addressText: {
    color: 'rgb(143, 142, 148)',
    letterSpacing: -0.2,
    fontSize: 13
  },
  button: {
    backgroundColor: 'rgb(24, 177, 50)',
    borderRadius: 8,
    marginBottom: 25,
    marginTop: 13,
    paddingBottom: 10,
    paddingTop: 10,
    width: '100%'
  },
  buttonText: {
    color: 'rgb(251, 251, 251)',
    fontSize: 13,
    letterSpacing: -0.3,
    textAlign: 'center'
  },
  day: {
    color: 'rgb(3, 3, 3)',
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: -0.1,
    marginRight: 10
  },
  headerTitle: {
    color: 'rgb(3, 3, 3)',
    fontSize: 17,
    letterSpacing: -0.4,
    marginBottom: 3
  },
  hours: {
    color: 'rgb(109, 109, 114)',
    fontSize: 13,
    letterSpacing: -0.1
  },
  hoursContainer: {
    marginBottom: 25
  },
  hoursListing: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    width: 'auto'
  },
  hoursText: {
    color: 'rgb(109, 109, 114)',
    fontSize: 11,
    letterSpacing: 0.3,
    marginBottom: 7.5
  },
  informationView: {
    backgroundColor: 'rgba(250, 250, 250, 0.8)',
    flexGrow: 1,
    flexBasis: '60%',
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 17
  },
  reportedByText: {
    color: 'rgb(3, 3, 3)',
    fontSize: 13
  }
});
