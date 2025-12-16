import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'


const LoginInput = (props) => {
  return (
    <View style={styles.container}>
      <TextInput {...props} style={styles.textInput} />
      <props.icon />
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: '50@ms',
    paddingHorizontal: '32@ms',
    height: '60@ms',
    marginBottom: '20@ms',
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1, fontSize: 20
  }
})

export default LoginInput
