import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Line = () => {
    return (
    <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
        <View style={{flex: 1, height: 1,
             backgroundColor: "rgba(255, 255, 255, 0.4)"
             }} />
    </View>

    );
};

export default Line