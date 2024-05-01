export class Constants {
    static UI_STORAGE_VARIABLE_PREFIX = 'BrightLife'

    //Screen Sizes
    static SCREEN_SIZE_SMALL = 'Small';
    static SCREEN_SIZE_MEDIUM = 'Medium';
    static SCREEN_SIZE_LARGE = 'Large';

    static DEVICE_TYPE_FEEDER = 'Feeder';
    static DEVICE_TYPE_LASER_TAINER = 'LaserTainer';

    static DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    static THEME_DEFAULT = 'default';
    static THEME_DARK = 'dark';
    
    static ROUTE_ADD_DEVICE = 'registerDevice';
    static ROUTE_HOME = 'home';
    static ROUTE_ACCOUNT = 'account';
    static ROUTE_FAVORITES = 'favorites';
    static ROUTE_DEVICE_SETTINGS = 'DeviceSettings';
    static ROUTE_DEVICE = 'device';
    static ROUTE_MESSAGES = 'messages'
    static ROUTE_HELP = 'help';
    static ROUTE_SCHEDULE = 'schedule';
    static ROUTE_HISTORY = 'history';
    static ROUTE_DEVICES = 'devices';

    static COLLECTION_COMMANDS = 'Commands';
    static COLLECTION_DEVICES = 'Devices';
    static COLLECTION_EVENTS = 'Events';
    static COLLECTION_GROUPS = 'Groups';
    static COLLECTION_MESSAGES = 'Messages';
    static COLLECTION_PETS = 'Pets';
    static COLLECTION_SCHEDULES = 'Schedules';
    static COLLECTION_STATUS = 'Status';
    static COLLECTION_USERS = 'Users';

    static STATE_IDLE = 'Idle';
    static STATE_INITIALIZING = 'Initializing';
    static STATE_EXECUTING = 'Executing';
    static STATE_ERROR = 'Error';
}