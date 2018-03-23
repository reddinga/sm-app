var admin = require('firebase-admin');
var serviceAccount = require('../../silver-maple-b0405-firebase-adminsdk-za2wg-6d2e4ec226.json');
var fs = require('fs');
var parse = require('csv-parse');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://silver-maple-b0405.firebaseio.com',
});

var db = admin.firestore();
var fileName = process.argv[2];

let labels = [];
const collectionName = 'products';

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
    db
      .collection(collectionName)
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
