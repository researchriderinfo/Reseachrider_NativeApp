import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CommentAction from "../component/CommentAction";

const SummaryPost = () => {
  
  const [id, setId] = useState('');
  const [summary, setSummary] = useState([]);
  const [commentText, setCommentText] = useState("");

     const UserSummaryPost = async () => {
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
        setSummary(data.summery); 
      } catch (error) {
        console.log("Error reading data from AsyncStorage:", error);
      }
    };

    useEffect(() => {
      UserSummaryPost();
    }, [id]);

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
        await  UserSummaryPost();
      }
    } catch (error) {
      console.log(error);
    }
    };


   //Comment Function Here
   const handleComment = async (type, postId) => {
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
        await  UserSummaryPost();
        Alert.alert("Comment Post")
      }else{
        Alert.alert("Please, Write Something...")
      }
    } catch (error) {
      console.log(error);
    }
   };

  const renderSummaryItem = ({item}) =>(
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

    {item.title_of_research_article && 
        <View style={styles.summaryContent}>
            <Text style={styles.header}>Title of research article</Text>
             <Text style={styles.details}>{item.title_of_research_article}</Text>

            <Text style={styles.childHeader}>Objective of the study</Text>
            <Text style={styles.details}>{item.objective_of_the_study}</Text>

            <Text style={styles.childHeader}>Theoretical background</Text>
             <Text style={styles.details}>{item.theoritical_Background}</Text>

             <Text style={styles.childHeader}>Research gap</Text>
             <Text style={styles.details}>{item.research_gap}</Text>

               <Text style={styles.childHeader}>Uniqueness of the study</Text>
             <Text style={styles.details}>{item.uniqueness_of_the_study}</Text>

               <Text style={styles.childHeader}>Data source/sample information</Text>
             <Text style={styles.details}>{item.data_source_sample_information}</Text>


               <Text style={styles.childHeader}>Research methodology</Text>
             <Text style={styles.details}>{item.research_methodology}</Text>

            <Text style={styles.childHeader}>Result & discussion</Text>
             <Text style={styles.details}>{item.result_discussion}</Text>

            <Text style={styles.childHeader}>Validity & reliability of finding</Text>
             <Text style={styles.details}>{item.validity_reliability_of_finding}</Text>


            <Text style={styles.childHeader}>Usefulness of the finding</Text>
             <Text style={styles.details}>{item.usefulness_of_the_finding}</Text>

             <Text style={styles.childHeader}>Reference</Text>
             <Text style={styles.details}>{item.reference}</Text>


             <Text style={styles.childHeader}>Annex</Text>
             <Text style={styles.details}>{item.annex}</Text>


             <Text style={styles.childHeader}>Keyword</Text>
             <Text style={styles.details}>{item.keyword}</Text>

            {item.file1 && (
            <Text style={styles.childHeader}>
            <Text onPress={() => Linking.openURL(item.file1)} style={{ color: 'blue' }}>
                File-1
            </Text>
            </Text>
             )}


               {item.file2 && (
            <Text style={styles.childHeader}>
            <Text onPress={() => Linking.openURL(item.file2)} style={{ color: 'blue' }}>
                File-2
            </Text>
            </Text>
             )}



        </View> 
        }

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
            
    <CommentAction  item={item} PostRender={UserSummaryPost}/>

  
    </View>
  );

    return(
        <View style={styles.container}>
        <FlatList
            data={summary}
            renderItem={renderSummaryItem}
            keyExtractor={(item) => item.id.toString()} 
         />
        </View>
    )
}


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
    width: "94%"
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
  summaryContent:{
    padding: 5,
    marginVertical: 15
  },
  header: {
    fontWeight: 'bold'
  },
  childHeader:{
     fontWeight: 'bold',
     marginTop: 15
  },

});

export default SummaryPost;