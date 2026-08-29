import PrivacyScreen from '@features/privacy/screens/privacy_policy';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const PrivacyStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Privacy' component={PrivacyScreen} />
        </Stack.Navigator>
    )
}

export default PrivacyStack