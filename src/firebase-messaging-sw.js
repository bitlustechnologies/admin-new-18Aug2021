// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.21.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.21.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  apiKey: 'AIzaSyAhSq73ZvfIP7uSZtHTddkrT-mqf-4Vezw',
  authDomain: 'bitlus-8cb97.firebaseapp.com',
  databaseURL: 'https://bitlus-8cb97.firebaseio.com',
  projectId: 'bitlus-8cb97',
  storageBucket: 'bitlus-8cb97.appspot.com',
  messagingSenderId: '192967366902',
  appId: '1:192967366902:web:ffea653b699c3494dd34d7',
  measurementId: 'G-EG91ZFH2VW'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
