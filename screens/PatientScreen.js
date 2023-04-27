import { View, StyleSheet } from 'react-native'
import Vitals from '../components/Vitals'
import DeviceStatus from '../components/DeviceStatus'
import Header from '../components/Header'

export default function PatientScreen() {
  return (
    <View style={styles.container}>   
      <Header />   
      <DeviceStatus />
      <Vitals />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },

  row: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    padding: 16
  }

})