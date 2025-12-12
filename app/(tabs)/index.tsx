import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from '@tanstack/react-query'
import { getTopAnime } from '@/service/api'
import AnimeCard from '../../components/AnimeCard'

const HomeTab = () => {
    const { data: animeList, isLoading, error } = useQuery({
        queryKey: ['topAnime'],
        queryFn: getTopAnime
    })

    if(isLoading) return <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size={'large'} color={'#7c3aed'}/>
    </View>

    if(error) return <Text>Error Loading</Text>

  return (
    <SafeAreaView className='flex-1 bg-white px-4'>
        <Text className='text-2xl font-bold mb-4 text-gray-900 mt-2'>Top Anime</Text>
        <FlatList
         data={animeList}
         keyExtractor={(item: any) => item.mal_id.toString()}
         renderItem={({ item }) => <AnimeCard item={item} />}
         showsVerticalScrollIndicator={false}
         contentContainerStyle={{paddingBottom: 20}}
        />
    </SafeAreaView>
  )
}

export default HomeTab