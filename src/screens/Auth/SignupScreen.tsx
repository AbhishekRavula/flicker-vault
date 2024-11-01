import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, HelperText, Text, TextInput} from 'react-native-paper';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAppTheme} from '../../hooks/useAppTheme';
import {AuthStackParamList} from '../../constants/types';
import {useAuth} from '../../hooks/useAuth';
import {useTranslation} from 'react-i18next';

type SignupScreenScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Signup'
>;

interface Props {
  navigation: SignupScreenScreenNavigationProp;
}

const SignupScreen: React.FC<Props> = ({navigation}) => {
  const {theme} = useAppTheme();
  const {signup} = useAuth();
  const {t} = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: '',
    general: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {email: '', username: '', password: '', general: ''};

    if (!email) {
      newErrors.email = t('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t('Email is invalid');
      isValid = false;
    }

    if (!username) {
      newErrors.username = t('Username is required');
      isValid = false;
    }

    if (!password) {
      newErrors.password = t('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = t('Password must be at least 6 characters');
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignUp = () => {
    if (validateForm()) {
      const error = signup(username, email, password);
      if (error) {
        setErrors({...errors, general: error});
      }
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.surface}]}>
      <View style={styles.content}>
        <Text style={[styles.title, {color: theme.colors.onSurface}]}>
          {t('Sign Up')}
        </Text>
        <View style={styles.form}>
          <View>
            <TextInput
              mode="outlined"
              label={t('Email')}
              value={email}
              onChangeText={text => {
                setEmail(text);
                setErrors({...errors, email: ''});
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
              label={t('Username')}
              value={username}
              onChangeText={text => {
                setUsername(text);
                setErrors({...errors, username: ''});
              }}
              autoCapitalize="none"
              textColor={theme.colors.primary}
              left={
                <TextInput.Icon
                  icon="account"
                  color={theme.colors.primary}
                  size={30}
                />
              }
              style={styles.input}
              outlineColor={theme.colors.onSurface}
              theme={{colors: {onSurfaceVariant: theme.colors.onSurface}}}
              error={!!errors.username}
            />
            <HelperText type="error" visible={!!errors.username}>
              {errors.username}
            </HelperText>
          </View>

          <View>
            <TextInput
              mode="outlined"
              label={t('Password')}
              value={password}
              onChangeText={text => {
                setPassword(text);
                setErrors({...errors, password: ''});
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
            onPress={handleSignUp}
            style={styles.button}
            labelStyle={[
              styles.createAccountButtonText,
              {
                color: theme.colors.background,
              },
            ]}
            contentStyle={styles.buttonContent}>
            {t('Create Account')}
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
              {t('Already have an account?')}
            </Text>
            <Button
              mode="text"
              compact
              onPress={() => navigation.navigate('Login')}
              labelStyle={styles.login}>
              {t('Login')}
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
  login: {
    color: '#95ACFF',
    fontSize: 13,
    fontWeight: '400',
  },
  createAccountButtonText: {
    fontWeight: '700',
    fontSize: 14,
  },
  genericError: {
    textAlign: 'center',
  },
});

export default SignupScreen;
