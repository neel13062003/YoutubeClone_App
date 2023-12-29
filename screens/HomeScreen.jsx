import { View, Text } from 'react-native'
import React from 'react'

const HomeScreen = ({ route }) => {
  console.log("3");
  console.log(route.params);
  console.log("4");
  const { email } = route.params || {};

  return (
    <View>
      <Text>Welcome to Home</Text>
      {email ? (
        <Text>User Email: {email}</Text>
      ) : (
        <Text>User Email not available</Text>
      )}
      {/* Add other content or components here */}
    </View>
  );
};


export default HomeScreen