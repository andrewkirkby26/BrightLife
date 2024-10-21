from Base import BaseConstants 
import time
import threading
import traceback
import calendar
from datetime import date
from Base.Monitors.TaskExecutor import TaskExecutor
from Base.Entities.Event import Event

class LaserTainerTaskExecutor(TaskExecutor):

    successTitle = 'Played'
    failureTitle = 'Failed to execute task'
    successMessage = ''
    failureMessage = ''

    def executeTask(self):
        deviceData = self.system.getDeviceData()
        event = Event(deviceData.get_device().get_ownerID(),self.system.getSerialNo())
        pet_name = ''
        pets = deviceData.get_pets()
        if (pets is not None and len(pets) > 0):
            pet_name = pets[0]['name']

        try:
            lenOfTimeMin = float(self.task['valueParam'])
            self.system.laserSubsystem.turnOnLaser()
            interval = 1
            timeCounter = 0
            while(timeCounter <= (lenOfTimeMin * 60)):
                if (self.killed):
                    return
                time.sleep(interval)
                # Servo Stuff
                # self.armSubsystem
                timeCounter = timeCounter + 1

            event['title'] = 'Played with ' + pet_name
            event['level'] = 'good'
            event['message'] = 'Finished playing with ' + pet_name + '. Played for ' + str(lenOfTimeMin) + ' minutes'
        except: 
            message = {
                'ownerID': self.system.deviceData.device['ownerID'],
                'deviceID': self.system.getSerialNo(),
                'title': 'Failed to play with ' + pet_name,
                'level': 'error',
                'createTime': time.time() * 1000,
                'message': 'There was an error when we tried playing with ' + pet_name + ', please restart the device.'
            }
            event['title'] = 'Failed to play with ' + pet_name,
            event['message'] = 'There was an error when we tried playing with ' + pet_name + ', please restart the device.'
            event['level'] = 'error'
            self.postMessage(message)

        event['createTime'] = time.time() * 1000
        self.postEvent(event)

    def cleanUp(self):
        self.system.laserSubsystem.turnOffLaser()
        