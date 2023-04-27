import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Avatar, Text, useTheme } from 'react-native-paper';

export default function Header() {

  const { colors } = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: colors.elevation.level2}]}>
      <Avatar.Image size={80} source={{uri: 'https://i.pravatar.cc/300?img=17'}} />
      <View>
        <Text variant="titleLarge" style={{fontWeight: 'bold'}}>John Doe</Text>
        <Text variant="titleSmall">ID: 123456789</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
    width: '100%',
    height: "15%",
    borderBottomRightRadius: 128,
    paddingHorizontal: 16,
  }
})