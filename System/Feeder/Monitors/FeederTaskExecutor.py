from Base import BaseConstants 
import time
import threading
import traceback
import calendar
from datetime import date
from Base.Monitors.TaskExecutor import TaskExecutor

class FeederTaskExecutor(TaskExecutor):

    successTitle = 'Fed'
    failureTitle = 'Failed to feed'
    successMessage = ''
    failureMessage = ''

    def executeTask(self):
        event = {
            'ownerID': self.system.deviceData.device['ownerID'],
            'deviceID': self.system.getSerialNo()
        }
        pet_name = ''
        pets = self.system.deviceData.pets
        if (pets is not None and len(pets) > 0):
            pet_name = pets[0]['name']

        try:
            cups = float(self.task['valueParam'])
            interval = 1
            timeCounter = 0
            # while(timeCounter <= (lenOfTimeMin * 60)):
            #     if (self.killed):
            #         return
            #     time.sleep(interval)
            #     # Servo Stuff
            #     # self.armSubsystem
            #     timeCounter = timeCounter + 1

            event['title'] = 'Fed ' + pet_name
            event['level'] = 'good'
            event['message'] = 'Finished feeding ' + pet_name + '.'
        except: 
            message = {
                'ownerID': self.system.deviceData.device['ownerID'],
                'deviceID': self.system.getSerialNo(),
                'title': 'Failed to feed ' + pet_name,
                'level': 'error',
                'createTime': time.time() * 1000,
                'message': 'There was an error when we tried to feed ' + pet_name + ', please restart the device.'
            }
            event['title'] = 'Failed to feed ' + pet_name,
            event['message'] = 'There was an error when we tried to feed ' + pet_name + '.'
            event['level'] = 'error'
            self.postMessage(message)

        event['createTime'] = time.time() * 1000
        self.postEvent(event)

    # def cleanUp(self):
        # self.system.laserSubsystem.turnOffLaser()
        