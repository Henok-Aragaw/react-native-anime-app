import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { getAnimeDetails } from '@/service/api';

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Fetch logic with TanStack Query
  const { data: anime, isLoading, error } = useQuery({
    queryKey: ['animeDetails', id], // Unique Key includes ID
    queryFn: () => getAnimeDetails(id as string), // Pass ID to axios function
    enabled: !!id, // Only run if ID exists
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#7c3aed" />
      </View>
    );
  }

  if (error || !anime) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-red-500">Error loading details.</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-4">
            <Text className="text-blue-500">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ paddingBottom: 40 }}>
      <Image 
        source={{ uri: anime.images.jpg.large_image_url }} 
        className="w-full h-96"
        resizeMode="cover"
      />
      
      <TouchableOpacity 
        onPress={() => router.back()}
        className="absolute top-12 left-4 bg-black/40 p-2 rounded-full"
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <View className="px-5 -mt-10 bg-white rounded-t-3xl pt-8 h-full">
        <Text className="text-3xl font-extrabold text-gray-900 text-center mb-2">
          {anime.title}
        </Text>
        
        {/* Chips */}
        <View className="flex-row justify-center space-x-3 mb-6">
            <View className="bg-purple-100 px-3 py-1 rounded-full">
                <Text className="text-purple-700 font-bold">{anime.type}</Text>
            </View>
            <View className="bg-yellow-100 px-3 py-1 rounded-full">
                <Text className="text-yellow-700 font-bold">★ {anime.score}</Text>
            </View>
        </View>

        <Text className="text-xl font-bold text-gray-800 mb-2">Synopsis</Text>
        <Text className="text-gray-600 leading-6 text-base">
          {anime.synopsis}
        </Text>

        {/* Stats Grid */}
        <View className="flex-row justify-between mt-8 p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <View className="items-center">
            <Text className="text-gray-400 text-xs uppercase font-bold">Episodes</Text>
            <Text className="text-gray-800 font-bold text-lg">{anime.episodes || '?'}</Text>
          </View>
          <View className="w-[1px] bg-gray-200" />
          <View className="items-center">
            <Text className="text-gray-400 text-xs uppercase font-bold">Year</Text>
            <Text className="text-gray-800 font-bold text-lg">{anime.year || 'N/A'}</Text>
          </View>
          <View className="w-[1px] bg-gray-200" />
          <View className="items-center">
            <Text className="text-gray-400 text-xs uppercase font-bold">Status</Text>
            <Text className="text-green-600 font-bold text-lg">
                {anime.status === 'Finished Airing' ? 'Done' : 'Air'}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}