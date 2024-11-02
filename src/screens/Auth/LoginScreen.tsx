import React, {useState} from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';
import {Button, HelperText, Text, TextInput} from 'react-native-paper';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAppTheme} from '../../hooks/useAppTheme';
import {AuthStackParamList} from '../../constants/types';
import {useAuth} from '../../hooks/useAuth';
import {useTranslation} from 'react-i18next';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Login'
>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const {theme} = useAppTheme();
  const {login} = useAuth();
  const {t} = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({email: '', password: '', general: ''});

  const validateForm = () => {
    let isValid = true;
    const newErrors = {email: '', password: '', general: ''};

    if (!email) {
      newErrors.email = t('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t('Email is invalid');
      isValid = false;
    }

    if (!password) {
      newErrors.password = t('Password is required');
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = () => {
    if (validateForm()) {
      Keyboard.dismiss();
      const error = login(email, password);
      if (error) {
        setErrors({...errors, general: error});
      }
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.surface}]}>
      <View style={styles.content}>
        <Text style={[styles.title, {color: theme.colors.onSurface}]}>
          {t('Login')}
        </Text>
        <View style={styles.form}>
          <View>
            <TextInput
              mode="outlined"
              label={t('Email')}
              value={email}
              onChangeText={text => {
                setEmail(text);
                setErrors({...errors, email: '', general: ''});
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              textColor={theme.colors.primary}
              left={
                <TextInput.Icon
                  icon="email"
                  color={theme.colors.primary}
                  size={30}
                />
              }
              style={styles.input}
              outlineColor={theme.colors.onSurface}
              theme={{colors: {onSurfaceVariant: theme.colors.onSurface}}}
              error={!!errors.email}
            />
            <HelperText type="error" visible={!!errors.email}>
              {errors.email}
            </HelperText>
          </View>
          <View>
            <TextInput
              mode="outlined"
              label={t('Password')}
              value={password}
              onChangeText={text => {
                setPassword(text);
                setErrors({...errors, password: '', general: ''});
              }}
              secureTextEntry={!showPassword}
              left={
                <TextInput.Icon
                  icon="lock"
                  color={theme.colors.primary}
                  size={30}
                />
              }
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                  color={theme.colors.onSurface}
                />
              }
              style={styles.input}
              placeholderTextColor={theme.colors.onSurface}
              outlineColor={theme.colors.onSurface}
              theme={{colors: {onSurfaceVariant: theme.colors.onSurface}}}
              error={!!errors.password}
            />
            <HelperText type="error" visible={!!errors.password}>
              {errors.password}
            </HelperText>
          </View>

          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.button}
            labelStyle={[
              styles.loginButtonText,
              {color: theme.colors.background},
            ]}
            contentStyle={styles.buttonContent}>
            {t('Login')}
          </Button>

          {errors.general ? (
            <HelperText
              type="error"
              visible={!!errors.general}
              style={styles.genericError}>
              {errors.general}
            </HelperText>
          ) : null}

          <View style={styles.footer}>
            <Text style={styles.noAccount}>
              {t("Haven't made an account?")}
            </Text>
            <Button
              mode="text"
              compact
              onPress={() => navigation.navigate('Signup')}
              labelStyle={styles.signUp}>
              {t('Sign Up')}
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
  },
  form: {
    gap: 8,
  },
  input: {
    height: 56,
  },
  button: {
    marginTop: 8,
    borderRadius: 4,
  },
  buttonContent: {
    height: 52,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  noAccount: {
    fontSize: 13,
    fontWeight: '400',
  },
  signUp: {
    color: '#95ACFF',
    fontSize: 13,
    fontWeight: '400',
  },
  loginButtonText: {
    fontWeight: '700',
    fontSize: 14,
  },
  genericError: {
    textAlign: 'center',
  },
});

export default LoginScreen;
