import os

IS_DEV = os.getenv('DEV') == "True"

PIN_RESET_BUTTON = 20

SERIAL_PREFIX_LASER_TAINER = 'LT'
SERIAL_PREFIX_FEEDER= 'FE'

STATE_INITIALIZING = "Initializing"
STATE_IDLE = "Idle"
STATE_EXECUTING = "Executing"

COLLECTION_COMMANDS = "Commands"
COLLECTION_DEVICES = "Devices"
COLLECTION_GROUPS = "Groups"
COLLECTION_EVENTS = "Events"
COLLECTION_MESSAGES = "Messages"
COLLECTION_PETS = "Pets"
COLLECTION_SCHEDULES = "Schedules"
COLLECTION_STATUS = "Status"
COLLECTION_USERS = "Users"

COMMAND_PULL_CONFIG = "pullConfig"
COMMAND_EXECUTE = "execute"

FIREBASE_CRED_PATH = "./Base/Firebase/brightlife-firebase-key.json"
FIREBASE_PROJECT_ID = 'brightlife-c7d8d'

ALL_DAYS = 'All'
MONDAY = 'Monday'
TUESDAY = 'Tuesday'
WEDNESDAY = 'Wednesday'
THURSDAY = 'Thursday'
FRIDAY = 'Friday'
SATURDAY = 'Saturday'
SUNDAY = 'Sunday'