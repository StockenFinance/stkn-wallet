import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

const ChartScreen = () => {
  const [selectedTime, setSelectedTime] = useState(null);

  const handleRangePress = range => {
    setSelectedTime(range);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/backIcon.png')}
          style={styles.backIcon}
        />
        <View style={{flexDirection: 'row'}}>
          <View style={styles.swapImageContainer}>
            <Image
              source={require('../assets/images/bitcoin.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.walletText}>Bitcoin</Text>
        </View>

        <Image
          source={require('../assets/images/options.png')}
          style={styles.scanIcon}
        />
      </View>
      <View style={styles.rangeSelectionView}>
        <TouchableOpacity onPress={() => handleRangePress('$150')}>
          <Text
            style={[
              styles.rangeText,
              {
                width: selectedTime === '$150' ? 60 : null,
                height: selectedTime === '$150' ? 34 : null,
                borderRadius: selectedTime === '$150' ? 12 : null,
                color: selectedTime === '$150' ? '#ffffff' : '#253452',
                padding: selectedTime === '$150' ? '2%' : null,
                textAlign: 'center',
                backgroundColor:
                  selectedTime === '$150' ? '#F19220' : 'transparent',
              },
            ]}>
            $150
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleRangePress('$500')}>
          <Text
            style={[
              styles.rangeText,
              {
                width: selectedTime === '$500' ? 60 : null,
                height: selectedTime === '$500' ? 34 : null,
                borderRadius: selectedTime === '$500' ? 12 : null,
                color: selectedTime === '$500' ? '#ffffff' : '#253452',
                padding: selectedTime === '$500' ? '2%' : null,
                textAlign: 'center',
                backgroundColor:
                  selectedTime === '$500' ? '#F19220' : 'transparent',
              },
            ]}>
            $500
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleRangePress('MAX')}>
          <Text
            style={[
              styles.rangeText,
              {
                width: selectedTime === 'MAX' ? 60 : null,
                height: selectedTime === 'MAX' ? 34 : null,
                borderRadius: selectedTime === 'MAX' ? 12 : null,
                color: selectedTime === 'MAX' ? '#ffffff' : '#253452',
                padding: selectedTime === 'MAX' ? '2%' : null,
                textAlign: 'center',
                backgroundColor:
                  selectedTime === 'MAX' ? '#F19220' : 'transparent',
              },
            ]}>
            MAX
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    alignSelf: 'center',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '11%',
  },
  backIcon: {
    width: 25,
    height: 25,
  },
  walletText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#253452',
    marginTop: '-2%',
  },
  scanIcon: {
    width: 3,
    height: 18,
  },
  swapImageContainer: {
    width: 26,
    height: 28,
    borderRadius: 10,
    backgroundColor: '#F2A13F',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '5%',
    marginLeft: '5%',
    marginTop: '-1%',
  },
  image: {
    width: 19,
    height: 17,
    marginHorizontal: 10,
  },
  rangeSelectionView: {
    width: 311,
    height: 53,
    borderRadius: 15,
    backgroundColor: '#F4F7FA',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: '5%',
  },
  rangeText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#253452',
  },
});
