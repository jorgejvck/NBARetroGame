import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Principal from './src/pantallas/Principal';
import PantallaGanador from './src/pantallas/PantallaGanador';
import Secundaria from './src/pantallas/Secundaria';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Principal">
          <Stack.Screen
            name="Principal"
            component={Principal}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Juego"
            component={Secundaria}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Ganador"
            component={PantallaGanador}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
