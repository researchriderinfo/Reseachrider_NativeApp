import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const ProjectWorkExp = ({userID,navigation }) =>{
  const [workHis, setWorkHis] = useState([]);
  const [project, setProject] = useState([]);
    
  useEffect(() => {
      const GetWorkHistory = async () => {
    try {
      const auth_token = await AsyncStorage.getItem('auth_token');
      const id = await AsyncStorage.getItem('id');

      if (!auth_token || !id) {
        console.log('User data or auth token is missing in AsyncStorage.');
        return;
      }

      const response = await fetch(`https://researchrider.xyz/user/user-working-history/${id}`, {
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
      setWorkHis(data);
    } catch (error) {
      console.log('Error reading data from AsyncStorage:', error);
    }
    };
    GetWorkHistory();
  }, []);

    useEffect(() => {
      const GetProjectWork = async () => {
    try {
      const auth_token = await AsyncStorage.getItem('auth_token');
      const id = await AsyncStorage.getItem('id');

      if (!auth_token || !id) {
        console.log('User data or auth token is missing in AsyncStorage.');
        return;
      }

      const response = await fetch(`https://researchrider.xyz/user/project-work/`, {
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
      setProject(data);
    } catch (error) {
      console.log('Error reading data from AsyncStorage:', error);
    }
    };
    GetProjectWork();
  }, []);

  // render the education cards
  const showWorkHistory = ({ item }) => {
    return (
         <View style={styles.contentBox}>
           <Text ></Text>
             <View style={styles.content}>
                  <Text style={styles.title}>Company Name</Text>
                  <Text style={{color: "gray"}}>{item.institute}</Text>
     
                  <Text style={styles.title}>Designation</Text>
                  <Text style={{color: "gray"}} >{item.designation}</Text>
     
                  <Text style={styles.title}>Description</Text>
                  <Text style={{color: "gray"}} >{item.department ? item.department : "N/A"}</Text>

                  <Text style={styles.title}>Start Year</Text>
                  <Text style={{color: "gray"}} >{item.start_date}</Text>

                  <Text style={styles.title}>End Year</Text>
                  <Text style={{color: "gray"}} >{item.end_date ? item.end_date : "Current"}</Text>
             </View>
         </View>
    );
  };

   // render the Training cards
  const showProjectWork = ({ item }) => {
    return (
         <View style={styles.contentBox}>
          
             <View style={styles.content}>
                  <Text style={styles.title}>Title</Text>
                  <Text style={{color: "gray"}}>{item.title}</Text>
  
                  <Text style={styles.title}>Description</Text>
                  <Text style={{color: "gray"}} >{item.description ? item.description : "N/A"}</Text>
             </View>
         </View>
    );
  };

    return(
      <View style={styles.container}>
        <Text style={styles.mainTitle}>Work History</Text>
       
      {/* Display WorkHistory*/}
        <FlatList
          keyExtractor={(item) => item.id}
          data={workHis}
          renderItem={showWorkHistory}
        />

      {/* Display Training  */}

      <Text style={styles.mainTitle}>Project Work</Text>
      <FlatList
        keyExtractor={(item) => item.id.toString()} // Convert id to string
        data={project}
        renderItem={showProjectWork}
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

export default ProjectWorkExp;