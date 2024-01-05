import { HomeScreen } from 'app/features/home/screen'

import { Stack } from 'expo-router'
import React = require('react')

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Maintanance',
          headerShown: false
        }}
      />
      <HomeScreen />
    </>
  )
}
