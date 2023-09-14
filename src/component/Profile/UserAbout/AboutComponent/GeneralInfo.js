import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const GeneralInfo = ({userID,navigation }) =>{
  const [generalInfo, setGeneralInfo] = useState([]);
    
  useEffect(() => {
      const GeneralInfo = async () => {
    try {
      const auth_token = await AsyncStorage.getItem('auth_token');
      const id = await AsyncStorage.getItem('id');

      if (!auth_token || !id) {
        console.log('User data or auth token is missing in AsyncStorage.');
        return;
      }

      const response = await fetch(`https://researchrider.xyz/user/user-general-info/${id}`, {
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
      setGeneralInfo(data[0]);
    } catch (error) {
      console.log('Error reading data from AsyncStorage:', error);
    }
    };
    GeneralInfo();
  }, []);
    return(
      <View style={styles.container}>
        <Text style={styles.mainTitle}>General Information</Text>
        
         <View style={styles.contentBox}>
             <View>
                       <Text style={styles.title}>Name</Text>
                       <Text style={{color: "gray"}}>{generalInfo.user_username}</Text>
     
                       <Text style={styles.title}>Designation</Text>
                       <Text style={{color: "gray"}} >{generalInfo.user_designation}</Text>
     
                       <Text style={styles.title}>Father's Name</Text>
                       <Text style={{color: "gray"}} >{generalInfo.fathers_name}</Text>

                        <Text style={styles.title}>Mother's Name</Text>
                       <Text style={{color: "gray"}} >{generalInfo.mothers_name}</Text>

                       <Text style={styles.title}>Religion</Text>
                       <Text style={{color: "gray"}} >{generalInfo.religion}</Text>

                       <Text style={styles.title}>Gender</Text>
                       <Text style={{color: "gray"}} >{generalInfo.user_gender}</Text>
     
                       <Text style={styles.title}>NID / Birth Certificate</Text>
                       <Text style={{color: "gray"}} >{generalInfo.nid_number}</Text>

                       <Text style={styles.title}>Phone No.</Text>
                       <Text style={{color: "gray"}} >{generalInfo.user_phone_no}</Text>
             </View>

             <View>
                       <Text style={styles.title}>Native Language</Text>
                       <Text style={{color: "gray"}} >{generalInfo.native_language}</Text>
     
                       <Text style={styles.title}>Nationality</Text>
                       <Text style={{color: "gray"}} >{generalInfo.nationality}</Text>

                       <Text style={styles.title}>Blood Group</Text>
                       <Text style={{color: "gray"}} >{generalInfo.blood_group}</Text>

                       <Text style={styles.title}>Height</Text>
                       <Text style={{color: "gray"}} >{generalInfo.height_feet ? generalInfo.height_feet : 0} Feet {generalInfo.height_inch ?generalInfo.height_inch : 0} Inch</Text>

                       <Text style={styles.title}>Weight</Text>
                       <Text style={{color: "gray"}} >{generalInfo.weight_kg ? generalInfo.weight_kg : 0} kg {generalInfo.weight_gm ? generalInfo.weight_gm : 0} gm</Text>

                       <Text style={styles.title}>Permanent Address</Text>
                       <Text style={{color: "gray"}} >{generalInfo.user_permanent_address}</Text>

                       <Text style={styles.title}>Present Address</Text>
                       <Text style={{color: "gray"}} >{generalInfo.user_present_address}</Text>
             </View>
         </View>
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
        marginBottom: 8
    },
    contentBox:{
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between"
    },
 
    content:{
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
        paddingVertical: 10  
    },
    iconStyle:{
        width: 30,
        height: 30
    }
})
export default GeneralInfo;