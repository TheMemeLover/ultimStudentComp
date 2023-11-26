import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CalendarComp from './screens/CalendarComp'
import Home from './screens/Home'
import Pomodoro from './screens/Pomodoro';
import Tasks from './screens/Tasks';


const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Feed" >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{ drawerLabel: 'Home' }}
      />
      <Drawer.Screen
        name="Calendar"
        component={CalendarComp}
        options={{ drawerLabel: 'Calendar' }}
      />
      <Drawer.Screen
        name="Tasks"
        component={Tasks}
        options={{ drawerLabel: 'Tasks' }}
      />
      <Drawer.Screen
        options={{
          drawerLabel: 'Study Technique: Pomodoro',
          headerStyle: {
            backgroundColor: '#4E8F4C', // Background color for the Pomodoro screen header
          },
          headerTintColor: '#fff', // Text color for the Pomodoro screen header
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        name="Pomodoro Technique"
        component={Pomodoro}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}