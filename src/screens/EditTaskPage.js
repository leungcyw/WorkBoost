import React, { Component, useState } from 'react';
import { View, ScrollView, TextInput, Button, Keyboard, TouchableOpacity, StyleSheet, Text, Alert, Image } from 'react-native';
import {Header} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';


export default function EditTaskPage(props) {

    const [title, setTitle] = useState(props.item.name);
    const [description, setDescription] = useState(props.item.description);
    const [dueDate, setDueDate] = useState(props.item.dueDate);

    let changeDate = dueDate.split('-')
    const [date, setDate] = useState(new Date(changeDate[2], changeDate[0]-1, changeDate[1]));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(true);

    const onChange = (event, selectedDate) => {
        setShow(Platform.OS === 'ios');
        setDate(selectedDate);
        let transform = selectedDate.toString().split(' ');
        let monthName = transform[1];
        let day = transform[2];
        let year = transform[3];
        let month = 0;
        
        switch(monthName) {
            case 'Jan':
                month = 1;
            break;
            case 'Feb':
                month = 2;
            break;
            case 'Mar':
                month = 3;
            break;
            case 'Apr':
                month = 4;
            break;
            case 'May':
                month = 5;
            break;
            case 'Jun':
                month = 6;
            break;
            case 'Jul':
                month = 7;
            break;
            case 'Aug':
                month = 8;
            break;
            case 'Sep':
                month=9;
            break;
            case 'Oct':
                month=10;
            break;
            case 'Nov':
                month=11;
            break;
            case 'Dec':
                month=12;
            break;

        }
        setDueDate(`${month}-${day}-${year}`);
        console.log(dueDate)
        
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    function BackButton() {
        return(
            <TouchableOpacity onPress={() => props.showEditForm()}>
                <Image source={require("../pictures/cancel.png")}
                    style={{width:30, height:30}}
                />
            </TouchableOpacity>
        )
    }

    return(
        <View style={styles.container}>
            <View>
                <Header containerStyle={{backgroundColor:'#ffff', paddingTop:0, marginTop:0}}
                        leftComponent={<BackButton />}
                        centerComponent={{text: 'Edit Task', style: {fontSize:35}}}
                />
            </View>
            <ScrollView>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Task Title"
                        onBlur={Keyboard.dismiss}
                        value={title}
                        onChangeText={text => setTitle(text)}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Task Description (Optional)"
                        onBlur={Keyboard.dismiss}
                        value={description}
                        onChangeText={text => setDescription(text)}
                    />
                    <Text style={styles.dueDateText}>Due Date Selector</Text>
                    {show && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        />
                    )}
                    <View style={styles.inputContainer}>
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={() => {
                                if (title == "") {alert('Missing Task Title');}
                                else {props.editTask(props.item.key ,title,description, dueDate)
                                     props.showEditForm()}
                            }}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputContainer}>
                        <TouchableOpacity
                            style={styles.removeButton}
                            onPress={() => {
                                props.showEditForm()
                                props.remove(props.item.key);
                            }}
                        >
                            <Text style={styles.saveButtonText}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 45,
      backgroundColor: '#ffff',
    },
    header: {
      fontSize: 25,
      textAlign: 'center',
      margin: 10,
      fontWeight: 'bold'
    },
    inputContainer: {
        paddingTop: 15
      },
    textInput: {
        borderColor: '#CCCCCC',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        height: 50,
        fontSize: 20,
        paddingLeft: 20,
        paddingRight: 40
    },
    saveButton: {
        borderWidth: 1,
        borderRadius:20,
        borderColor: '#996633',
        backgroundColor: '#996633',
        padding: 15,
        margin: 10
      },
    removeButton: {
        borderWidth: 1,
        borderRadius:20,
        borderColor: '#4d3319',
        backgroundColor: '#4d3319',
        padding: 15,
        margin: 10
      },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center'
    },
    dueDateText: {
        marginTop: 15,
        fontSize: 20,
        color: '#696969',
        textAlign: 'center'
    }
  });