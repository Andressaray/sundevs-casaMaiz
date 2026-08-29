import MenuScreen from '@features/menu/screens/menu';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const MenuStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Menu' component={MenuScreen} />
        </Stack.Navigator>
    )
}

export default MenuStack