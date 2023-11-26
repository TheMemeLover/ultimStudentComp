import React, { useState, useEffect } from 'react';
import { View, Text, Button, ImageBackground } from 'react-native';

export default function Home() {

  return (
    <View style={{ flex: 1, paddingTop: 15, paddingLeft: 15 }}>
      <Text style={{fontWeight: 'bold', fontSize: 24}}>Overview</Text>
      
      <View style={{paddingTop: 170, paddingLeft: 20}}>
        <ImageBackground style={{height: 200, width: '100%'}} resizeMode="contain" source={{ uri: 'https://th.bing.com/th/id/R.ed5a37ffb474a2250d98a3cf2ba0a0c9?rik=5Zjkj9G8ovtz9Q&riu=http%3a%2f%2fclipart-library.com%2fimages%2f6Tr6RGzGc.png&ehk=txnCOLxU9t9%2f2JZTRQAU6rKC8r1H7tRBPlhKCMvqQXc%3d&risl=&pid=ImgRaw&r=0' }} />
        <Text style={{paddingLeft: 110, fontWeight: 'bold'}}>Nothing's due!</Text>
      </View>

    </View>
  )
}