import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';


admin.initializeApp();
const db = admin.firestore();

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

export const createUserDocument = functions.auth.user().onCreate((user) => {
    db.collection('users')
    .doc(user.uid)
    .set(JSON.parse(JSON.stringify(user)));
});