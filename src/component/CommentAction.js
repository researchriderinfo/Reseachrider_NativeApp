import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Alert, Image, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

const CommentAction = ({PostRender, item}) =>{
  const [commentText, setCommentText] = useState("");


  //Comment Function Here
  const handleComment = async (type, postId) => {
    console.log(type,postId );
    try {
      const auth_token = await AsyncStorage.getItem("auth_token");

      const response = await fetch(`https://researchrider.xyz/post/comment/${type}/${postId}/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${auth_token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({content: commentText, is_active: true }),
      });

      if (response.status === 201) {
        setCommentText("");
        await  PostRender();
        // Alert.alert("Comment Post")
      }else{
        Alert.alert("Please, Write Something...")
      }
    } catch (error) {
      console.log(error);
    }
   };
    return(
    <View style={styles.commentInputBox}>
      <TextInput
        placeholder="Add a comment..."
        onChangeText={(userText) => setCommentText(userText)}
        value={commentText}
        style={styles.commentInput}
        multiline
      />
     <TouchableOpacity onPress={() => handleComment( item.description ? "thought" : "summary", item.id)}>
       <Image
        source={require('../../assets/send-message.png')}
        style={styles.actionIcon}
       />
      </TouchableOpacity>
    </View>
    )
}
const styles = StyleSheet.create({
commentInputBox:{
    flexDirection: 'row', 
    alignItems: 'center',
    // justifyContent: 'space-between'
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
actionIcon: {
    width: 20,
    height: 20,
    marginRight: 5, 
  },
})

export default CommentAction