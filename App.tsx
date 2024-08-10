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
  ToastAndroid

} from 'react-native';

import Tasks from './components/Tasks';

const App = () => {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState<string[]>([]);
  const [isUpdating,setIsUpdating]=useState<boolean>(false);
  const [updateIndex,setUpdateIndex]=useState<number | null>(null);
  const addTask = () => {
    if (task === '') {
      ToastAndroid.show("Please write a task", ToastAndroid.SHORT);
      return;
    }

    if(isUpdating && updateIndex!==null)
    {
      const itemsCopy=[...taskItems];
      itemsCopy[updateIndex]=task;
      setTaskItems(itemsCopy);
      setIsUpdating(false);
      setUpdateIndex(null);
    }
    else
    {
      setTaskItems([...taskItems, task]);
    }
    Keyboard.dismiss();
    setTask('');
  };

  const deleteTask=(index:number)=>
  {
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
          },
        },
        {
          text:'Update',
          onPress:()=>
          {
             setIsUpdating(true);
             setTask(taskItems[index]);
             setUpdateIndex(index);
          }
        },
      ],
      {
        cancelable: true,
      }
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.tastTitle}>Today's tasks</Text>
      <View style={styles.items}></View>
      <ScrollView>
        {taskItems.length===0 ? (
          <Text style={styles.noTask}>No tasks added yet</Text>
        ) : (
          taskItems.map((item, index) => {
            return (
              <TouchableOpacity onPress={()=>deleteTask(index)}>
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
            onChangeText={(task) => setTask(task)}
          />
          <TouchableOpacity onPress={() => addTask()}>
            <View style={styles.add}>
              <Text style={styles.addIcon}>{isUpdating?'✓':'+'}</Text>
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
  },

  input: {
    height: 50,
    width: 246,
    borderRadius: 60,
    marginStart: 20,
    marginVertical: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    elevation: 5,
    paddingHorizontal: 20,
  },

  add: {
    width: 60,
    height: 60,
    borderRadius: 52,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
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
