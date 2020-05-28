import firebase from 'firebase'

export function pullData(callBack) {
  const user = firebase.auth().currentUser
  firebase.database()
    .ref(`habitLists/habits_${user.uid}`)
    .once('value')
    .then(snapshot => {
      callBack(snapshot)
    })
}


export function addNewUser() {
  var username = firebase.database().ref('users');
  const user = firebase.auth().currentUser;
  var newUser = username.child(`${user.uid}`);
  var habitLists = firebase.database().ref('habitLists');
  var habitList = habitLists.child(`habits_${user.uid}`);
  habitList.set({
    'user': user.email
  })

  var tasksLists = firebase.database().ref('taskLists');
  var taskList = tasksLists.child(`tasks_${user.uid}`);
  taskList.set({
    'user': user.email
  })

  // console.log(user.uid)
  newUser.set({
      'email': user.email,
      'habit_list_id': habitList.key,
      'task_list_id': taskList.key
  });
}

export function saveHabit(title, description) {
  const user = firebase.auth().currentUser;
  var userId = firebase.database().ref(`habitLists/habits_${user.uid}`);
  var habitId = userId.push();
  // console.log(title)
  habitId.set({
      'name': title,
      'description': description
  });
}

export function saveTask(title, description) {
  const user = firebase.auth().currentUser;
  var userId = firebase.database().ref(`taskLists/tasks_${user.uid}`);
  var taskId = userId.push();
  // console.log(title)
  taskId.set({
      'name': title,
      'description': description
  });
}

  module.exports = {addNewUser, saveHabit, saveTask, pullData}
