import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DataTable } from 'react-native-paper'

export default function ActivityHistory() {
  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Activity</DataTable.Title>
        <DataTable.Title numeric>Time</DataTable.Title>
        <DataTable.Title numeric>Date</DataTable.Title>
      </DataTable.Header>

      {/* // TODO: Replace with actual data */}
      <DataTable.Row>
        <DataTable.Cell>Walking</DataTable.Cell>
        <DataTable.Cell numeric>8:00 AM</DataTable.Cell>
        <DataTable.Cell numeric>10/10/2021</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Running</DataTable.Cell>
        <DataTable.Cell numeric>9:00 AM</DataTable.Cell>
        <DataTable.Cell numeric>10/10/2021</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Walking</DataTable.Cell>
        <DataTable.Cell numeric>10:00 AM</DataTable.Cell>
        <DataTable.Cell numeric>10/10/2021</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Sedentary</DataTable.Cell>
        <DataTable.Cell numeric>11:00 AM</DataTable.Cell>
        <DataTable.Cell numeric>10/10/2021</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Fall Detected!</DataTable.Cell>
        <DataTable.Cell numeric>12:00 PM</DataTable.Cell>
        <DataTable.Cell numeric>10/10/2021</DataTable.Cell>
      </DataTable.Row>
    </DataTable>
  )
}

const styles = StyleSheet.create({})