import {
    NavigationContainer,
    NavigationProp,
    ParamListBase,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const Stack = createStackNavigator();

const HomeScreen = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const handleLoginPromptPress = () => {
    navigation.navigate('Üyeyim');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image
          source={{ uri: 'https://www.upload.ee/image/16657787/Group.png' }}
          style={styles.logo}
        />
        <TouchableOpacity
          onPress={handleLoginPromptPress}
          style={styles.loginPromptButton}>
          <Text style={styles.loginPrompt}>Zaten üye misin?</Text>
        </TouchableOpacity>

        <TextInput placeholder="isim" style={styles.input} />
        <TextInput placeholder="Soyisim" style={styles.input} />
        <TextInput placeholder="E-posta" style={styles.input} />
        <TextInput placeholder="Cep Telefonu" style={styles.input} />
        <TextInput placeholder="Doğum Tarihi" style={styles.input} />

        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Devam</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleButton}>
          <View style={styles.buttonContent}>
            <Image
              source={{
                uri: 'https://www.upload.ee/image/16657955/google-__178_.png',
              }}
              style={styles.buttonLogo}
            />
            <Text style={styles.googleButtonText}>Google ile devam et</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.appleButton}>
          <View style={styles.buttonContent}>
            <Image
              source={{ uri: 'https://www.upload.ee/image/16657957/apple.png' }}
              style={styles.buttonLogo}
            />
            <Text style={styles.appleButtonText}>Apple ile devam et</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.footerTarladanText}>Tarla’dan</Text>
        <Text style={styles.footerText}>direkt evinize organik ve taze</Text>
        <Text style={styles.footerSubText}>
          Üreticilerden günlük olarak toplanan taze ürünleri listeleyin ve hemen
          kapınıza gelsin.
        </Text>
      </View>
    </ScrollView>
  );
};

const SignInScreen = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const handleSignUpPromptPress = () => {
    navigation.navigate('Üye Ol');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image
          source={{ uri: 'https://www.upload.ee/image/16657787/Group.png' }}
          style={styles.logo}
        />
        <TouchableOpacity onPress={handleSignUpPromptPress}>
          <Text style={styles.loginPrompt}>Üyeliğin yok mu?</Text>
        </TouchableOpacity>

        <TextInput
          placeholder="E-posta veya Cep Telefonu"
          style={styles.input}
        />
        <TextInput
          placeholder="Şifre"
          secureTextEntry={true}
          style={styles.input}
        />

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Şifremi unuttum</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Devam</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleButton}>
          <View style={styles.buttonContent}>
            <Image
              source={{
                uri: 'https://www.upload.ee/image/16657955/google-__178_.png',
              }}
              style={styles.buttonLogo}
            />
            <Text style={styles.googleButtonText}>Google ile devam et</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.appleButton}>
          <View style={styles.buttonContent}>
            <Image
              source={{ uri: 'https://www.upload.ee/image/16657957/apple.png' }}
              style={styles.buttonLogo}
            />
            <Text style={styles.appleButtonText}>Apple ile devam et</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.footerTarladanText}>Tarla’dan</Text>
        <Text style={styles.footerText}>direkt evinize organik ve taze</Text>
        
        <Text style={styles.footerSubText}>
          Üreticilerden günlük olarak toplanan taze ürünleri listeleyin ve hemen
          kapınıza gelsin.
        </Text>
      </View>
    </ScrollView>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Üye Ol" component={HomeScreen} />
        <Stack.Screen name="Üyeyim" component={SignInScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  loginPromptButton: {
    marginBottom: 20,
  },
  loginPrompt: {
    textDecorationLine: 'underline',
    fontSize: 16,
    marginBottom: 10,


  },
  forgotPassword: {
    textDecorationLine: 'underline',
    color: '#757575',
    alignSelf: 'flex-end',
    marginBottom: 40,
    marginRight: 250,
  },
  input: {
    width: '100%',
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#fff',
    marginBottom: 15,
    borderColor: '#e0e0e0',
    borderWidth: 1,
  },
  continueButton: {
    width: '50%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#4caf50',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 183,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  googleButton: {
    width: '100%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#db4437',
    alignItems: 'center',
    marginBottom: 10,
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 70,
  },
  appleButton: {
    width: '100%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#000',
    alignItems: 'center',
    marginBottom: 20,
  },
  appleButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 70,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonLogo: {
    width: 20,
    height: 20,
    marginLeft: -90,
  },
  footerTarladanText: {
    fontSize: 40,
    color: '#000000',
    fontWeight: 'bold',
    marginLeft: -200,
  },
  footerText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginRight: 30,
    marginBottom: 5,
  },
  footerSubText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#757575',
    marginBottom: 5,
  },
});

export default App;
