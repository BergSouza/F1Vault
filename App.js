import { StatusBar } from 'expo-status-bar';
import { Alert, Text, View, } from 'react-native';
import { NavigationContainer,  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from './pages/index'
import Temporada from './pages/temporada/temporada'
import CampPilotos from './pages/campPilotos/campPilotos'
import CampConstrutores from './pages/campConstrutores/campConstrutores'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen name="Temporada" component={Temporada} />
        <Stack.Screen name="CampPilotos" component={CampPilotos} />
        <Stack.Screen name="CampConstrutores" component={CampConstrutores} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}