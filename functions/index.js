const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// TODO: Remember to set token using >> firebase functions:config:set stripe.token="SECRET_STRIPE_TOKEN_HERE"
const stripe = require('stripe')(functions.config().stripe.token);

function charge(req, res) {
  const body = JSON.parse(req.body);
  const token = body.token.id;
  const amount = body.charge.amount;
  const currency = body.charge.currency;
  let order = body.order;
  order.date = new Date().toString();
  let orderId = Math.floor(100000000 + Math.random() * 900000000);
  order.orderId = orderId;
  // Charge card
  stripe.charges
    .create({
      amount,
      currency,
      description: 'Silver Maple Order',
      source: token,
      metadata: { orderId: orderId },
    })
    .then(charge => {
      admin
        .database()
        .ref('orders')
        .push(order);
      return send(res, 200, {
        message: 'Success',
        charge,
      });
    })
    .catch(err => {
      console.log(err);
      send(res, 500, {
        error: err.message,
      });
    });
}

function send(res, code, body) {
  return res.send({
    statusCode: code,
    body: JSON.stringify(body),
  });
}

exports.charge = functions.https.onRequest((req, res) => {
  // Set CORS headers
  // e.g. allow GETs from any origin with the Content-Type header
  // and cache preflight response for an 3600s
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Max-Age', '3600');
  // Send response to OPTIONS requests and terminate the function execution
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
  } else {
    try {
      charge(req, res);
    } catch (e) {
      console.log(e);
      send(res, 500, {
        error: `The server received an unexpected error. Please try again and contact the site admin if the error persists.`,
      });
    }
  }
});
