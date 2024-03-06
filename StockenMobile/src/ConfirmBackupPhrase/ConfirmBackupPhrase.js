import {StyleSheet, Text, View, Image, TextInput} from 'react-native';
import React from 'react';

const ConfirmBackupPhrase = ({
  placeholder,
  onChangeText,
  value,
  handleFocus,
  handleBlur,
}) => {
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

      <View style={styles.securityPhraseContainer}>
        <View style={styles.securityPhraseTextContainer}>
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.countingText}>1</Text>
              <Text style={styles.namesText}>history</Text>
            </View>
            <View style={{flexDirection: 'row', marginVertical: '10%'}}>
              <Text style={styles.countingText}>2</Text>
              <Text style={styles.namesText}>novel</Text>
            </View>
          </View>
          <View>
            <View style={styles.inputContainer}>
              <TextInput
                caretColor="red"
                placeholderTextColor={'grey'}
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
                style={styles.input}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                caretColor="red"
                placeholderTextColor={'grey'}
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
                style={styles.input}
              />
            </View>
          </View>
        </View>
      </View>
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
      <View style={styles.importButton}>
        <View style={styles.alertContainer}>
          <View style={styles.alertView}>
            <Text style={styles.alertText}>!</Text>
          </View>
          <Text style={styles.importText}>
            Please select word #6 from the list
          </Text>
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
    height: 35,
    backgroundColor: '#F19220',
    borderRadius: 10,
    marginHorizontal: '2%',
  },
  englishText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  securityMessageContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '88%',
    borderRadius: 15,
    height: '12%',
    marginTop: '7%',
    backgroundColor: '#F4F7FA',
  },
  alertImage: {
    width: 38,
    height: 40,
    marginTop: '2%',
  },
  securityText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#000000',
    textAlign: 'center',
    width: '85%',
  },
  securityPhraseContainer: {
    alignSelf: 'center',
    width: '87%',
    height: 121,
    borderRadius: 15,
    marginTop: '10%',
    backgroundColor: '#F4F7FA',
  },
  securityPhraseTextContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: '8%',
  },
  countingText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#B7BECD',
    marginHorizontal: '8%',
  },
  namesText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#253452',
  },
  inputContainer: {
    width: 133,
    height: 35,
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  input: {
    height: 50,
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: 8,
    marginTop: '-5%',
    color: '#B7BECD',
  },
  importButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '80%',
    width: '85%',
    height: '6.5%',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#D5DFEB',
  },
  importText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#253452',
  },
  alertContainer: {
    flexDirection: 'row',
    marginLeft: '-10%',
    marginTop: '2%',
  },
  alertView: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#F19220',
    marginHorizontal: '3%',
  },
  alertText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#ffffff',
    alignSelf: 'center',
  },
});
