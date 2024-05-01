from google.cloud import pubsub_v1
import os
from Base import BaseConstants
import json
from Base.Monitors.BaseMonitor import BaseMonitor
os.environ['GOOGLE_APPLICATION_CREDENTIALS']=BaseConstants.FIREBASE_CRED_PATH

class PubSubClient(BaseMonitor):

    system = None
    project_id = ''
    topic_id = ''
    topic_path = ''
    project_path =''

    client = pubsub_v1.SubscriberClient()
    publisher = pubsub_v1.PublisherClient()
    subscriber = pubsub_v1.SubscriberClient()
    subscription_path = None
    streaming_pull_future = None

    def __init__(self, system, topic_id):
        super().__init__(1, system)
        self.topic_id = topic_id
        f = open(BaseConstants.FIREBASE_CRED_PATH)
        firebase_data = json.load(f)
        self.name = 'Client ' + topic_id
        self.project_id = firebase_data['project_id']
        self.project_path =  f"projects/" + self.project_id
        self.topic_path = self.publisher.topic_path(self.project_id, self.topic_id)

        self.createTopicIfDoesntExist()
        self.createSubscriberIfDoesntExist()

        self.subscription_path = self.subscriber.subscription_path(self.project_id, self.topic_id)
        self.streaming_pull_future = self.subscriber.subscribe(self.subscription_path, callback=self.initialMessageCall)
        self.init()

    def cycleOnce(self):
        self.waitForMessage()

    def createTopicIfDoesntExist(self):
        topicAlreadyExists = False

        for topic in self.publisher.list_topics(request={"project": self.project_path}):
            if (str(topic.name).endswith(self.topic_id)):
                topicAlreadyExists = True

        if not topicAlreadyExists:
            topic = self.publisher.create_topic(request={"name": self.topic_path})
            self.system.log(f"{self.topic_id} Client, Topic created")
        else:
            self.system.log(f"{self.topic_id} Client, Topic already exists")

    def initialMessageCall(self, message: pubsub_v1.subscriber.message.Message):
        self.system.log(f"{self.topic_id} Client, Message Received")
        message.ack()
        message = json.loads(message.data.decode("utf-8"))
        self.messageRecieved(message)
        self.waitForMessage()
    
    def messageRecieved(self, message):
        self.system.log('OVERRIDE THIS')

    def createSubscriberIfDoesntExist(self):
        subscriberAlreadyExists = False
        response = self.publisher.list_topic_subscriptions(request={"topic": self.topic_path})
        for subscription in response:
            if (subscription.endswith(self.topic_id)):
                subscriberAlreadyExists = True

        if (not subscriberAlreadyExists):
            subscription_path = self.client.subscription_path(self.project_id, self.topic_id)
            with self.subscriber:
                subscription = self.subscriber.create_subscription(
                    request={"name": subscription_path, "topic": self.topic_path}
                )
            self.system.log(f"{self.topic_id} Client, Subscriber created")
        else:
             self.system.log(f"{self.topic_id} Client, Subscriber already exists")

    def waitForMessage(self):
        self.system.log(f"{self.topic_id} Client, Listening for messages")
        # Wrap subscriber in a 'with' block to automatically call close() when done.
        with self.subscriber:
            try:
                # When `timeout` is not set, result() will block indefinitely,
                # unless an exception is encountered first.
                self.streaming_pull_future.result()
            except TimeoutError:
                self.streaming_pull_future.cancel()  # Trigger the shutdown.
                self.streaming_pull_future.result()  # Block until the shutdown is complete.

    def correctSingleQuoteJSON(self, s):
        rstr = ""
        escaped = False

        for c in s:
        
            if c == "'" and not escaped:
                c = '"' # replace single with double quote
            
            elif c == "'" and escaped:
                rstr = rstr[:-1] # remove escape character before single quotes
            
            elif c == '"':
                c = '\\' + c # escape existing double quotes
    
            escaped = (c == "\\") # check for an escape character
            rstr += c # append the correct json
        
        return rstr