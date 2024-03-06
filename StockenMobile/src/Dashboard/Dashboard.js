import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';

const Dashboard = () => {
  const [activeDotIndex, setActiveDotIndex] = useState(0);

  const handleScroll = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(contentOffsetX / 335); // Assuming each wallet item has a width of 150

    setActiveDotIndex(pageIndex);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.allNetworksView}>
          <Image
            source={require('../assets/images/allNetwork.png')}
            style={styles.allNetworksImage}
          />
          <Text style={styles.allNetworksText}>All Networks</Text>
          <Image
            source={require('../assets/images/dropdown.png')}
            style={styles.dropdownImage}
          />
        </View>
        <View style={styles.timerImage}>
          <Image source={require('../assets/images/timer.png')} />
        </View>
      </View>
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}>
          <LinearGradient
            colors={['#F19220', '#BE6800']}
            start={{x: -0.2, y: 0.1}}
            end={{x: 1, y: 0}}
            style={[styles.wallet, {borderRadius: 10, overflow: 'hidden'}]}>
            <View style={styles.walletContentContainer}>
              <View>
                <Text style={styles.walletName}>Wallet 1</Text>
                <Text style={styles.walletCode}>0Wefsxc584sfg </Text>
              </View>
            </View>

            <Image
              source={require('../assets/images/walletImage.png')}
              style={styles.walletImage}
            />

            <Text style={styles.receiveText}>Receive</Text>
            <Image
              source={require('../assets/images/receiveScanner.png')}
              style={{position: 'absolute', top: 27, right: 18}}
            />
            <View style={styles.walletBalanceContainer}>
              <View>
                <Text style={styles.yourBalanceText}>Your balance</Text>
                <Text style={styles.balanceText}>USD 78,071.01</Text>
              </View>

              <View style={styles.modalIconContainer}>
                <Image
                  source={require('../assets/images/modalDot.png')}
                  style={styles.modalDotImage}
                />
              </View>
            </View>
          </LinearGradient>
          <LinearGradient
            colors={['#F19220', '#BE6800']}
            start={{x: -0.2, y: 0.1}}
            end={{x: 1, y: 0}}
            style={[styles.wallet, {borderRadius: 10, overflow: 'hidden'}]}>
            <View style={styles.walletContentContainer}>
              <View>
                <Text style={styles.walletName}>Wallet 2</Text>
                <Text style={styles.walletCode}>0Wefsxc584sfg </Text>
              </View>
            </View>

            <Image
              source={require('../assets/images/walletImage.png')}
              style={styles.walletImage}
            />

            <Text style={styles.receiveText}>Receive</Text>
            <Image
              source={require('../assets/images/receiveScanner.png')}
              style={{position: 'absolute', top: 27, right: 18}}
            />
            <View style={styles.walletBalanceContainer}>
              <View>
                <Text style={styles.yourBalanceText}>Your balance</Text>
                <Text style={styles.balanceText}>USD 78,071.01</Text>
              </View>
              <View style={styles.modalIconContainer}>
                <Image
                  source={require('../assets/images/modalDot.png')}
                  style={styles.modalDotImage}
                />
              </View>
            </View>
          </LinearGradient>
          <LinearGradient
            colors={['#F19220', '#BE6800']}
            start={{x: -0.2, y: 0.1}}
            end={{x: 1, y: 0}}
            style={[styles.wallet, {borderRadius: 10, marginRight: 10}]}>
            <View style={styles.walletContentContainer}>
              <View>
                <Text style={styles.walletName}>Wallet 3</Text>
                <Text style={styles.walletCode}>0Wefsxc584sfg </Text>
              </View>
            </View>

            <Image
              source={require('../assets/images/walletImage.png')}
              style={styles.walletImage}
            />

            <Text style={styles.receiveText}>Receive</Text>
            <Image
              source={require('../assets/images/receiveScanner.png')}
              style={{position: 'absolute', top: 27, right: 18}}
            />
            <View style={styles.walletBalanceContainer}>
              <View>
                <Text style={styles.yourBalanceText}>Your balance</Text>
                <Text style={styles.balanceText}>USD 78,071.01</Text>
              </View>
              <View style={styles.modalIconContainer}>
                <Image
                  source={require('../assets/images/modalDot.png')}
                  style={styles.modalDotImage}
                />
              </View>
            </View>
          </LinearGradient>
        </ScrollView>
        <View style={styles.dotContainer}>
          {[...Array(3)].map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === activeDotIndex ? styles.activeDot : null,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  allNetworksView: {
    flexDirection: 'row',
    marginTop: '15%',
    marginLeft: '10%',
    alignItems: 'center',
  },
  allNetworksImage: {
    width: 15,
    height: 16,
    marginHorizontal: '2%',
  },
  allNetworksText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#253452',
    marginHorizontal: '2%',
  },
  dropdownImage: {
    width: 20,
    height: 20,
    marginTop: '2%',
  },
  timerImage: {
    alignSelf: 'center',
    marginTop: '15%',
  },

  wallet: {
    width: 335,
    height: 169,
    backgroundColor: '#f0f0f0',
    // marginRight: 5,
    marginLeft: 10,
    borderRadius: 10,
    padding: 10,
    marginTop: 30,
  },
  walletName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
    marginLeft: 15,
    marginTop: 10,
  },
  walletCode: {
    fontSize: 13,
    fontWeight: '400',
    marginLeft: 15,
    color: '#ffffff',
  },
  receiveText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
    position: 'absolute',
    top: 25,
    right: 10,
    marginHorizontal: '5%',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#F19220',
  },
  walletImage: {
    width: 200,
    height: 170,
    position: 'absolute',
    right: 1,
    resizeMode: 'stretch',
    borderRadius: 10,
  },
  walletContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  walletBalanceContainer: {
    marginTop: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  yourBalanceText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#ffffff',
    marginLeft: 16,
  },
  balanceText: {
    fontSize: 29,
    fontWeight: '900',
    color: '#ffffff',
    marginLeft: 17,
    marginTop: '-2%',
  },
  modalIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 19,
    height: 25,
    borderColor: '#ffffff',
    borderRadius: 6,
    borderWidth: 1,
    right: 10,
  },
  modalDotImage: {
    width: 3,
    height: 15,
  },
});
