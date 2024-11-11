import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Games from '../../componentes/games';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import database from '../../config/firebaseconfig'; 
import { collection, getDocs } from 'firebase/firestore';

const Home = () => {
  const navigation = useNavigation();
  
  const [gamesData, setGamesData] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [selectedCategory, setSelectedCategory] = useState('Todos'); // Categoria selecionada

  // Definindo as categorias possíveis
  const categories = ['Todos', 'Aventura', 'Sci-fi', 'Tiro', 'Plataforma', 'Estratégia'];

  // Mapeamento de imagens baseado no nome
  const imageMapping = {
    'stillalive': require('../../../assets/stillalive.png'),
    'sunset': require('../../../assets/sunset.png'),
    'arcadion': require('../../../assets/arcadion.png'),
    'starscape': require('../../../assets/starscape.png'),
    'aether': require('../../../assets/aether.png'),
    'leatstorm': require('../../../assets/leatstorm.png'),
    'perennial': require('../../../assets/perennial.png'),
    'sharprain': require('../../../assets/sharprain.png'),
    'snakeskin': require('../../../assets/snakeskin.png'),
    'wefall': require('../../../assets/wefall.png'),
  };

  useEffect(() => {
    const fetchGamesData = async () => {
      try {
        const gamesCollectionRef = collection(database, 'games');
        const querySnapshot = await getDocs(gamesCollectionRef);
        const fetchedGamesData = querySnapshot.docs.map(doc => {
          const gameData = doc.data();
          return {
            id: doc.id,
            nome: gameData.nome,
            valor: gameData.valor,
            nome_img: gameData.nome_img,
            category: gameData.category,
            description: gameData.description
          };
        });
        setGamesData(fetchedGamesData);
      } catch (error) {
        console.error("Erro ao buscar dados do Firebase", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGamesData();
  }, []);

  const filteredGames = gamesData.filter(game => {
    if (selectedCategory === 'Todos') {
      return true;
    }
    return game.category === selectedCategory;
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF4081" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../../../assets/bannercartoon.png')}
          style={styles.image}
          resizeMode='cover' />
        
        <View style={styles.textContainer}>
          <Text style={[styles.text, { color: 'white', marginTop: 4}]}>Loja</Text>
          <TouchableOpacity style={{alignSelf: 'center' }}>
            <MaterialIcons name="shopping-bag" size={26} color="#FF4081" />
          </TouchableOpacity>
  
          <TouchableOpacity onPress={() => navigation.navigate('Biblioteca')} style={{alignSelf: 'center', marginLeft: 70, flexDirection:'row', backgroundColor:'#FF4081', padding: 9, borderRadius: 50}}>
            <Text style={[styles.text, {fontSize:20, color:'white'}]}>Minha Biblioteca</Text>
            <MaterialIcons name="videogame-asset" size={26} color="#1E1E2F" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.line} />

      {/* Filtro de Categorias */}
      <View style={styles.categoryFilter}>
        {categories.map(category => (
          <TouchableOpacity 
            key={category} 
            style={[styles.categoryButton, selectedCategory === category && styles.selectedCategoryButton]}
            onPress={() => setSelectedCategory(category)}>
            <Text style={[styles.categoryText, selectedCategory === category && styles.selectedCategoryText]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.content}>
        <ScrollView style={styles.containerGames}>
          <Text style={styles.text}>{selectedCategory === 'Todos' ? 'LANÇAMENTOS' : selectedCategory}</Text>

          <View style={styles.gamesGrid}>
            {filteredGames.map((game) => {
              const image = imageMapping[game.nome_img] || require('../../../assets/default.png');
              return (
                <Games
                  key={game.id}
                  img={image}
                  cost={`R$${game.valor}`}
                  onClick={() => navigation.navigate('Detail', { gameId: game.id, gameName: game.nome, gameValue: game.valor, gameImage: image, gameDescription: game.description })}
                >
                  {game.nome}
                </Games>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#1E1E2F',
  },
  header: {
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 130,
  },
  text: {
    fontSize: 26,
    marginHorizontal: '2%',
    fontFamily: 'Roboto',
    color: '#A8A8B3',
  },
  textContainer: {
    marginVertical: '5%',
    marginHorizontal: '5%',
    flexDirection: 'row',
  },
  line: {
    borderBottomColor: "#FF3D00",
    borderBottomWidth: 2,
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E2F',
  },
  categoryFilter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  categoryButton: {
    marginHorizontal: 5,
    marginVertical: 5,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#3C3C4F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCategoryButton: {
    backgroundColor: '#FF4081',
  },
  categoryText: {
    color: '#A8A8B3',
    fontSize: 16,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  containerGames: {
    flex: 1,
  },
  gamesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});

export default Home;
