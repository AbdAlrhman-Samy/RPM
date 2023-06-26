import { StyleSheet, View } from 'react-native'
import { Avatar, Text, useTheme } from 'react-native-paper';
import DeviceStatus from './DeviceStatus';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Header() {

  const { colors } = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: colors.elevation.level2}]}>
      <MaterialCommunityIcons name="watch" size={80} color={colors.primary} />
      <View>
        <Text variant="displaySmall" style={{fontWeight: 'bold'}}>Smartband</Text>
        <DeviceStatus />
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
    marginBottom: 16
  }
})