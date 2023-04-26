import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

import MainNavigator from './navigators/MainNavigator';
import AuthScreen from './screens/AuthScreen';

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
      <StatusBar style="auto" />
      
      {
        isLoggedIn ? (
          <MainNavigator />
        ) : (
          <AuthScreen setIsLoggedIn={setIsLoggedIn} />
        )
      }

    </>
  );
}
