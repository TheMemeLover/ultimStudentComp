import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from 'react-native';
import Modal from "react-native-modal";
import React from 'react';
import { Button } from "react-native-elements";
import { Agenda, CalendarProvider, ExpandableCalendar, Timeline } from 'react-native-calendars';
import DatePickerModal from "react-native-modal-datetime-picker";
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';

export default function CalendarComp() {
  const navigation = useNavigation();
  const [visibility, setVisibility] = React.useState(false)
  const [events, setEvents] = React.useState({});
  const [marksDate, setMarksDate] = React.useState({});
  const [refreshCalender, setRefreshCalender] = React.useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = React.useState(false);
  const [error, setError] = React.useState('')
  
  const [information, setInformation] = React.useState({
    text: '',
    label: '',
    date: '',
    time: { converted: '', local: '' }
  });




  function formatDate(inputDate) {
    const dateObj = new Date(inputDate);
    const year = dateObj.getUTCFullYear();
    const month = `0${dateObj.getUTCMonth() + 1}`.slice(-2);
    const day = `0${dateObj.getUTCDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  }
  function convertToLocalTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const options = { hour: 'numeric', minute: '2-digit', hour12: true };
    const localTime = date.toLocaleTimeString('en-US', options);
    return localTime.toLowerCase();
  }
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
  const handleDateConfirm = (date) => {
    setInformation( prevInformation => {
      return {
        ...prevInformation,
        date: formatDate(date)
      }
    })
    
    hideDatePicker()
    
  };

  const handleTimeConfirm = (time) => {
    setInformation( prevInformation => {
      return {
        ...prevInformation,
        time: {converted: JSON.stringify(time).split('T')[1], local: convertToLocalTime(time)}
      }
    })
    hideTimePicker()
  };
  React.useEffect(() => console.log("A time has been picked: ", events), [events])
  function toggleModal() {
    setError('')
    setVisibility(prevVisibility => !prevVisibility)
  }
  function removeTrailingQuote(inputString) {
      return inputString.slice(0, -1);
    
  }
  function onAddEventSubmit(inputDate, inputTime, label, description) {
    if (inputDate && inputTime.local && label.trim() !== '' && description.trim() !== '') {
      setRefreshCalender(true);
  
      const newEventDetails = {
        date: inputDate,
        label: label,
        time: inputTime.local,
        description,
        convertedTime: inputTime.converted
      };
  
      // Notifications setup and triggering
      const notificationDate = new Date(`${inputDate}T${removeTrailingQuote(inputTime.converted)}`);
      const notificationTitle = `Reminder for ${label}`;
      const notificationBody = `${description}`;
  
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });
  
      Notifications.scheduleNotificationAsync({
        content: {
          title: notificationTitle,
          body: notificationBody,
        },
        trigger: {
          date: notificationDate,
        },
      });
  
      // Update state
      setEvents(prevEvents => {
        const updatedEvents = { ...prevEvents };
        if (!updatedEvents[newEventDetails.date]) {
          updatedEvents[newEventDetails.date] = [];
        }
        updatedEvents[newEventDetails.date].push(newEventDetails);
  
        return updatedEvents;
      });
  
      // Update marksDate state
      const newMark = {
        [newEventDetails.date]: {
          customStyles: {
            container: {
              backgroundColor: '#0f0',
            },
            text: {
              color: 'white',
              fontWeight: 'bold',
            },
          },
        },
      };
      setMarksDate(prevMarks => ({ ...prevMarks, ...newMark }));
  
      // Reset form and flags
      setRefreshCalender(false);
      toggleModal();
      setInformation({
        text: '',
        label: '',
        date: '',
        time: { converted: '', local: '' },
      });
    } else {
      setError('Please fill out all fields');
    }
  }
  
function handleText(text) {
  setInformation(prevInformation => ({ ...prevInformation, text }));
}

function handleLabel(label) {
  setInformation(prevInformation => ({ ...prevInformation, label }));
}

  return (
    <>
      <View style={styles.plusContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleModal}>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
      </View>
      <Agenda
        refreshing={refreshCalender}
        items={events}
        renderItem={(item) => (
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemTime}>{item.time}</Text>
            <Text style={styles.itemLabel}>{item.label}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
        scrollToNextEvent
        markedDates={marksDate}
      />
      <Modal 
        isVisible={visibility}
        backdropOpacity={.35}
        style={styles.modalStyles}
        onBackButtonPress={toggleModal}
        swipeDirection={'down'}
        onSwipeComplete={toggleModal}
        backdropTransitionOutTiming={0}
      >
        <View style={styles.newEventStyles}>
          <Text style={styles.newEventStylesText}>New Event</Text>
        </View>
        <View style={styles.dateSection}>
          <TextInput
            style={styles.input}
            value={information.label}
            onChangeText={handleLabel}
            placeholder='Label'
          />
          <TextInput
            style={styles.descriptionInput}
            value={information.text}
            onChangeText={handleText}
            placeholder='Additional Information'
          />
        </View>
        
        <View style={styles.dateSection}>
          <TouchableOpacity style={styles.date} onPress={showDatePicker}>
            <Text style={styles.dateText}>{information.date || 'Pick a Date'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.time} onPress={showTimePicker}>
            <Text style={styles.dateText}>{information.time.local || 'Pick a Time'}</Text>
          </TouchableOpacity>
        </View>
        <DatePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />
        <DatePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
        />
        <TouchableOpacity style={styles.submit} onPress={() => onAddEventSubmit(information.date, information.time, information.label, information.text)}>
          <Text style={styles.submitText}>Save</Text>
        </TouchableOpacity>
        <Text style={styles.error}>{error}</Text>
        <TouchableOpacity style={styles.button2} onPress={toggleModal}>
          <Text style={styles.plus}>-</Text>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

  
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    borderLeftColor: 'purple',
    borderLeftWidth: 4
  },
  itemTime: {
    color: '#888',
    fontSize: 16,
  },
  itemLabel: {
    color: 'black',
    fontSize: 20,
  },
  itemDescription: {
    color: 'black',
    fontSize: 18,
  },
  plusContainer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 10

  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: 'navy',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100
  },
  button2: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: 'navy',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  plus: {
    fontSize: 30,
    color: 'white',
  },
  modalStyles: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    position: 'absolute',
    bottom: 0,
    margin: 0
  },
  input: {
    width: '30%',
    height: 70,
    borderWidth: 1,
    fontSize: 18,
    paddingLeft: 10
  },
  descriptionInput: {
    width: '70%',
    height: 70,
    borderWidth: 1,
    fontSize: 18,
    paddingLeft: 10
  },
  dateSection: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  dateText: {
    paddingTop: 10
  },
  newEventStyles: {
    backgroundColor: '#007F8C',
    width: '100%',
    alignItems: 'center',
    height: '10%',
    justifyContent: 'center'
  },
  newEventStylesText: {
    color: 'white',
    fontSize: 22
  },
  date: {
    height: 70,
    borderWidth: 1,
    justifyContent: 'center',
    width: '60%',
    
  },
  dateText: {
    fontSize: 18,
    paddingLeft: 10
  },
  time: {
    height: 70,
    borderWidth: 1,
    justifyContent: 'center',
    width: '40%'
  },
  submit: {
    height: 70,
    backgroundColor: 'navy',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitText: {
    color: 'white',
    fontSize: 20
  },
  error: {
    color: 'red',
    paddingLeft: "30%"
  }
});
