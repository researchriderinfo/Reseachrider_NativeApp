import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import EduTraining from './AboutComponent/EduTraining';
import GeneralInfo from './AboutComponent/GeneralInfo';
import ProjectWorkExp from './AboutComponent/ProjectWorkExp';
import Publications from './AboutComponent/Publications';
import Skill from './AboutComponent/Skill';

const UserAbout = ({userID,navigation }) =>{


    return(
      <ScrollView>
          <GeneralInfo userID={userID} navigation={navigation}/>
          <Publications userID={userID} navigation={navigation}/>
          <EduTraining userID={userID} navigation={navigation}/>
          <ProjectWorkExp userID={userID} navigation={navigation}/>
          <Skill userID={userID} navigation={navigation}/>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#ffff",
        marginTop  : 10,
        padding: 10
    },
})
export default UserAbout;