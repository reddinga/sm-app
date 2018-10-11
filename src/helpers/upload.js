let admin = require('firebase-admin');
let serviceAccount = require('../../silver-maple-b0405-firebase-adminsdk-za2wg-6d2e4ec226.json');
let fs = require('fs');
let parse = require('csv-parse');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://silver-maple-b0405.firebaseio.com',
});

let db = admin.firestore();
let collectionName = process.argv[2]; // ie products
let fileName = process.argv[3];
console.log('uploading: ', collectionName);
let labels = [];
fs.createReadStream(__dirname + '/' + fileName).pipe(
  parse({ delimiter: ',' }, function(err, data) {
    if (err) {
      return console.log(err);
    }
    labels = data.shift();
    console.log('labels', labels);
    updateCollection(data).then(() => {
      console.log('Successfully imported collection!');
    });
  }),
);

async function updateCollection(dataArray) {
  dataArray.forEach(row => {
    let doc = {};
    labels.forEach((label, index) => {
      if (row[index]) {
        doc[label] = row[index];
      }
    });
    console.log('doc', doc);
    startUploading(doc).then(res => console.log('res', res));
  });
}

function startUploading(doc) {
  return new Promise(resolve => {
    db.collection(collectionName)
      .add(doc)
      .then(ref => {
        console.log('Added document with ID: ', ref.id);
        resolve('Data written!');
      })
      .catch(error => {
        console.log(error);
      });
  });
}
