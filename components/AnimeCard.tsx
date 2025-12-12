import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '@/context/FavoritesContext';

interface AnimeCardProps {
  item: any;
}

const AnimeCard = ({ item }: AnimeCardProps) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(item.mal_id);

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(item.mal_id);
    } else {
      addFavorite(item);
    }
  };

  return (
    <Link href={`/details/${item.mal_id}`} asChild>
      <TouchableOpacity className="flex-row bg-gray-100 p-3 rounded-xl mb-3 items-center shadow-sm">

        <Image
          source={{ uri: item.images.jpg.image_url }}
          className="w-20 h-28 rounded-lg"
          resizeMode="cover"
        />

        <View className="flex-1 ml-4">
          <Text className="text-lg font-bold text-gray-800" numberOfLines={2}>
            {item.title}
          </Text>

          <Text className="text-gray-500 mt-1">Rating: {item.score}</Text>

          <Text className="text-blue-500 text-sm mt-2 font-medium">
            {item.year || 'N/A'}
          </Text>
        </View>

        {/* Favorite Button */}
        <TouchableOpacity onPress={toggleFavorite} className="ml-4">
          <Ionicons
            name={favorite ? 'heart' : 'heart-outline'}
            size={24}
            color={favorite ? '#ef4444' : '#999'}
          />
        </TouchableOpacity>

      </TouchableOpacity>
    </Link>
  );
};

export default AnimeCard;
