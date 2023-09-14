import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import HTML from "react-native-render-html";
import CommentAction from "../component/CommentAction";


const ThoughtPost = () => {
  const [id, setId] = useState('');
  const [thoughts, setThoughts] = useState([]);


  const windowWidth = useWindowDimensions().width;


  const UserThoughtPost = async () => {
      try {
        const id = await AsyncStorage.getItem("id");
        const auth_token = await AsyncStorage.getItem("auth_token");

        if (!id || !auth_token) {
          console.log("User data or auth token is missing in AsyncStorage.");
          return;
        }

        setId(id);

        const response = await fetch(`https://researchrider.xyz/post/user-posts/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Token ${auth_token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.error("Error fetching user data:", response.status);
          return;
        }

        const data = await response.json();
        setThoughts(data.thought); // Assuming 'thought' is the key in the response object
      } catch (error) {
        console.log("Error reading data from AsyncStorage:", error);
      }
  };

  useEffect(() => {
    UserThoughtPost();
  }, [id]);


 //Like Function Here
  const handleLike = async (type, postId) => {
    try {
      const auth_token = await AsyncStorage.getItem("auth_token");

      const response = await fetch(`https://researchrider.xyz/post/like/${type}/${postId}/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${auth_token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (response.status === 201) {
        await  UserThoughtPost();
      }
    } catch (error) {
      console.log(error);
    }
  };

 
  const renderThoughtItem = ({ item }) => (
    <View style={styles.thoughtContainer}>
       <View style={styles.avatarContainer}>
         <Image
          style={styles.userAvatar}
          source={{ uri: item.user_profile_pic }}
          resizeMode="contain"
        />
         
         <View>
          <Text style={styles.username}>{item.user_first_name}</Text>
          <Text>{item.created_date}</Text>
         </View>
       </View>
     <HTML
        source={{ html: item.description }}
        contentWidth={windowWidth}
        tagsStyles={{
          h1: {
            fontSize: 22,
          },
          p: { fontSize: 16, lineHeight: 22 },
        }}
      />
      {item.pic_upload && <Image style={styles.imgStyle} source={{ uri: item.pic_upload }} />}

       <View style={styles.actions}>
       
        <TouchableOpacity style={styles.actionButton} onPress={() => handleLike( item.title_of_research_article ? "summary" : "thought",
                item.id)}>
            {item.likes.is_liked ? 
            <View style={styles.actionContent}>
                <Image
                  source={require("../../assets/like.png")}
                  style={styles.actionIcon}
                />
              
                <Text style={styles.actionText}> {item.likes?.total === 0 ? 1 : item.likes?.total} Appreciate</Text>
              </View>:
                <View style={styles.actionContent}>
                <Image
                  source={require("../../assets/thumb-up.png")}
                  style={styles.actionIcon}
                />
                <Text style={styles.actionText}>{item.likes?.total === 0 ? "" : item.likes?.total} Appreciate</Text>
            </View>  
            }
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionContent}>
           <Image
            source={require("../../assets/comment.png")}
            style={styles.actionIcon}
          />
          <Text>Comment</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
             <View style={styles.actionContent}>
            <Image
              source={require("../../assets/share.png")}
              style={styles.actionIcon}
            />
            <Text>Share</Text>
          </View>
        </TouchableOpacity>
      </View>


      {item.latest_comment && 
      <View style={styles.commentContainer}>
              <Image
                style={styles.cmntAvatar}
                source={{ uri: item.user_profile_pic }}
                resizeMode="contain"
              />
              
              <View style={styles.commentContent}>
                <Text style={{fontSize: 12, fontWeight: 'bold'}}>{item.user_first_name}</Text>
                <Text style={styles.content}>{item?.latest_comment?.content}</Text>
              </View>
            </View>
      }
            
    <CommentAction item={item} PostRender={UserThoughtPost}/>
  
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={thoughts}
        // renderItem={renderThoughtItem}
        // keyExtractor={(item) => item.id.toString()} 

            renderItem={({ item }) => renderThoughtItem({ item, handleLike })}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  thoughtContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  imgStyle:{
   width: "100%",
   height: "auto",
   aspectRatio: 16 / 11,
   objectFit: "fill"
  },
  avatarContainer:{
    flexDirection: 'row',
    alignItems: 'center',
  },
   userAvatar: {
    width: 40,
    height: 40,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 50,
    marginRight: 5
  },
    username: {
    fontWeight: "bold",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginTop: 30,
    paddingBottom: 5
  },

  commentInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 50,
    padding: 5,
    paddingLeft: 20,
    marginTop: 10,
    marginRight :10,
    width: "93%"
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
  },
  actionContent: {
    flexDirection: "row",
    alignItems: "center", 
    justifyContent: "center",
  },
  actionIcon: {
    width: 20,
    height: 20,
    marginRight: 5, 
  },
  actionText: {
    fontSize: 16,
  },
  commentContainer:{
    flexDirection: 'row',
    alignItems: 'start',
    marginTop: 10,
   
  },
  commentContent:{
   backgroundColor: "#F2FEFF",
   padding: 7,
   borderRadius: 15,
   width: "90%"
  },
   cmntAvatar: {
    width: 35,
    height: 35,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 50,
    marginRight: 5
  },
  content:{
    fontSize: 13,
    flexWrap: "wrap", 
    // width: "20%"
  },

});

export default ThoughtPost;
