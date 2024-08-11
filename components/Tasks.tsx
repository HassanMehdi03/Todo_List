import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function Tasks(props: {text: string}) {
  return (
    <View style={styles.container}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <Text style={styles.txtTask}>{props.text}</Text>
      </View>
      <View style={styles.smallSquare} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    marginStart: 20,
    marginEnd: 20,
    shadowColor: '#000',
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF666',
    borderRadius: 5,
    marginEnd: 15,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  smallSquare: {
    height: 12,
    width: 12,
    borderWidth: 2,
    borderColor: '#55BCF6',
    borderRadius: 5,
  },

  txtTask: {
    color: 'black',
    maxWidth: '80%',
  },
});
