import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import database from '../../config/firebaseconfig'; // Importando a configuração do Firebase

const Cadastro = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');  // Estado para mensagens de erro
  const [successMessage, setSuccessMessage] = useState(''); // Estado para a mensagem de sucesso
  const navigation = useNavigation();

  // Função para verificar se o email já está cadastrado
  const checkEmailExists = async (email) => {
    try {
      const usersRef = collection(database, 'users');
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty; // Retorna true se o email existir
    } catch (error) {
      console.error("Erro ao verificar email:", error);
      return false;
    }
  };

  // Função de cadastro
  const handleSignUp = async () => {
    if (username === '' || password === '') {
      setErrorMessage('Por favor, preencha todos os campos!');
      return;
    }

    const emailExists = await checkEmailExists(username);
    if (emailExists) {
      setErrorMessage('Este email já está cadastrado!');
      return;
    }

    // Cadastrar o novo usuário
    try {
      const newUser = {
        email: username,
        senha: password,
      };
      await addDoc(collection(database, 'users'), newUser);

      // Exibe a mensagem de sucesso
      setSuccessMessage('Cadastro realizado com sucesso!');
      setErrorMessage(''); // Limpar mensagem de erro, se houver

      // Limpa os campos de input
      setUsername('');
      setPassword('');

      // Espera 2 segundos antes de redirecionar para o login
      setTimeout(() => {
        navigation.navigate('Login'); // Após cadastro, redireciona para a tela de login
      }, 2000);

    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      setErrorMessage('Erro ao realizar cadastro.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/logo.jpeg')} style={styles.logo} />
      <Text style={styles.title}>Crie sua conta</Text>
      <Text style={styles.subtitle}>Preencha os campos abaixo para criar uma nova conta.</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#bbb"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#bbb"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      {/* Exibe a mensagem de erro se houver */}
      {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}
      
      {/* Exibe a mensagem de sucesso se houver */}
      {successMessage !== '' && <Text style={styles.successText}>{successMessage}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Já tem uma conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Entrar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.orContainer}>
        <View style={styles.orLine} />
        <Text style={styles.orText}>OU</Text>
        <View style={styles.orLine} />
      </View>

      <TouchableOpacity style={styles.googleButton}>
        <Text style={styles.googleButtonText}>Cadastrar com Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#121212',
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#BB86FC',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#1e1e1e',
    color: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#bbb',
    fontSize: 14,
  },
  loginText: {
    color: '#03DAC5',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  errorText: {
    color: '#FF0000',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  successText: {
    color: '#4CAF50',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    justifyContent: 'center',
  },
  orLine: {
    height: 1,
    backgroundColor: '#bbb',
    flex: 1,
  },
  orText: {
    marginHorizontal: 10,
    color: '#bbb',
  },
  googleButton: {
    backgroundColor: '#DB4437',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Cadastro;
