import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppBackground, TextComponent, Button, Loader } from '../../Components';
import { ColorTheme } from '../../assets';
import AppStyles from '../../utils/AppStyles';
import { AuthStackParamList, RootStackParamList } from '../../navigation/types';
import { useAuth } from '../../context/AuthContext';
import { storeUser } from '../../utils/storage';

type SignupScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList & RootStackParamList, 'Signup'>;

const SignupScreen = () => {
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      await storeUser({ name, email, password });
      setLoading(false);
      login(email); // Pass email to login function
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Failed to create account');
      }
    }
  };

  return (
    <AppBackground>
      <View style={styles.container}>
        <View style={styles.form}>
          <TextComponent style={styles.title}>Task Explorer</TextComponent>
          <TextComponent style={styles.subtitle}>Create your account</TextComponent>

          {error && (
            <TextComponent style={styles.error}>{error}</TextComponent>
          )}

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor={ColorTheme.Grey}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

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
            text="Sign Up"
            onPress={handleSignup}
            buttonStyle={styles.signupButton}
            disable={!name || !email || !password}
          />

          <View style={styles.loginContainer}>
            <TextComponent>Already have an account? </TextComponent>
            <Button
              text="Login"
              onPress={() => navigation.navigate('Login')}
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
  signupButton: {
    marginTop: 8,
  },
  error: {
    color: ColorTheme.Error,
    marginBottom: 16,
    textAlign: 'center',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  loginText: {
    color: ColorTheme.ThemeColor,
    fontWeight: 'bold',
  },
});

export default SignupScreen;