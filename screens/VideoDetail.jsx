// // VideoDetail.js
// import React from 'react';
// import { View, Text, ScrollView, TouchableOpacity, Linking, Image, StyleSheet } from 'react-native';

// const VideoDetail = ({ route }) => {
//   const { video } = route.params;

//   const openYoutubeVideo = () => {
//     const videoUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`;
//     Linking.openURL(videoUrl);
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.thumbnailContainer}>
//         <Image
//           style={styles.thumbnail}
//           source={{ uri: video.snippet.thumbnails.default.url }}
//         />
//       </View>

//       <View style={styles.infoContainer}>
//         <Text style={styles.title}>{video.snippet.title}</Text>
//         <Text style={styles.channel}>{video.snippet.channelTitle}</Text>
//         <Text style={styles.publishedDate}>{`Published on ${video.snippet.publishedAt}`}</Text>
//       </View>

//       <TouchableOpacity style={styles.watchButton} onPress={openYoutubeVideo}>
//         <Text style={styles.watchButtonText}>Watch on YouTube</Text>
//       </TouchableOpacity>

//       <Text style={styles.description}>{video.snippet.description}</Text>
      
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//   },
//   thumbnailContainer: {
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   thumbnail: {
//     width: '90%',
//     height: 200,
//     resizeMode: 'cover',
//     borderRadius: 10,
//   },
//   infoContainer: {
//     padding: 20,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   channel: {
//     color: '#606060',
//     marginBottom: 5,
//   },
//   publishedDate: {
//     color: '#808080',
//   },
//   watchButton: {
//     backgroundColor: '#ff0000',
//     padding: 15,
//     borderRadius: 5,
//     margin: 20,
//     alignItems: 'center',
//   },
//   watchButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default VideoDetail;
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const VideoDetail = ({ route }) => {
  const { video } = route.params;
  const [videoDetails, setVideoDetails] = useState(null);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const apiKey = 'AIzaSyBd4PbtQKKA7BRp7MwLX00WKPBRTOOrglE'; // Replace with your YouTube API key
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos`,
          {
            params: {
              part: 'snippet,statistics',
              id: video.id.videoId,
              key: apiKey,
            },
          }
        );

        setVideoDetails(response.data.items[0]);
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };

    fetchVideoDetails();
  }, [video.id.videoId]);

  const openYoutubeVideo = () => {
    const videoUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`;
    Linking.openURL(videoUrl);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.thumbnailContainer}>
        <Image
          style={styles.thumbnail}
          source={{ uri: video.snippet.thumbnails.default.url }}
        />
      </View>

      {videoDetails && (
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{videoDetails.snippet.title}</Text>
          <Text style={styles.channel}>{videoDetails.snippet.channelTitle}</Text>
          {/* <Text style={styles.publishedDate}>{`Published on ${videoDetails.snippet.publishedAt}`}</Text> */}
          <Text style={styles.statistics}>{`${videoDetails.statistics.viewCount} views • ${videoDetails.statistics.likeCount} likes`}</Text>

          {/* New: Display complete video description */}
          {/* <Text style={styles.description}>{videoDetails.snippet.description}</Text> */}
        </View>
      )}

      <TouchableOpacity style={styles.watchButton} onPress={openYoutubeVideo}>
        <Text style={styles.watchButtonText}>Watch on YouTube</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  thumbnailContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  thumbnail: {
    width: '90%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  infoContainer: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  channel: {
    color: '#606060',
    marginBottom: 5,
  },
  publishedDate: {
    color: '#808080',
  },
  statistics: {
    color: '#808080',
    marginBottom: 10,
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 22,
  },
  watchButton: {
    backgroundColor: '#ff0000',
    padding: 15,
    borderRadius: 5,
    margin: 20,
    alignItems: 'center',
  },
  watchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default VideoDetail;
