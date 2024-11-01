import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {Button} from 'react-native-paper';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../constants/types';
import {useTranslation} from 'react-i18next';
import {useAppTheme} from '../../hooks/useAppTheme';

type LandingScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Landing'
>;

interface Props {
  navigation: LandingScreenNavigationProp;
}

const LandingScreen: React.FC<Props> = ({navigation}) => {
  const {theme} = useAppTheme();
  const {t} = useTranslation();

  return (
    <ImageBackground
      source={require('../../assets/images/landing-bg.jpeg')}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.container}>
        <View
          style={[
            styles.buttonContainer,
            {backgroundColor: theme.colors.elevation.level1},
          ]}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Login')}
            style={styles.button}
            contentStyle={styles.buttonContent}
            labelStyle={[styles.buttonLabel, {color: theme.colors.background}]}>
            {t('Login')}
          </Button>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('Signup')}
            style={[
              styles.button,
              styles.signUpButton,
              {borderColor: theme.colors.primary},
            ]}
            contentStyle={styles.buttonContent}
            labelStyle={[styles.buttonLabel, {color: theme.colors.primary}]}>
            {t('Sign Up')}
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    gap: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 30,
    paddingHorizontal: 15,
    opacity: 0.9,
  },
  button: {
    borderRadius: 4,
  },
  buttonContent: {
    height: 52,
  },
  buttonLabel: {
    fontWeight: '700',
    fontSize: 14,
  },
  signUpButton: {
    borderWidth: 2,
  },
});

export default LandingScreen;
