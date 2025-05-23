import React from 'react';
// Removed StyleSheet and View as they are not directly used here anymore for the main layout
// import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screen imports
import RegistrationScreen from './screens/RegistrationScreen';

// Create a stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Register" 
          component={RegistrationScreen} 
          options={{ headerShown: false }} // Hide header for this screen
        />
        {/* Future screens can be added here */}
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

// Styles are no longer needed here as the main container is NavigationContainer
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });
