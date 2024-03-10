import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../../components/CustomText';

const ImportWallet = () => {
  const [text, setText] = useState('');

  const handleChangeText = newText => {
    setText(newText);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/backIcon.png')}
          style={styles.backIcon}
        />
        <Text style={styles.walletText}>Import Wallet</Text>
        <Image
          source={require('../assets/images/scanner.png')}
          style={styles.scanIcon}
        />
      </View>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>Private Key/Recovery Phrase</Text>
      </View>
      <View style={styles.inputContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '85%',
            alignSelf: 'center',
            marginBottom: '3%',
          }}>
          <Text style={styles.inputHeaderText}>Secret Recovery Phrase</Text>
          <Text style={styles.inputHeaderText}>Show</Text>
        </View>

        <CustomTextInput
          placeholder="Enter your Secret Recovery Phase"
          onChangeText={handleChangeText}
          value={text}
        />
      </View>
      <View style={{marginTop: '5%'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '85%',
            alignSelf: 'center',
            marginBottom: '3%',
          }}>
          <Text style={styles.inputHeaderText}>New Password</Text>
          <Text style={styles.inputHeaderText}>Show</Text>
        </View>

        <CustomTextInput
          placeholder="New Password"
          onChangeText={handleChangeText}
          value={text}
        />
      </View>
      <View style={{marginTop: '5%'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '85%',
            alignSelf: 'center',
            marginBottom: '3%',
          }}>
          <Text style={styles.inputHeaderText}>confirm Password</Text>
        </View>

        <CustomTextInput
          place
          holder="Confirm Password"
          onChangeText={handleChangeText}
          value={text}
        />
      </View>
      <View style={styles.importButton}>
        <Text style={styles.importText}>Import</Text>
      </View>
    </View>
  );
};

export default ImportWallet;

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
    marginTop: '-1%',
  },
  scanIcon: {
    width: 25,
    height: 25,
  },
  headerTextContainer: {
    marginTop: '10%',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#253452',
  },
  inputHeaderText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#253452',
  },

  inputContainer: {
    marginTop: '20%',
  },
  importButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '40%',
    width: '85%',
    height: '6.5%',
    alignSelf: 'center',
    borderRadius: 15,
    backgroundColor: '#D5DFEB',
  },
  importText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#979797',
  },
});
