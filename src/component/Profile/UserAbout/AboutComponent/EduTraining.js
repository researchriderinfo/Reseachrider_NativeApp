import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const EduTraining = ({userID,navigation }) =>{
  const [education, setEducation] = useState([]);
   const [training, setTraining] = useState([]);
    
  useEffect(() => {
      const GetEducation = async () => {
    try {
      const auth_token = await AsyncStorage.getItem('auth_token');
      const id = await AsyncStorage.getItem('id');

      if (!auth_token || !id) {
        console.log('User data or auth token is missing in AsyncStorage.');
        return;
      }

      const response = await fetch(`https://researchrider.xyz/user/user-academic-degree/${id}`, {
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
      setEducation(data);
    } catch (error) {
      console.log('Error reading data from AsyncStorage:', error);
    }
    };
    GetEducation();
  }, []);

    useEffect(() => {
      const GetTraining = async () => {
    try {
      const auth_token = await AsyncStorage.getItem('auth_token');
      const id = await AsyncStorage.getItem('id');

      if (!auth_token || !id) {
        console.log('User data or auth token is missing in AsyncStorage.');
        return;
      }

      const response = await fetch(`https://researchrider.xyz/user/user-training/${id}`, {
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
      setTraining(data);
    } catch (error) {
      console.log('Error reading data from AsyncStorage:', error);
    }
    };
    GetTraining();
  }, []);

  // render the education cards
  const showEducation = ({ item }) => {
    return (
         <View style={styles.contentBox}>
             <View style={styles.content}>
                  <Text style={styles.title}>Degree</Text>
                  <Text style={{color: "gray"}}>{item.degree}</Text>
     
                  <Text style={styles.title}>Department</Text>
                  <Text style={{color: "gray"}} >{item.department}</Text>
     
                  <Text style={styles.title}>Institution</Text>
                  <Text style={{color: "gray"}} >{item.institutions}</Text>

                  <Text style={styles.title}>Start Year</Text>
                  <Text style={{color: "gray"}} >{item.start_date}</Text>

                  <Text style={styles.title}>End Year</Text>
                  <Text style={{color: "gray"}} >{item.end_date}</Text>
             </View>
         </View>
    );
  };

   // render the Training cards
  const showTraining = ({ item }) => {
    return (
         <View style={styles.contentBox}>
             <View style={styles.content}>
                  <Text style={styles.title}>Industry</Text>
                  <Text style={{color: "gray"}}>{item.institutions}</Text>
     
                  <Text style={styles.title}>Designation</Text>
                  <Text style={{color: "gray"}} >{item.designation}</Text>
     
                  <Text style={styles.title}>Duration</Text>
                  <Text style={{color: "gray"}} >{item.duration}</Text>

                  <Text style={styles.title}>Description</Text>
                  <Text style={{color: "gray"}} >{item.description}</Text>

                
             </View>
         </View>
    );
  };

    return(
      <View style={styles.container}>
        <Text style={styles.mainTitle}>Academic Degree</Text>
       
      {/* Display education*/}
        <FlatList
          keyExtractor={(item) => item.id}
          data={education}
          renderItem={showEducation}
        />

      {/* Display Training  */}

      <Text style={styles.mainTitle}>Training</Text>
      <FlatList
        keyExtractor={(item) => item.id.toString()} // Convert id to string
        data={training}
        renderItem={showTraining}
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
      
    },
    iconStyle:{
        width: 30,
        height: 30
    }
})
export default EduTraining;