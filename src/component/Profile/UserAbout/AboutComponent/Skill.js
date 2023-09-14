import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const Skill = ({userID,navigation }) =>{
  const [reSkill, setReSkill] = useState([]);
  const [workSkill, setWorkSkill] = useState([]);
  const [researchWorks, setResearchWorks] = useState([]);
    
  useEffect(() => {
      const GetResearchSkill = async () => {
    try {
      const auth_token = await AsyncStorage.getItem('auth_token');
      const id = await AsyncStorage.getItem('id');

      if (!auth_token || !id) {
        console.log('User data or auth token is missing in AsyncStorage.');
        return;
      }

      const response = await fetch(`https://researchrider.xyz/user/user-research-skill/${id}`, {
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
      setReSkill(data);
    } catch (error) {
      console.log('Error reading data from AsyncStorage:', error);
    }
    };
    GetResearchSkill();
  }, []);

  useEffect(() => {
      const GetResearchWork = async () => {
    try {
      const auth_token = await AsyncStorage.getItem('auth_token');
      const id = await AsyncStorage.getItem('id');

      if (!auth_token || !id) {
        console.log('User data or auth token is missing in AsyncStorage.');
        return;
      }

      const response = await fetch(`https://researchrider.xyz/user/user-working-skills/${id}`, {
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
      setWorkSkill(data);
    } catch (error) {
      console.log('Error reading data from AsyncStorage:', error);
    }
    };
    GetResearchWork();
  }, []);

    useEffect(() => {
      const GetResearchWork = async () => {
    try {
      const auth_token = await AsyncStorage.getItem('auth_token');
      const id = await AsyncStorage.getItem('id');

      if (!auth_token || !id) {
        console.log('User data or auth token is missing in AsyncStorage.');
        return;
      }

      const response = await fetch(`https://researchrider.xyz/user/user-research-work/${id}`, {
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
      setResearchWorks(data);
    } catch (error) {
      console.log('Error reading data from AsyncStorage:', error);
    }
    };
    GetResearchWork();
  }, []);

  // render the education cards
  const showResearchSkill = ({ item }) => {
    return (
         <View style={styles.contentBox}>
           <Text ></Text>
             <View style={styles.content}>
                  <Text style={styles.title}>Research Area</Text>
                  <Text style={{color: "gray"}}>{item.area_of_research_interest}</Text>
     
                  <Text style={styles.title}>Key Research Skill</Text>
                  <Text style={{color: "gray"}} >{item.key_research_skill}</Text>
    
             </View>
         </View>
    );
  };

   // render the Training cards
  const showWorkSkill = ({ item }) => {
    return (
         <View style={styles.contentBox}>
          
             <View style={styles.content}>
                  <Text style={styles.title}>Key Working Skill</Text>
                  <Text style={{color: "gray"}}>{ item.key_working_skill
                            ? item.key_working_skill
                            : "N/A"}</Text>
  
                  <Text style={styles.title}>Area of working interest</Text>
                  <Text style={{color: "gray"}} >{item.area_of_interest ? item.area_of_interest : "N/A"}</Text>

                  <Text style={styles.title}>Career Objective Plan</Text>
                  <Text style={{color: "gray"}} >{item.career_object_plan
                            ? item.career_object_plan
                            : "N/A"}</Text>
             </View>
         </View>
    );
  };


// render the Research Work cards
  const showResearchWork = ({ item }) => {
    return (
         <View style={styles.contentBox}>
          
             <View style={styles.content}>
                  <Text style={styles.title}>Institution</Text>
                  <Text style={{color: "gray"}}>{item.institution ? item.institution : "N/A"}</Text>
  
                  <Text style={styles.title}>Information Of the Envolvement In Research URL</Text>
                  <Text style={{color: "gray"}} >{ item.involvement_research_work_info
                            ? item.involvement_research_work_info
                            : "N/A"}</Text>

                  <Text style={styles.title}>Start Date</Text>
                  <Text style={{color: "gray"}} >{item.start_date ? item.start_date : "N/A"}</Text>

                   <Text style={styles.title}>End Date</Text>
                  <Text style={{color: "gray"}} >{item.end_date ? item.end_date : "Current"}</Text>
             </View>
         </View>
    );
  };

    return(
      <View style={styles.container}>
        <Text style={styles.mainTitle}>Research Skills</Text>
       
      {/* Display reSkill*/}
        <FlatList
          keyExtractor={(item) => item.id}
          data={reSkill}
          renderItem={showResearchSkill}
        />

      {/* Display workSkill  */}
      <Text style={styles.mainTitle}>Working Skills</Text>
      <FlatList
        keyExtractor={(item) => item.id.toString()} // Convert id to string
        data={workSkill}
        renderItem={showWorkSkill}
      />

    {/* Display researchWorks  */}
      <Text style={styles.mainTitle}>Research Work</Text>
      <FlatList
        keyExtractor={(item) => item.id.toString()} // Convert id to string
        data={researchWorks}
        renderItem={showResearchWork}
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

export default Skill;