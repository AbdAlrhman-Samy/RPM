import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native'

export default function AuthScreen({ setIsLoggedIn }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
      }}
    >
      <Text>Welcome!</Text>
      <Button title="Login" onPress={() => setIsLoggedIn(true)} />
    </View>
  )
}
