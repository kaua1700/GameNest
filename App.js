import {StatusBar} from 'expo-status-bar';
import {View, Text, StyleSheet} from 'react-native';
import React from "react";
import Routes from './router'


export default function App() {
  return (
    <>
     <StatusBar style="light" backgroundColor="#000" />
     <Routes />
    </>
  );
}