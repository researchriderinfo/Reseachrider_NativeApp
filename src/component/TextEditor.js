import AsyncStorage from "@react-native-async-storage/async-storage";
import React from 'react';
import { Alert, Button, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';

export default function TextEditor({route}) {
  const { getUserPost } = route.params;
  const _editor = React.createRef();


  const handleGetEditorValue = async () => {
    if (_editor.current) {
      const editorValue = await _editor.current.getHtml();
      console.log('Editor Value:', editorValue);

  const id = await AsyncStorage.getItem("id");
  const auth_token = await AsyncStorage.getItem("auth_token");

  if (!id || !auth_token) {
          console.log("User data or auth token is missing in AsyncStorage.");
          return;
        }

  const newData = new FormData();
  newData.append("description", editorValue);
  newData.append("user", id);
  // newData.append("pic_upload", postFile);

  console.log(newData);

  fetch(
    `https://researchrider.xyz/post/${id}/user-thought-create/`,
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
        Alert.alert("Post created successfully.");
      }
    })
    .catch((error) => console.log(error));
    }
  };




  return (
    <SafeAreaView style={styles.root}>
      <Button style={styles.btn} title="POST" onPress={handleGetEditorValue} />
      <StatusBar style="auto" />
      <QuillEditor
        style={styles.editor}
        ref={_editor}
        initialHtml="<h2>Quill Editor for react-native</h2>"
      />
      <QuillToolbar editor={_editor} options="basic" theme="light" />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingVertical: 10,
  },
  root: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#eaeaea',
  },
  editor: {
    flex: 1,
    padding: 0,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 25,
    marginVertical: 5,
    backgroundColor: 'white',
  },
  btn: {
    width: 120,
    color: "blue"
  },
});
