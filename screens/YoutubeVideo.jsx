import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const YoutubeVideo = ({ navigation,route }) => {
  console.log("neel");
  console.log(route.params);
  console.log("kalp");

  const { email } = route.params || {};

  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const apiKey = 'AIzaSyBd4PbtQKKA7BRp7MwLX00WKPBRTOOrglE';
        const response = await axios.get(
          'https://www.googleapis.com/youtube/v3/search',
          {
            params: {
              part: 'snippet',
              q: searchQuery,
              key: apiKey,
            },
          }
        );

        setVideos(response.data.items);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, [searchQuery]);

  const handleVideoPress = (video) => {
    navigation.navigate('VideoDetail', { video });
  };


  const renderVideoItem = ({ item, index }) => (
    <TouchableOpacity key={index} style={styles.videoItem} onPress={() => handleVideoPress(item)}>
      <Image style={styles.thumbnail} source={{ uri: item.snippet.thumbnails.default.url }} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.snippet.title}</Text>
        <Text style={styles.channel}>{item.snippet.channelTitle}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <AntDesignIcon name="youtube" size={30} color="red" />
        <Text style={styles.header}> YouTube </Text>
        {email ? (
        <Text>{email}</Text>
        ) : (
          <Text>Abey Sale</Text>
        )}
      </View>
      <View style={styles.headerContainer1}>
        <View style={styles.searchBoxContainer}>
          <AntDesignIcon name="search1" size={30} color="red" style={styles.searchIcon} />
          <TextInput
            style={styles.searchBox}
            placeholder="Search for videos..."
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>
      </View>
      {videos.map((item, index) => renderVideoItem({ item, index }))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 50,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerContainer1: {
    marginBottom: 30,
  },
  searchBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBox: {
    flex: 1,
  },
  videoItem: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  channel: {
    color: '#808080',
  },
});

export default YoutubeVideo;
