import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

const SummaryScreen = ({route}) =>{
     const { getUserPost } = route.params;
    const [inputValues, setInputValues] = useState({
        title: "",
        objective: "",
        theoreticalBackground: "",
        researchGap: "",
        uniquenessOfStudy: "",
        dataSourceSample: "",
        researchMethodology: "",
        resultDiscussion: "",
        validityReliability: "",
        usefulnessOfFinding: "",
        reference: "",
        annex: "",
        keyword: "",
    });

    console.log(inputValues);
    
    const handleSummaryPost = async () => {
       
     const id = await AsyncStorage.getItem("id");
     const auth_token = await AsyncStorage.getItem("auth_token");

      if (!id || !auth_token) {
          console.log("User data or auth token is missing in AsyncStorage.");
          return;
        }

     const newData = new FormData();
      
    newData.append("title_of_research_article", inputValues.title);
    newData.append("objective_of_the_study", inputValues.objective);
    newData.append("theoritical_Background", inputValues.theoreticalBackground);
    newData.append("research_gap", inputValues.researchGap);
    newData.append("uniqueness_of_the_study", inputValues.uniquenessOfStudy);
    newData.append("data_source_sample_information", inputValues.dataSourceSample);
    newData.append("research_methodology", inputValues.researchMethodology);
    newData.append("result_discussion", inputValues.resultDiscussion);
    newData.append("validity_reliability_of_finding", inputValues.validityReliability);
    newData.append("usefulness_of_the_finding", inputValues.usefulnessOfFinding);
    newData.append("reference", inputValues.reference);
    newData.append("annex", inputValues.annex);
    // newData.append("file1", file1 ? file1 : "");
    // newData.append("file2", file2 ? file2 : "");
    newData.append("keyword", inputValues.keyword);
    id ? newData.append("user", id) : newData.append("group", "");


    fetch(
        `https://researchrider.xyz/post/${id}/user-summery-create/`,
        {
        method: "POST",
        headers: {
            Authorization: `Token ${auth_token}`,
        },
        body: newData,
        }
    )
        .then((res) => {
        if (res.status === 404) {
            Alert.alert("Please enter all the required fields.");
        } else if (res.status === 201) {
            getUserPost()
            Alert.alert("Successfully publish");
        }
        })
        .catch((error) => console.log(error));

  };


    const handleInputChange = (key, value) => {
        setInputValues({
        ...inputValues,
        [key]: value,
        });
    };
    return(
        <ScrollView style={styles.mainContainer}>
           <View style={styles.container}>
             <Text style={styles.title}>Title of Research Article</Text>
             <TextInput
              placeholder="Title of Research Article"
              onChangeText={(userText) => handleInputChange("title", userText)}
              style={styles.inputStyle}
              multiline
             />

             <Text style={styles.title}>Objective of the Study</Text>
             <TextInput
              placeholder="Objective of the Study"
              onChangeText={(userText) => handleInputChange("objective", userText)}
              style={styles.inputStyle}
              multiline
             />

             <Text style={styles.title}>Theoretical Background</Text>
             <TextInput
              placeholder="Theoretical Background"
            onChangeText={(userText) => handleInputChange("theoreticalBackground", userText)}
              style={styles.inputStyle}
              multiline
             />

             <Text style={styles.title}>Research Gap</Text>
             <TextInput
              placeholder="Research Gap"
              onChangeText={(userText) => handleInputChange("researchGap", userText)}
              style={styles.inputStyle}
              multiline
             />

              <Text style={styles.title}>Uniqueness of the Study</Text>
             <TextInput
              placeholder="Uniqueness of the Study"
               onChangeText={(userText) => handleInputChange("uniquenessOfStudy", userText)}
              style={styles.inputStyle}
              multiline
             />

              <Text style={styles.title}>Data Source/Sample Information</Text>
             <TextInput
              placeholder="Data Source/Sample Information"
              onChangeText={(userText) => handleInputChange("dataSourceSample", userText)}
              style={styles.inputStyle}
              multiline
             />

              <Text style={styles.title}>Research Methodology</Text>
             <TextInput
              placeholder="Research Methodology"
               onChangeText={(userText) => handleInputChange("researchMethodology", userText)}
              style={styles.inputStyle}
              multiline
             />

              <Text style={styles.title}>Result & Discussion</Text>
             <TextInput
              placeholder="Result & Discussion"
               onChangeText={(userText) => handleInputChange("resultDiscussion", userText)}
              style={styles.inputStyle}
              multiline
             />

              <Text style={styles.title}>Validity & Reliability of Finding</Text>
             <TextInput
              placeholder="Validity & Reliability of Finding"
              onChangeText={(userText) => handleInputChange("validityReliability", userText)}
              style={styles.inputStyle}
              multiline
             />

              <Text style={styles.title}>Usefulness of the Finding</Text>
             <TextInput
              placeholder="Usefulness of the Finding"
              onChangeText={(userText) => handleInputChange("usefulnessOfFinding", userText)}
              style={styles.inputStyle}
              multiline
             />

              <Text style={styles.title}>Reference</Text>
             <TextInput
              placeholder="Reference"
             onChangeText={(userText) => handleInputChange("reference", userText)}
              style={styles.inputStyle}
              multiline
             />

              <Text style={styles.title}>Annex</Text>
             <TextInput
              placeholder="Annex"
             onChangeText={(userText) => handleInputChange("annex", userText)}
              style={styles.inputStyle}
              multiline
             />

              <Text style={styles.title}>Keyword</Text>
             <TextInput
              placeholder="Keyword"
             onChangeText={(userText) => handleInputChange("keyword", userText)}
              style={styles.inputStyle}
              multiline
             />

            <View style={styles.btnContainer}>
                <Button style={styles.btn} title="PUBLISH" onPress={handleSummaryPost}/>
            </View>
           </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    mainContainer:{
     backgroundColor: "#fff"
    },
    container:{
     marginTop: 30,
     margin: 20,
    },
    title:{
     marginTop:15,
     fontWeight: 'bold'
    },
    inputStyle:{
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      padding: 15,
      paddingLeft: 20,
      marginTop: 10,
    },
    btnContainer:{
        marginTop: 20
    }
})
export default SummaryScreen;