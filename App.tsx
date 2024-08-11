import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Keyboard,
  Alert,
  ToastAndroid,
  Dimensions
} from 'react-native';

import Tasks from './components/Tasks';

const {width}=Dimensions.get('window');


const App = () => {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState<string[]>([]);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updateIndex, setUpdateIndex] = useState<number | null>(null);
  const addTask = () => {
    if (task === '') {
      ToastAndroid.show('Please write a task', ToastAndroid.SHORT);
      return;
    }

    if (isUpdating && updateIndex !== null) {
      const itemsCopy = [...taskItems];
      itemsCopy[updateIndex] = task;
      setTaskItems(itemsCopy);
      setIsUpdating(false);
      setUpdateIndex(null);
      ToastAndroid.show("Task updated successfully", ToastAndroid.SHORT);
    } 
    else 
    {
      setTaskItems([...taskItems, task]);
      ToastAndroid.show(
        'Task added successfully',
        ToastAndroid.SHORT,
      )
    }
    Keyboard.dismiss();
    setTask('');
  };

  const deleteTask = (index: number) => {
    Alert.alert(
      'Edit or Delete',
      'Are you sure you want to update or delete this task?',
      [
        {
          text: 'Delete',
          onPress: () => {
            let itemsCopy = [...taskItems];
            itemsCopy.splice(index, 1);
            setTaskItems(itemsCopy);
            ToastAndroid.show("Task deleted successfully", ToastAndroid.SHORT);
          },
        },
        {
          text: 'Update',
          onPress: () => {
            setIsUpdating(true);
            setTask(taskItems[index]);
            setUpdateIndex(index);
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tastTitle}>Today's tasks</Text>
      <View style={styles.items}></View>
      <ScrollView>
        {taskItems.length === 0 ? (
          <Text style={styles.noTask}>No tasks added yet</Text>
        ) : (
          taskItems.map((item, index) => {
            return (
              <TouchableOpacity 
              activeOpacity={0.8} onPress={() => deleteTask(index)}>
                <Tasks key={index} text={item} />
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
      <View>
        <KeyboardAvoidingView style={styles.addTaskContainer}>
          <TextInput
            placeholder="Write a task"
            style={styles.input}
            value={task}
            onChangeText={task => setTask(task)}
          />
          <TouchableOpacity activeOpacity={0.8} onPress={() => addTask()}>
            <View style={styles.add}>
              <Text style={styles.addIcon}>{isUpdating ? '✓' : '+'}</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8EAED',
    flex: 1,
  },

  tastTitle: {
    fontWeight: '700',
    fontSize: 24,
    color: 'black',
    marginTop: 20,
    paddingHorizontal: 20,
  },

  items: {
    marginTop: 20,
  },

  addTaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width:width
  },

  input: {
    height: 50,
    width: width*0.65,
    borderRadius: 60,
    marginStart: 20,
    marginVertical: 20,
    backgroundColor: 'white',
    shadowColor: 'black',
    elevation: 5,
    paddingHorizontal: 20,
  },

  add: {
    width: width*1/6,
    height: 60,
    borderRadius: 52,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    elevation: 5,
    marginEnd: 20,

  },

  addIcon: {
    fontSize: 35,
    fontWeight: '100',
  },

  noTask: {
    fontSize: 20,
    fontWeight: '700',
    paddingHorizontal: 20,
    marginTop: 20,
    textAlign: 'center',
    color: 'black',
    opacity: 0.5,
  },
});

export default App;
