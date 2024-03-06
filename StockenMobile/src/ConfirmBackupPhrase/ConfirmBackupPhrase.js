import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const ConfirmBackupPhrase = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/backIcon.png')}
          style={styles.backIcon}
        />
        <Text style={styles.walletText}>Backup Phrase</Text>
      </View>
      <View style={styles.recoveryPharseTextContainer}>
        <Text style={styles.recoveryPhraseText}>
          {' '}
          Confirm your Recovery Phrase
        </Text>

        <Text style={styles.subText}>
          To be sure you backed up your recovery phrase correctly, please enter
          its words in the fields below in the right order
        </Text>
      </View>
      <View style={styles.securityMessageContainer}></View>
      <View style={styles.languageButtonContainer}>
        <View style={styles.languageButton}>
          <Text style={styles.englishText}>choice</Text>
        </View>
        <View style={styles.languageButton}>
          <Text style={[styles.englishText]}>much</Text>
        </View>
        <View style={styles.languageButton}>
          <Text style={[styles.englishText]}>animal</Text>
        </View>
      </View>
    </View>
  );
};

export default ConfirmBackupPhrase;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '5%',
    marginLeft: '-8%',
  },
  backIcon: {
    width: 25,
    height: 25,
  },
  walletText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#253452',
    marginTop: '-1%',
    marginLeft: '-10%',
  },
  recoveryPharseTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15%',
    width: '78%',
    alignSelf: 'center',
  },
  recoveryPhraseText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#253452',
  },
  subText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#9F9FA0',
    textAlign: 'center',
    width: '115%',
    marginTop: '4%',
  },
  securityMessageContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '88%',
    borderRadius: 15,
    height: '15%',
    marginTop: '7%',
    backgroundColor: '#F4F7FA',
  },
  languageButtonContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: '3%',
  },
  languageButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '22%',
    height: '28%',
    backgroundColor: '#F19220',
    borderRadius: 10,
    marginHorizontal: '2%',
  },
  englishText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
});
