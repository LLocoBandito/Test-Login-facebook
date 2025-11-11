// App.tsx

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth'; // Import User

import Login from './apps/screens/Login'; // Import Login
import Home from './apps/screens/Home'; // Import Home
import Details from './apps/screens/Details'; // Import Details
import { FIREBASE_AUTH } from './FirebaseConfig';

// Setup Stack Navigators
const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

// Stack untuk halaman setelah login (Home dan Detail)
const InsideStackScreen = () => {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="home" component={Home} options={{ title: 'Dashboard' }} />
      <InsideStack.Screen name="detail" component={Details} />
    </InsideStack.Navigator>
  );
};
 
export default function App() {
  const [user, setUser] = useState<User | null>(null); // State untuk melacak status pengguna

  // Monitor status otentikasi
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user); // Set state user berdasarkan status Firebase Auth
    });
  }, []); // [] agar hanya berjalan sekali saat mounting

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Conditional Rendering: Jika user ada, tampilkan Home. Jika tidak, tampilkan Login. */}
        {user ? 
          (
            <Stack.Screen name='Home' component={InsideStackScreen} options={{ headerShown: false }} />
          ) 
          : 
          (
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}