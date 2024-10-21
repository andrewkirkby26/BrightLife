from Base.Monitors.BaseMonitor import BaseMonitor
from Base import BaseConstants 
import time
import calendar
from datetime import date

class ScheduleMonitor(BaseMonitor):

    name = "Schedule Monitor"
    
    def cycleOnce(self):
        if (self.system.getStatus().getState() != BaseConstants.STATE_EXECUTING):
            now = self.system.getNowTime()
            if (now != self.system.lastExecuteTime):
                commandToExecute = self.parseScheduleForTime()
                if commandToExecute is not None and self.system.initialized:
                    self.system.log('Executing based on schedule')
                    self.system.executeRequest(commandToExecute)

    def parseScheduleForTime(self):
        rVal = None
        wholeSchedule = self.system.getDeviceData().get_schedules()
        
        if wholeSchedule is not None and len(wholeSchedule) > 0:
            for schedule in wholeSchedule:
                if schedule.get_enabled():
                    dayMatches = False
                    weekday = calendar.day_name[date.today().weekday()]
                    schedDays = schedule.get_days()
                    for schedDay in schedDays:
                        if schedDay == BaseConstants.ALL_DAYS or schedDay == weekday:
                            dayMatches = True
                    
                    if dayMatches:
                        now = self.system.getNowTime()
                        time = schedule.get_time()
                        if time == now:
                            #Winner Winner chicken dinner
                            return schedule

        return rVal
