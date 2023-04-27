import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import ActivityHistory from '../components/ActivityHistory';

export default function VitalDetailsScreen({ route }) {

  const { vital } = route.params;

  return (
    <View>
      <Text variant='displaySmall' style={styles.title}>
        {vital} History
      </Text>
      {
        vital === "Activity" ?
          <ActivityHistory />
          :
          <Text>Coming Soon!</Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 64
  }
})