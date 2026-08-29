import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabsStack from './tabs';
import PrivacyStack from './stacks/privacy';

const Stack = createNativeStackNavigator();
const RootNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false}}>
            <Stack.Screen name="Tabs" component={TabsStack} />
            <Stack.Screen name="PrivacyStack" component={PrivacyStack} />
        </Stack.Navigator>
    )
}

export default RootNavigation