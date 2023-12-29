import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from 'react-native';

import HomeScreen from './HomeScreen';
import YoutubeVideo from './YoutubeVideo';
import VideoDetail from './VideoDetail';

const screenOptions = {
  headerShown: false,
};

// const Home = () => {
const Home = ({ route }) => {
    // console.log("1");
    // console.log(route.params);
    // console.log("2");
    const { email } = route.params;
    const Stack = createStackNavigator();
  
    return (
      <Stack.Navigator initialRouteName="YoutubeVideo" screenOptions={screenOptions}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} initialParams={{ email }} />
        <Stack.Screen name="YoutubeVideo" component={YoutubeVideo} initialParams={{ email }} />
        <Stack.Screen name="VideoDetail" component={VideoDetail} />
      </Stack.Navigator>
    );
}

export default Home;
