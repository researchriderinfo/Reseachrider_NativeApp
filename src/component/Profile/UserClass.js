import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const UserClass = ({navigation}) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity
      style={styles.box}
      onPress={() => navigation.navigate("teacher")}
      >
        <Image
          style={styles.iconStyle}
          source={require("../../../assets/course/professionals.png")}
        />
        <Text style={styles.title}>As a Teacher</Text>
      </TouchableOpacity>
       
  
     <TouchableOpacity
      style={styles.box}
      onPress={() => navigation.navigate("student")}
      >
         <Image
          style={styles.iconStyle}
          source={require("../../../assets/course/reading.png")}
        />
         <Text style={styles.title}>As a Student</Text>
     </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 50
  },
  box:{
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: "#ccc",
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 15
  },
  iconStyle:{
    width: 100,
    height: 100
  },
  title:{
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
    color: 'gray'
  }
})

export default UserClass;
