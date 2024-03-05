import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const Welcome = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageTextContainer}>
        <Image
          source={require('../assets/images/welcome.png')}
          style={styles.image}
        />
        <Text style={styles.welcomeText}> Welcome</Text>
        <Text style={styles.restoreWalletText}>
          You can restore a wallet or create a new one
        </Text>
      </View>
      <View style={styles.languageViewContainer}>
        <Text style={styles.languageText}>Language</Text>
        <View style={[styles.languageButtonContainer, {marginLeft: '-5%'}]}>
          <View style={styles.languageButton}>
            <Text style={styles.englishText}>English</Text>
          </View>
          <View style={[styles.languageButton, {backgroundColor: '#F4F7FA'}]}>
            <Text
              style={[
                styles.englishText,
                {color: '#000000', fontSize: 21, marginBottom: '5%'},
              ]}>
              عربي
            </Text>
          </View>
        </View>
        <View style={styles.getStartedContainer}>
          <Text style={styles.getStartedText}>Get Started</Text>
        </View>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  imageTextContainer: {
    alignItems: 'center',
  },
  image: {
    width: '43%',
    marginTop: '31%',
  },
  welcomeText: {
    color: 'black',
    fontSize: 21,
    fontWeight: '700',
    marginTop: '7%',
  },
  restoreWalletText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#939393',
    width: '62%',
    textAlign: 'center',
    marginTop: '2%',
  },
  languageViewContainer: {
    marginLeft: '10%',
    marginTop: '25%',
  },
  languageText: {
    fontSize: 19,
    fontWeight: '400',
    color: '#000000',
  },
  languageButtonContainer: {
    flexDirection: 'row',
    marginTop: '3%',
  },
  languageButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '44%',
    height: '48%',
    backgroundColor: '#F19220',
    borderRadius: 50,
    marginHorizontal: '2%',
  },
  englishText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  getStartedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '25%',
    width: '97%',
    marginLeft: '-3%',
    height: 55,
    borderRadius: 50,
    backgroundColor: '#F19220',
  },
  getStartedText: {
    fontSize: 21,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
  },
});
