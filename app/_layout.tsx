import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from "expo-router";
import "../global.css";
import { FavoritesProvider } from '@/context/FavoritesContext';

const queryClient = new QueryClient()

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <Stack screenOptions={{headerShown: false}}>
          <Stack.Screen name='(tabs)' />
        </Stack>
        </FavoritesProvider>
    </QueryClientProvider>
);
}
