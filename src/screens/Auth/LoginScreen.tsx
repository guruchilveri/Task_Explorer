import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppBackground, TextComponent, Button, Loader } from '../../Components';
import { ColorTheme } from '../../assets';
import AppStyles from '../../utils/AppStyles';
import { AuthStackParamList } from '../../navigation/types';
import { useAuth } from '../../context/AuthContext';
import { validateUser } from '../../utils/storage';

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const user = await validateUser(email, password);
      if (user) {
        setLoading(false);
        login(email); // Pass email to login function
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <AppBackground>
      <View style={styles.container}>
        <View style={styles.form}>
          <TextComponent style={styles.title}>Task Explorer</TextComponent>
          <TextComponent style={styles.subtitle}>Login to your account</TextComponent>

          {error && (
            <TextComponent style={styles.error}>{error}</TextComponent>
          )}

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={ColorTheme.Grey}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={ColorTheme.Grey}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Button
            text="Login"
            onPress={handleLogin}
            buttonStyle={styles.loginButton}
            disable={!email || !password}
          />

          <View style={styles.signupContainer}>
            <TextComponent>Don't have an account? </TextComponent>
            <Button
              text="Sign up"
              onPress={() => navigation.navigate('Signup')}
              buttonStyle={{
                backgroundColor: 'transparent',
                elevation: 0,
                shadowOpacity: 0,
                paddingVertical: 4,
                paddingHorizontal: 8,
              }}
              textStyle={{
                color: ColorTheme.ThemeColor,
                fontWeight: 'bold',
              }}
            />
          </View>
        </View>
      </View>
      <Loader isVisible={loading} />
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  form: {
    backgroundColor: ColorTheme.White,
    borderRadius: 8,
    padding: 16,
    ...AppStyles.shadow,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: ColorTheme.Grey,
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: ColorTheme.LightGrey,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    color: ColorTheme.Black,
  },
  loginButton: {
    marginTop: 8,
  },
  error: {
    color: ColorTheme.Error,
    marginBottom: 16,
    textAlign: 'center',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  signupText: {
    color: ColorTheme.ThemeColor,
    fontWeight: 'bold',
  },
});

export default LoginScreen;