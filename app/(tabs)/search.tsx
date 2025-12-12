import { View, Text, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchAnime } from '@/service/api';
import AnimeCard from '../../components/AnimeCard';
import { Ionicons } from '@expo/vector-icons';

export default function SearchTab() {
  const [query, setQuery] = useState('');

  const { data: searchResults = [], isLoading } = useQuery({
    queryKey: ['searchAnime', query],
    queryFn: () => searchAnime(query),
    enabled: query.length > 2,
  });

  return (
    <SafeAreaView className="flex-1 bg-white px-4">

      <Text className="text-2xl font-bold mb-4 text-gray-900 mt-2">Search</Text>

      {/* Search Box */}
      <View className="flex-row items-center bg-gray-100 p-3 rounded-xl mb-4">
        <Ionicons name="search" size={20} color="gray" />
        
        <TextInput
          placeholder="Search Naruto, One Piece..."
          className="flex-1 ml-2 text-gray-800 text-base"
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
        />

        {query.length > 0 && (
          <Ionicons
            name="close-circle"
            size={20}
            color="gray"
            onPress={() => setQuery('')}
          />
        )}
      </View>

      {/* Results / Loader */}
      {isLoading ? (
        <ActivityIndicator size="small" color="#7c3aed" className="mt-10" />
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item: any) => item.mal_id.toString()}
          renderItem={({ item }) => <AnimeCard item={item} />}
          ListEmptyComponent={
            query.length > 2 ? (
              <Text className="text-center text-gray-400 mt-10">No results found</Text>
            ) : (
              <Text className="text-center text-gray-400 mt-10">Type to search...</Text>
            )
          }
        />
      )}
    </SafeAreaView>
  );
}
