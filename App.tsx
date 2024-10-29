import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import './i18n';
import {useTranslation} from 'react-i18next';
import {toggleLanguage} from './src/utils/languaueUtils';

function App(): React.JSX.Element {
  const {t} = useTranslation();

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Text>Flicker Vault</Text>
      <Text>{t('Login')}</Text>
      <Button
        onPress={() => {
          toggleLanguage();
        }}>
        Change
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({});

export default App;
