import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyDa3B54UqYRYY2uD9hq9ip-AgYG7EoLAbc",
	authDomain: "wandertracker-a8b68.firebaseapp.com",
	databaseURL: "https://wandertracker-a8b68.firebaseio.com",
	projectId: "wandertracker-a8b68",
	storageBucket: "wandertracker-a8b68.appspot.com",
	messagingSenderId: "693428461156",
	appId: "1:693428461156:web:2db8f60f3abb03bb714971"
};

firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GithubAuthProvider();
export const database = firebase.database();
export const auth = firebase.auth();
export default firebase;
