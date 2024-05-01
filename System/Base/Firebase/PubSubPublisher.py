from google.cloud import pubsub_v1
import os
from concurrent import futures
from typing import Callable
import json
from Base import BaseConstants

os.environ['GOOGLE_APPLICATION_CREDENTIALS']=BaseConstants.FIREBASE_CRED_PATH
class PubSubPublisher:

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
        self.system = system
        self.topic_id = topic_id
        f = open(BaseConstants.FIREBASE_CRED_PATH)
        firebase_data = json.load(f)
        self.project_id = firebase_data['project_id']
        self.project_path =  f"projects/" + self.project_id
        self.topic_path = self.publisher.topic_path(self.project_id, self.topic_id)

        self.createTopicIfDoesntExist()
    
    def createTopicIfDoesntExist(self):
        topicAlreadyExists = False

        for topic in self.publisher.list_topics(request={"project": self.project_path}):
            if (str(topic.name).endswith(self.topic_id)):
                topicAlreadyExists = True

        if not topicAlreadyExists:
            topic = self.publisher.create_topic(request={"name": self.topic_path})
            self.system.log(f"{self.topic_id} Publisher, Topic created")
        else:
            self.system.log(f"{self.topic_id} Publisher, Topic already exists")

    def sendMessage(self, data): 
        data = str(data)
        # When you publish a message, the client returns a future.
        publish_future = self.publisher.publish(self.topic_path, data.encode("utf-8"))
        # Non-blocking. Publish failures are handled in the callback function.
        publish_future.add_done_callback(self.get_callback(publish_future, data))
        futureList = [publish_future]
        futures.wait(futureList, return_when=futures.ALL_COMPLETED)
        self.system.log(f"{self.topic_id} Publisher, Published message")

    def get_callback(self, publish_future: pubsub_v1.publisher.futures.Future, data: str ) -> Callable[[pubsub_v1.publisher.futures.Future], None]:
        def callback(publish_future: pubsub_v1.publisher.futures.Future) -> None:
            try:
                # Wait 60 seconds for the publish call to succeed.
                publish_future.result(timeout=60)
            except futures.TimeoutError:
                self.system.log(f"Publishing {data} timed out.")

        return callback