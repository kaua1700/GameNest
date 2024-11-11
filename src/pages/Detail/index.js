import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const Detail = ({ route, navigation }) => {
  // Pegando os parâmetros passados da tela anterior
  const { gameId, gameName, gameValue, gameImage, gameDescription } = route.params;

  // Atualizando o título da barra de navegação com o nome do jogo
  navigation.setOptions({
    headerTitle: gameName,
    headerStyle: {
      backgroundColor: '#1E1E2F', 
      borderBottomWidth: 0, 
    },
    headerTintColor: '#FF4081', 
  });

  return (
    <ScrollView style={styles.container}>
      {/* Imagem principal do jogo */}
      <Image
        source={gameImage}
        style={styles.image}
        resizeMode='cover'
      />

      {/* Informações do jogo */}
      <View style={styles.detailsContainer}>
        <Text style={styles.price}>R${gameValue}</Text>
        <Text style={styles.gameTitle}>{gameName}</Text>
        <Text style={styles.description}>{gameDescription}</Text>
      </View>

      {/* Botão de compra */}
      <TouchableOpacity style={styles.buyButton} onPress={() => { /* Ação de compra */ }}>
        <Text style={styles.buyButtonText}>Comprar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E2F',
    paddingBottom: 20,  
  },
  image: {
    width: '100%',
    height: 400,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  detailsContainer: {
    padding: 20,
  },
  price: {
    fontFamily: 'Roboto',
    color: '#FF4081',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  gameTitle: {
    fontFamily: 'Roboto',
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  description: {
    fontFamily: 'Roboto',
    color: '#A8A8B3',
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 20,
  },
  buyButton: {
    backgroundColor: '#FF4081',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginHorizontal: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  buyButtonText: {
    fontFamily: 'Roboto',
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default Detail;
