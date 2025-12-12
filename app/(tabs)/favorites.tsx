import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFavorites } from '@/context/FavoritesContext';
import AnimeCard from '../../components/AnimeCard';
import { Ionicons } from '@expo/vector-icons';

export default function FavoritesTab() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <Ionicons name="heart-circle-outline" size={100} color="#ddd" />
        <Text className="text-xl font-bold text-gray-400 mt-4">
          No Favorites Yet
        </Text>
        <Text className="text-gray-400 mt-2">
          Start adding anime to your list!
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-4">
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.mal_id.toString()}
        renderItem={({ item }) => <AnimeCard item={item} />}
      />
    </SafeAreaView>
  );
}
