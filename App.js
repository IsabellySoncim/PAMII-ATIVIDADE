import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, View, Platform } from 'react-native';
import { TextInput, Text, Button } from 'react-native-paper';
import { useState } from 'react';

const webAlert = (title, description) => {
    window.confirm([title, description].filter(Boolean).join('\n'));
}

const alert = Platform.OS === 'web' ? webAlert : Alert.alert;

export default function App() {
  const [cep, setCep] = useState("");
  const [render, setRender] = useState({});


  const ValidaCPF = (cpf) => {
    const cpfRegex = /^[0-9]{11}$/;

    console.log(cpf);
    if (!cpfRegex.test(cpf)) {
      alert("CPF Inválido", "Por favor, insira um CPF válido com 11 dígitos numéricos.");
    }
  }


  const ValidaTelefone = (telefone) => {
    const telefoneRegex = /^[0-9]{11}$/;

    console.log(telefone);
    if (!telefoneRegex.test(telefone)) {
      alert("Telefone Inválido", "Por favor, insira um numero de telefone válido com DDD + 8 dígitos numéricos.");
    }
  }


  const Validanascimento = (datanascimento) => {
    const datanascimentoRegex = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

    console.log(datanascimento);
    if (!datanascimentoRegex.test(datanascimento)) {
      alert("Data de nascimento incorreta", "Por favor, insira uma data de nascimento no formato válido com DD/MM/YYYY");
    }
  }


  const BuscaCep = (cep) => {
    const cepRegex = /^[0-9]{8}$/;

    if (!cepRegex.test(cep)) {
      alert("CEP Inválido", "Por favor, insira um CEP válido com 8 dígitos numéricos.");
      return;
    }

    let url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
      .then((resp) => resp.json())
      .then((dados) => {
        if (dados.erro) {
          alert("CEP não encontrado", "Verifique se o CEP está correto.");
        } else {
          setRender(dados);
        }
      })
      .catch((erro) => {
        console.log(erro);
        alert("Erro", "Ocorreu um erro na busca do CEP.");
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CADASTRO BIBLIOTECA</Text>

      <TextInput
        label={'Nome'}
        mode='outlined'
        style={styles.input}
        theme={{ colors: { primary: '#333', background: '#D8BFD8' } }}
      />

      <TextInput
        label={'CPF'}
        mode='outlined'
        style={styles.input}
        onBlur={(event) => ValidaCPF(event.nativeEvent.text)}
        theme={{ colors: { primary: '#333', background: '#D8BFD8' } }}
      />

      <TextInput
        label={'Email'}
        mode='outlined'
        style={styles.input}
        theme={{ colors: { primary: '#333', background: '#D8BFD8' } }}
      />

      <TextInput
        label={'Telefone'}
        mode='outlined'
        style={styles.input}
        onBlur={(event) => ValidaTelefone (event.nativeEvent.text)}
        theme={{ colors: { primary: '#333', background: '#D8BFD8' } }}
      />

      <TextInput
        label={'Data de Nascimento'}
        mode='outlined'
        style={styles.input}
        onBlur={(event) => Validanascimento (event.nativeEvent.text)}
        theme={{ colors: { primary: '#333', background: '#D8BFD8' } }}
      />

      <TextInput
        label={'CEP:'}
        mode='outlined'
        keyboardType='numeric'
        maxLength={8}
        onChangeText={(value) => setCep(value)}
        style={styles.input}
        theme={{ colors: { primary: '#333', background: '#D8BFD8' } }}
      />

      <Button 
        icon="magnify"
        onPress={() => BuscaCep(cep)}
        mode="contained"
        style={{ marginTop: 20 }}
      >
        Buscar
      </Button>

      <TextInput
        label={'Endereço'}
        value={render.logradouro}
        mode='outlined'
        disabled
        style={styles.input}
        theme={{ colors: { primary: '#333', background: '#D8BFD8' } }}
      />

      <TextInput
        label={'Bairro'}
        value={render.bairro}
        mode='outlined'
        disabled
        style={styles.input}
        theme={{ colors: { primary: '#333', background: '#D8BFD8' } }}
      />

      <TextInput
        label={'Cidade'}
        value={render.localidade}
        mode='outlined'
        disabled
        style={styles.input}
        theme={{ colors: { primary: '#333', background: '#D8BFD8' } }}
      />
      <TextInput
        label={'Estado'}
        value={render.uf}
        mode='outlined'
        disabled
        style={styles.input}
        theme={{ colors: { primary: '#333', background: '#D8BFD8' } }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9370DB',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 10,
  },
  title: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold', // Título principal em negrito
    marginBottom: 20
  },
  input: {
    width: '30%',
  }
});
