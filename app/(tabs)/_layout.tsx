import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"

export default function TabLayout(){
    return (
        <Tabs
         screenOptions={{
            headerShown:false,
            tabBarActiveTintColor: '#7c3aed',
            tabBarInactiveTintColor:'#9ca3af',
            tabBarStyle: {
                backgroundColor:'#ffffff',
                borderTopWidth:0,
                elevation: 5,
                height: 70,
                paddingBottom: 10
            },
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight:'bold'
            }
         }}
        >
        {/* tab screens */}
        <Tabs.Screen
         name="index"
         options={{
            title:'Home',
            tabBarIcon: ({ color, focused}) => (
                <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color}/>
            )
         }}
        />
        
        <Tabs.Screen
         name="search"
         options={{
            title:'Search',
            tabBarIcon: ({ color, focused}) => (
                <Ionicons name={focused ? 'search' : 'search-outline'} size={24} color={color}/>
            )
         }}
        />

         <Tabs.Screen
         name="favorites"
         options={{
            title:'Favorites',
            tabBarIcon: ({ color, focused}) => (
                <Ionicons name={focused ? 'heart' : 'heart-outline'} size={24} color={color}/>
            )
         }}
        />
        </Tabs>
    )
}