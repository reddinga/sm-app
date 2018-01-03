var admin = require('firebase-admin');

var serviceAccount = require('../../silver-maple-b0405-firebase-adminsdk-za2wg-6d2e4ec226.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://silver-maple-b0405.firebaseio.com',
});
console.log('adding data');
// Add a new document with a generated id.
var db = admin.firestore();

var addDoc = db
  .collection('florals')
  .add({
    name: 'red rose',
    color: 'red',
    type: 'rose',
  })
  .then(ref => {
    console.log('Added document with ID: ', ref.id);
  });

// create a spreadsheet with all floral/greenery info
// import to firebase via script like above
