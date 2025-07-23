import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QRPlayerScreen from './screens/QRPlayerScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="QRPlayer" component={QRPlayerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
