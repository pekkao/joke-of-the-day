import React, { useState,useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const URL = "https://api.jokes.one/jod";

export default function App() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(()=> {
    fetch(URL)
      .then(response => response.json())
      .then ((json) => {
        console.log(json);
        const joke = json.contents.jokes[0].joke;
        setTitle(joke.title);
        setText(joke.text);
        setError(null);
        setIsLoading(false);
      },(error) => {
        setError("Error retrieving joke!");
        setIsLoading(false);
        console.log(error);
      })
  },[])


  if (isLoading) {
    return <View style={styles.container}><ActivityIndicator size="large"/></View>
  } else if(error) {
    return <View style={styles.container}><Text>{error}</Text></View>
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Joke of the day</Text>
        <Text style={styles.title}>{title}</Text>
        <Text>{text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
  },  
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
  }
});
