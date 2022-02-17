import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
class firebaseSvc {
  constructor() {
    if (!firebase.apps.length) {
      //avoid re-initializing
      firebase.initializeApp({
        apiKey: 'AIzaSyCwdq0mhdBPLHmdqOzNX1CfFanmblQq_oY',
        authDomain: 'taxigo11223.firebaseapp.com',
        databaseURL:
          'https://taxigo11223-default-rtdb.asia-southeast1.firebasedatabase.app',
        projectId: 'taxigo11223',
        storageBucket: 'taxigo11223.appspot.com',
        messagingSenderId: '9161293574',
        appId: '1:9161293574:web:0552e2a76be6586c68e887',
      });
    }
  }
  login = async (user: any, login_success: (user: any) => void) => {
    await auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(async response => {
        console.log(response.user, 'success');
        const token = await firebase.auth().currentUser.getIdToken();
        console.log(token, token);
        login_success({
          email: response.user.email,
          name: response.user.displayName,
          token,
          phoneNumber: response.user.phoneNumber,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  createAccount = async (user: any, signUpSuccess: any) => {
    auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(() => {
        const userRef = auth().currentUser;
        const newReference = database().ref('/users').push();
        newReference.set({
          email: user.email,
          full_name: user.name || user.email.split('@')[0] || user.email,
          id: userRef.uid,
          avatar: userRef.photoURL || null,
          phone_number: userRef.phoneNumber || user.phoneNumber,
        });
          signUpSuccess();
      })
      .catch(error => {
        console.log(error, 'Sign up failed!');
        alert('Sign up failed, please try again.');
      });
  };
  // uploadImage = async uri => {
  //   try {
  //     const response = await fetch(uri);
  //     const blob = await response.blob();
  //     const ref = storage().ref('avatar').child(uuid.v4());
  //     const task = ref.put(blob);
  //     return new Promise((resolve, reject) => {
  //       task.on(
  //         'state_changed',
  //         () => {},
  //         reject,
  //         () => resolve(task.snapshot.downloadURL),
  //       );
  //     });
  //   } catch (err) {
  //     console.log('uploadImage error: ' + err.message);
  //   }
  // };
}
const FirebaseService = new firebaseSvc();
export default FirebaseService;
