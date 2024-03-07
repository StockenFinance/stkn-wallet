import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import CustomModal from '../../components/customModal';

const Dashboard = () => {
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const [containerHeight, setContainerHeight] = useState(95); // Default height
  const [modalVisible, setModalVisible] = useState(false);

  const handleScroll = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(contentOffsetX / 335);

    setActiveDotIndex(pageIndex);
  };

  const handleContainerClick = () => {
    // Update the height on click
    setContainerHeight(containerHeight === 95 ? 170 : 95);
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
      <View>
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
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={styles.modalIconContainer}>
                  <Image
                    source={require('../assets/images/modalDot.png')}
                    style={styles.modalDotImage}
                  />

                  <CustomModal
                    transparent={true}
                    isVisible={modalVisible}
                    onClose={() => setModalVisible(false)}
                  />
                </View>
              </TouchableOpacity>
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

        <TouchableOpacity onPress={handleContainerClick}>
          <View>
            <View
              style={{...styles.currencyContainer, height: containerHeight}}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    width: 33,
                    height: 35,
                    borderRadius: 10,
                    backgroundColor: '#F2A13F',
                    marginTop: containerHeight === 95 ? '-12%' : '-45%',
                    marginLeft: '8%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('../assets/images/bitcoin.png')}
                    style
                  />
                </View>

                <View style={{marginLeft: '8%', marginTop: '-12%'}}>
                  <Text
                    style={[
                      styles.coinNameText,
                      {bottom: containerHeight === 95 ? null : '100%'},
                    ]}>
                    BTC
                  </Text>
                  <Text
                    style={[
                      styles.coinNameSubText,
                      {bottom: containerHeight === 95 ? null : '100%'},
                    ]}>
                    Bitcoin
                  </Text>
                </View>
              </View>
              <View style={{marginRight: '5%', marginTop: '-5%'}}>
                <Text
                  style={[
                    styles.priceText,
                    {bottom: containerHeight === 95 ? null : '22%'},
                  ]}>
                  0.00
                </Text>
                <Text
                  style={[
                    styles.priceSubText,
                    {bottom: containerHeight === 95 ? null : '23%'},
                  ]}>
                  0.000000000
                </Text>
              </View>
            </View>
            <View
              style={{
                width: '70%',
                borderWidth: 0.5,
                borderColor: '#344567',
                alignSelf: 'center',
                marginTop: containerHeight === 95 ? '-8%' : '-28%',
                marginLeft: '9%',
              }}></View>
            <Text
              style={{
                fontSize: 11,
                fontWeight: '400',
                color: '#7183A1',
                marginLeft: '20%',
              }}>
              $51,895.70
            </Text>
          </View>
          {containerHeight === 170 && (
            <View style={styles.additionalContent}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  width: '90%',
                  alignSelf: 'center',
                }}>
                <View>
                  <View
                    style={{
                      width: 35,
                      height: 32,
                      borderWidth: 1,
                      borderColor: '#808BA0',
                      alignSelf: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 11,
                      marginTop: '20%',
                    }}>
                    <Image
                      source={require('../assets/images/send.png')}
                      style={{}}
                    />
                  </View>

                  <Text
                    style={{
                      color: '#344567',
                      fontSize: 8,
                      fontWeight: '600',
                      alignSelf: 'center',
                    }}>
                    Send
                  </Text>
                </View>

                <View>
                  <View
                    style={{
                      width: 35,
                      height: 32,
                      borderWidth: 1,
                      borderColor: '#808BA0',
                      alignSelf: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 11,
                      marginTop: '20%',
                    }}>
                    <Image
                      source={require('../assets/images/send.png')}
                      style={{}}
                    />
                  </View>

                  <Text
                    style={{
                      color: '#344567',
                      fontSize: 8,
                      fontWeight: '600',
                      alignSelf: 'center',
                    }}>
                    Receive
                  </Text>
                </View>
                <View>
                  <View
                    style={{
                      width: 35,
                      height: 32,
                      borderWidth: 1,
                      borderColor: '#808BA0',
                      alignSelf: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 11,
                      marginTop: '20%',
                    }}>
                    <Image
                      source={require('../assets/images/send.png')}
                      style={{}}
                    />
                  </View>

                  <Text
                    style={{
                      color: '#344567',
                      fontSize: 8,
                      fontWeight: '600',
                      alignSelf: 'center',
                    }}>
                    Swap
                  </Text>
                </View>
                <View>
                  <View
                    style={{
                      width: 35,
                      height: 32,
                      borderWidth: 1,
                      borderColor: '#808BA0',
                      alignSelf: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 11,
                      marginTop: '20%',
                    }}>
                    <Image
                      source={require('../assets/images/Chart.png')}
                      style={{width: 18, height: 18}}
                    />
                  </View>

                  <Text
                    style={{
                      color: '#344567',
                      fontSize: 8,
                      fontWeight: '600',
                      alignSelf: 'center',
                    }}>
                    Chart
                  </Text>
                </View>
              </View>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleContainerClick}>
          <View>
            <View
              style={{...styles.currencyContainer, height: containerHeight}}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    width: 33,
                    height: 35,
                    borderRadius: 10,
                    backgroundColor: '#F2A13F',
                    marginTop: containerHeight === 95 ? '-12%' : '-45%',
                    marginLeft: '8%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('../assets/images/bitcoin.png')}
                    style
                  />
                </View>

                <View style={{marginLeft: '8%', marginTop: '-12%'}}>
                  <Text
                    style={[
                      styles.coinNameText,
                      {bottom: containerHeight === 95 ? null : '100%'},
                    ]}>
                    BTC
                  </Text>
                  <Text
                    style={[
                      styles.coinNameSubText,
                      {bottom: containerHeight === 95 ? null : '100%'},
                    ]}>
                    Bitcoin
                  </Text>
                </View>
              </View>
              <View style={{marginRight: '5%', marginTop: '-5%'}}>
                <Text
                  style={[
                    styles.priceText,
                    {bottom: containerHeight === 95 ? null : '22%'},
                  ]}>
                  0.00
                </Text>
                <Text
                  style={[
                    styles.priceSubText,
                    {bottom: containerHeight === 95 ? null : '23%'},
                  ]}>
                  0.000000000
                </Text>
              </View>
            </View>
            <View
              style={{
                width: '70%',
                borderWidth: 0.5,
                borderColor: '#344567',
                alignSelf: 'center',
                marginTop: containerHeight === 95 ? '-8%' : '-28%',
                marginLeft: '9%',
              }}></View>
            <Text
              style={{
                fontSize: 11,
                fontWeight: '400',
                color: '#7183A1',
                marginLeft: '20%',
              }}>
              $51,895.70
            </Text>
          </View>
          {containerHeight === 170 && (
            <View style={styles.additionalContent}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  width: '90%',
                  alignSelf: 'center',
                }}>
                <View>
                  <View
                    style={{
                      width: 35,
                      height: 32,
                      borderWidth: 1,
                      borderColor: '#808BA0',
                      alignSelf: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 11,
                      marginTop: '20%',
                    }}>
                    <Image
                      source={require('../assets/images/send.png')}
                      style={{}}
                    />
                  </View>

                  <Text
                    style={{
                      color: '#344567',
                      fontSize: 8,
                      fontWeight: '600',
                      alignSelf: 'center',
                    }}>
                    Send
                  </Text>
                </View>

                <View>
                  <View
                    style={{
                      width: 35,
                      height: 32,
                      borderWidth: 1,
                      borderColor: '#808BA0',
                      alignSelf: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 11,
                      marginTop: '20%',
                    }}>
                    <Image
                      source={require('../assets/images/send.png')}
                      style={{}}
                    />
                  </View>

                  <Text
                    style={{
                      color: '#344567',
                      fontSize: 8,
                      fontWeight: '600',
                      alignSelf: 'center',
                    }}>
                    Receive
                  </Text>
                </View>
                <View>
                  <View
                    style={{
                      width: 35,
                      height: 32,
                      borderWidth: 1,
                      borderColor: '#808BA0',
                      alignSelf: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 11,
                      marginTop: '20%',
                    }}>
                    <Image
                      source={require('../assets/images/send.png')}
                      style={{}}
                    />
                  </View>

                  <Text
                    style={{
                      color: '#344567',
                      fontSize: 8,
                      fontWeight: '600',
                      alignSelf: 'center',
                    }}>
                    Swap
                  </Text>
                </View>
                <View>
                  <View
                    style={{
                      width: 35,
                      height: 32,
                      borderWidth: 1,
                      borderColor: '#808BA0',
                      alignSelf: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 11,
                      marginTop: '20%',
                    }}>
                    <Image
                      source={require('../assets/images/Chart.png')}
                      style={{width: 18, height: 18}}
                    />
                  </View>

                  <Text
                    style={{
                      color: '#344567',
                      fontSize: 8,
                      fontWeight: '600',
                      alignSelf: 'center',
                    }}>
                    Chart
                  </Text>
                </View>
              </View>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleContainerClick}>
          <View>
            <View
              style={{...styles.currencyContainer, height: containerHeight}}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    width: 33,
                    height: 35,
                    borderRadius: 10,
                    backgroundColor: '#F2A13F',
                    marginTop: containerHeight === 95 ? '-12%' : '-45%',
                    marginLeft: '8%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('../assets/images/bitcoin.png')}
                    style
                  />
                </View>

                <View style={{marginLeft: '8%', marginTop: '-12%'}}>
                  <Text
                    style={[
                      styles.coinNameText,
                      {bottom: containerHeight === 95 ? null : '100%'},
                    ]}>
                    BTC
                  </Text>
                  <Text
                    style={[
                      styles.coinNameSubText,
                      {bottom: containerHeight === 95 ? null : '100%'},
                    ]}>
                    Bitcoin
                  </Text>
                </View>
              </View>
              <View style={{marginRight: '5%', marginTop: '-5%'}}>
                <Text
                  style={[
                    styles.priceText,
                    {bottom: containerHeight === 95 ? null : '22%'},
                  ]}>
                  0.00
                </Text>
                <Text
                  style={[
                    styles.priceSubText,
                    {bottom: containerHeight === 95 ? null : '23%'},
                  ]}>
                  0.000000000
                </Text>
              </View>
            </View>
            <View
              style={{
                width: '70%',
                borderWidth: 0.5,
                borderColor: '#344567',
                alignSelf: 'center',
                marginTop: containerHeight === 95 ? '-8%' : '-28%',
                marginLeft: '9%',
              }}></View>
            <Text
              style={{
                fontSize: 11,
                fontWeight: '400',
                color: '#7183A1',
                marginLeft: '20%',
              }}>
              $51,895.70
            </Text>
          </View>
          {containerHeight === 170 && (
            <View style={styles.additionalContent}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  width: '90%',
                  alignSelf: 'center',
                }}>
                <View>
                  <View
                    style={{
                      width: 35,
                      height: 32,
                      borderWidth: 1,
                      borderColor: '#808BA0',
                      alignSelf: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 11,
                      marginTop: '20%',
                    }}>
                    <Image
                      source={require('../assets/images/send.png')}
                      style={{}}
                    />
                  </View>

                  <Text
                    style={{
                      color: '#344567',
                      fontSize: 8,
                      fontWeight: '600',
                      alignSelf: 'center',
                    }}>
                    Send
                  </Text>
                </View>

                <View>
                  <View
                    style={{
                      width: 35,
                      height: 32,
                      borderWidth: 1,
                      borderColor: '#808BA0',
                      alignSelf: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 11,
                      marginTop: '20%',
                    }}>
                    <Image
                      source={require('../assets/images/send.png')}
                      style={{}}
                    />
                  </View>

                  <Text
                    style={{
                      color: '#344567',
                      fontSize: 8,
                      fontWeight: '600',
                      alignSelf: 'center',
                    }}>
                    Receive
                  </Text>
                </View>
                <View>
                  <View
                    style={{
                      width: 35,
                      height: 32,
                      borderWidth: 1,
                      borderColor: '#808BA0',
                      alignSelf: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 11,
                      marginTop: '20%',
                    }}>
                    <Image
                      source={require('../assets/images/send.png')}
                      style={{}}
                    />
                  </View>

                  <Text
                    style={{
                      color: '#344567',
                      fontSize: 8,
                      fontWeight: '600',
                      alignSelf: 'center',
                    }}>
                    Swap
                  </Text>
                </View>
                <View>
                  <View
                    style={{
                      width: 35,
                      height: 32,
                      borderWidth: 1,
                      borderColor: '#808BA0',
                      alignSelf: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 11,
                      marginTop: '20%',
                    }}>
                    <Image
                      source={require('../assets/images/Chart.png')}
                      style={{width: 18, height: 18}}
                    />
                  </View>

                  <Text
                    style={{
                      color: '#344567',
                      fontSize: 8,
                      fontWeight: '600',
                      alignSelf: 'center',
                    }}>
                    Chart
                  </Text>
                </View>
              </View>
            </View>
          )}
        </TouchableOpacity>
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
  currencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '87%',
    borderWidth: 1,
    borderColor: '#808BA0',
    height: 95,
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: '10%',
  },
  coinNameText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#344567',
  },
  coinNameSubText: {
    fontSize: 11,
    fontWeight: '400',
    color: '#7483A1',
  },
  priceText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#344567',
    textAlign: 'right',
  },
  priceSubText: {
    fontSize: 11,
    fontWeight: '400',
    color: '#344567',
  },
  additionalContent: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#F4F7FA',
    borderRadius: 15,
    width: '86%',
    height: 78,
    alignSelf: 'center',
  },
});
