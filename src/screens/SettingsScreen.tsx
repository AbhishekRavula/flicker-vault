import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Text, Switch, Menu, Button, Icon, Avatar} from 'react-native-paper';
import {useAppTheme} from '../hooks/useAppTheme';
import i18n from '../../i18n';
import {useTranslation} from 'react-i18next';
import ProfileAvatar from '../assets/icons/Profile-Avatar.svg';

const SettingsScreen = () => {
  const {t} = useTranslation();
  const {theme, toggleTheme} = useAppTheme();

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const changeLanguague = (newLanguague: string) => {
    i18n.changeLanguage(newLanguague);
    closeMenu();
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.surface}]}>
      {/*Profile Avatar */}
      <View style={styles.profileContainer}>
        <Avatar.Image size={90} source={() => <ProfileAvatar />} />
        <View style={styles.profileDetailsContainer}>
          <Text style={styles.profileName}>{t('Worlder')}</Text>
          <Text style={styles.profileEmail}>{t('worlder@wolonote.com')}</Text>
        </View>
      </View>

      <View style={styles.optionsContainer}>
        {/* Theme Switch */}
        <View style={styles.switchContainer}>
          <View style={styles.labelContainer}>
            <Icon
              source="theme-light-dark"
              size={24}
              color={theme.colors.onSurface}
            />
            <Text style={[styles.label, {color: theme.colors.onSurface}]}>
              {t('Dark Theme')}
            </Text>
          </View>
          <Switch value={theme.dark} onValueChange={toggleTheme} />
        </View>

        {/* Language Switch */}
        <View style={styles.switchContainer}>
          <View style={styles.labelContainer}>
            <Icon source="web" size={24} color={theme.colors.onSurface} />
            <Text style={[styles.label, {color: theme.colors.onSurface}]}>
              {t('Language')}
            </Text>
          </View>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Button onPress={openMenu}>
                {i18n.language === 'en' ? t('English') : t('Malay')}
              </Button>
            }>
            <Menu.Item
              onPress={() => changeLanguague('en')}
              title={t('English')}
            />
            <Menu.Item
              onPress={() => changeLanguague('ms')}
              title={t('Malay')}
            />
          </Menu>
        </View>

        <View style={styles.switchContainer}>
          <View style={styles.labelContainer}>
            <Icon
              source="help-circle"
              size={24}
              color={theme.colors.onSurface}
            />
            <Text style={[styles.label, {color: theme.colors.onSurface}]}>
              {t('Help')}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    gap: 15,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    padding: 8,
  },
  profileDetailsContainer: {
    flex: 1,
    gap: 4,
  },
  profileName: {
    fontWeight: '600',
    fontSize: 18,
  },
  profileEmail: {
    fontWeight: '400',
    fontSize: 14,
  },
  optionsContainer: {
    paddingHorizontal: 10,
    flex: 1,
    gap: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
});
