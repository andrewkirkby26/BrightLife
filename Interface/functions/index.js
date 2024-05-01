const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { info,warn,error } = require("firebase-functions/logger");
const { firestore } = require("firebase-admin");
const {PubSub} = require('@google-cloud/pubsub');
const cors = require('cors')({ origin: true });

admin.initializeApp();

exports.removeExpiredStates = functions.pubsub.schedule("every 24 hours").onRun(async (context) => {
  const db = admin.firestore();
  const now = firestore.Timestamp.now().toMillis();
  const ts = now - 86400000;
  info('Starting purge, expiration time for purge is: ', ts)
  const snap = await db.collection("/Status").where("createTime", "<", ts).get();
  warn('Number of status to be purged: ', snap.size)
  let promises = [];
  snap.forEach((snap) => {
    promises.push(snap.ref.delete());
  });
  return Promise.all(promises);
});

exports.postMessage = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    try {
      info('Attempting to post message for body:', req.body);
      let body = req.body.data;
      let topic = body.topic;
      let message = JSON.stringify(body.message);
      info('Posting to topic: ' + topic + ' with message: ', message)
      const pubSubClient = new PubSub();
      pubSubClient.topic(topic).publishMessage({data: Buffer(message)});
      info('Successfully sent message')
    } catch (e) {
      error('Error in postMessage: ', e)
      res.status(500).send({data: {'success': false, 'error': e}})
    }
    res.status(200).send({data: {'success': true}})
  });
});