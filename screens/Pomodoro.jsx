
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

export default function Pomodoro() {
  const [workTime, setWorkTime] = useState(25 * 60); // 25 minutes in seconds
  const [breakTime, setBreakTime] = useState(5 * 60); // 5 minutes in seconds
  const [timer, setTimer] = useState(workTime);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      setIsActive(false);

      if (isBreak) {
        setIsBreak(false);
        setTimer(workTime);
      } else {
        setIsBreak(true);
        setTimer(breakTime);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timer, isBreak, workTime, breakTime]);

  const toggleTimer = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setTimer(workTime);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.timer}>{formatTime(timer)}</Text>
        <Text style={styles.status}>{isBreak ? 'Break Time' : 'Work Time'}</Text>
        <TouchableOpacity style={styles.button} onPress={toggleTimer}>
          <Text style={styles.text}>{isActive ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={resetTimer}>
          <Text style={styles.text}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9E131A'
  },
  timer: {
    fontSize: 48,
    marginBottom: 20,
    color: 'white'
  },
  status: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white'
  },
  button: {
    backgroundColor: '#1D5019',
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 10
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'contain', // You can use 'contain' or other options for different resizing behavior
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center'
  },
  container2: {
    borderWidth: 2,
    padding: 70,
    borderRadius: 10,
    backgroundColor: '#CF2D2A'
  },
  text: {
    color: 'white'
  }
});
