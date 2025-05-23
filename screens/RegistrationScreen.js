import React, { useState } from 'react'; // Import useState
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function RegistrationScreen() {
  // Initialize state for all input fields
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [location, setLocation] = useState('');
  const [favoriteSport, setFavoriteSport] = useState('');
  const [preferredPositions, setPreferredPositions] = useState('');

  // Initialize state for error message
  const [errorMessage, setErrorMessage] = useState('');

  // Handle registration logic
  const handleRegister = () => {
    console.log('Form Data:', {
      name,
      username,
      password,
      email,
      phoneNumber,
      dateOfBirth,
      location,
      favoriteSport,
      preferredPositions,
    });

    if (!username.trim()) {
      setErrorMessage('Username is required.');
    } else {
      setErrorMessage('');
      // Proceed with registration logic (e.g., API call) in the future
      console.log('Registration successful (simulated)');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>User Registration</Text>

        {/* Display error message */}
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Choose a username"
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Create a password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <Text style={styles.label}>Date of Birth</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD (e.g., 1990-01-01)"
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
        />

        <Text style={styles.label}>Geographical Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your city or region"
          value={location}
          onChangeText={setLocation}
        />

        <Text style={styles.label}>Favorite Sport</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Football, Basketball"
          value={favoriteSport}
          onChangeText={setFavoriteSport}
        />

        <Text style={styles.label}>Preferred Positions</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Striker, Point Guard"
          value={preferredPositions}
          onChangeText={setPreferredPositions}
        />

        <View style={styles.buttonContainer}>
          <Button title="Register" onPress={handleRegister} />
        </View>

        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  innerContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10, // Reduced margin to bring error message closer
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 5,
    overflow: 'hidden',
  },
  errorText: { // Style for the error message
    color: 'red',
    textAlign: 'center',
    marginBottom: 10, // Space below the error message
    fontSize: 14,
  },
});
