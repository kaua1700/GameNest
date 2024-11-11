import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import database from '../../config/firebaseconfig';
import { collection, getDocs } from 'firebase/firestore';

const Biblioteca = () => {
  const navigation = useNavigation();
  const [gamesData, setGamesData] = useState([]);
  const [loading, setLoading] = useState(true);

  navigation.setOptions({
    headerTitle: "",
    headerStyle: {
      backgroundColor: '#1E1E2F', 
      borderBottomWidth: 0, // 
    },
    headerTintColor: '#FF4081', 
  });


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
            nome_img: gameData.nome_img,
            description: gameData.description,
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
        <Text style={styles.headerText}>Minha Biblioteca</Text>
        <Text style={styles.motivationalText}>Explore sua coleção e divirta-se!</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.libraryContent}>
          {gamesData.length === 0 ? (
            <View style={styles.noGamesContainer}>
              <Text style={styles.noGamesText}>Ainda não há jogos na sua biblioteca.</Text>
            </View>
          ) : (
            gamesData.map((game) => {
              const image = imageMapping[game.nome_img] || require('../../../assets/default.png');
              return (
                <TouchableOpacity
                  key={game.id}
                  style={styles.gameCard}
                  
                >
                  <Image source={image} style={styles.gameImage} />
                  <View style={styles.gameDetails}>
                    <Text style={styles.gameName}>{game.nome}</Text>
                    <Text style={styles.gameDescription}>{game.description}</Text>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>
      </ScrollView>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E2F',
  },
  header: {
    backgroundColor: '#FF4081',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
  },
  motivationalText: {
    fontSize: 16,
    color: '#A8A8B3',
    marginTop: 5,
    fontStyle: 'italic',
  },
  scrollView: {
    padding: 10,
  },
  libraryContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  gameCard: {
    backgroundColor: '#3C3C4F',
    borderRadius: 12,
    width: '48%',
    marginBottom: 15,
    elevation: 6,
    overflow: 'hidden',
    position: 'relative',
  },
  gameImage: {
    width: '100%',
    height: 220,
    borderRadius: 12,
  },
  gameDetails: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  gameName: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  gameDescription: {
    fontSize: 14,
    color: '#A8A8B3',
    fontStyle: 'italic',
  },
  noGamesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noGamesText: {
    fontSize: 20,
    color: '#A8A8B3',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E2F',
  },
  particlesImage: {
    position: 'absolute',
    top: 20,
    right: 10,
    width: 120,
    height: 120,
    opacity: 0.2,
  },
});

export default Biblioteca;
