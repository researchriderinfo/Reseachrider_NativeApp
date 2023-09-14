import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const Publications = ({userID,navigation }) =>{
  const [publication, setPublication] = useState([]);
  const [article, setArticle] = useState([]);

    
  //Getting Book Publication
  useEffect(() => {
    const BookPublication = async () => {
    try {
      const auth_token = await AsyncStorage.getItem('auth_token');
      const id = await AsyncStorage.getItem('id');

      if (!auth_token || !id) {
        console.log('User data or auth token is missing in AsyncStorage.');
        return;
      }

      const response = await fetch(`https://researchrider.xyz/user/user-book-publications/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Token ${auth_token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Error fetching course data:', response.status);
        return;
      }

      const data = await response.json();
      setPublication(data);
    } catch (error) {
      console.log('Error reading data from AsyncStorage:', error);
    }
    };
    BookPublication();
  }, []);

  //Getting Article Publication
  useEffect(() => {
    const ArticlePublication = async () => {
    try {
      const auth_token = await AsyncStorage.getItem('auth_token');
      const id = await AsyncStorage.getItem('id');

      if (!auth_token || !id) {
        console.log('User data or auth token is missing in AsyncStorage.');
        return;
      }

      const response = await fetch(`https://researchrider.xyz/user/user-research-article/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Token ${auth_token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Error fetching course data:', response.status);
        return;
      }

      const data = await response.json();
      setArticle(data);
    } catch (error) {
      console.log('Error reading data from AsyncStorage:', error);
    }
    };
    ArticlePublication();
  }, []);

    // render the showPublication cards
  const showPublication = ({ item }) => {
    return (
         <View style={styles.contentBox}>
          <Text></Text>
             <View >
                  <Text style={styles.title}>Name</Text>
                  <Text style={{color: "gray"}}>{item.book_name}</Text>
     
                  <Text style={styles.title}>Authors Name</Text>
                  <Text style={{color: "gray"}} >{item.authors_name}</Text>
     
                  <Text style={styles.title}>Publisher Name</Text>
                  <Text style={{color: "gray"}} >{item.publisher_name}</Text>

                  <Text style={styles.title}>Publication Year</Text>
                  <Text style={{color: "gray"}} >{item.publication_year}</Text>

                  <Text style={styles.title}>Publish URL</Text>
                  <Text style={{color: "gray"}} >{item.publish_url}</Text>
             </View>
         </View>
    );
  };

      // render the Article cards
  const showArticle = ({ item }) => {
    return (
         <View style={styles.contentBox}>
             
             <View >
                  <Text style={styles.title}>Article Name</Text>
                  <Text style={{color: "gray"}}>{item.article_name}</Text>
     
                  <Text style={styles.title}>Authors Name</Text>
                  <Text style={{color: "gray"}} >{item.authors_name}</Text>

                  <Text style={styles.title}>Journals Name</Text>
                  <Text style={{color: "gray"}} >{item.journals_name}</Text>
     
                  <Text style={styles.title}>Publisher Name</Text>
                  <Text style={{color: "gray"}} >{item.publisher_name}</Text>

                  <Text style={styles.title}>Publication Year</Text>
                  <Text style={{color: "gray"}} >{item.publication_year}</Text>

                  <Text style={styles.title}>Link</Text>
                  <Text style={{color: "gray"}} >{item.url_link}</Text>
             </View>
         </View>
    );
  };

    return(
      <View style={styles.container}>
        <Text style={styles.mainTitle}>Publications</Text>


      {/* Display Book Publications */}
        <FlatList
          keyExtractor={(item) => item.id}
          data={publication}
          renderItem={showPublication}
          showsHorizontalScrollIndicator={true}
        />

           {/* Display Article Publications */}

      <Text style={styles.mainTitle}>Article</Text>
      <FlatList
        keyExtractor={(item) => item.id.toString()} // Convert id to string
        data={article}
        renderItem={showArticle}
        horizontal
        showsHorizontalScrollIndicator={true}
      />
      </View>        
    )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: "#ffff",
        marginTop  : 10,
        padding: 20
    },
    mainTitle:{
        fontSize :19,
        fontWeight: '600',
        marginVertical: 8
    },
    contentBox:{
        // flexDirection: 'row',
        // alignItems: "center",
        // justifyContent: "space-between"
    },
 
    content:{
        // flexDirection: 'row',
        // alignItems: 'center',
        marginRight: 20,
        paddingVertical: 10  
    },
    iconStyle:{
        width: 30,
        height: 30
    }
})
export default Publications;