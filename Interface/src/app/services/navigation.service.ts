import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common'
import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { stringify } from '@angular/compiler/src/util';
import { Button } from 'src/app/interfaces/button';
import { AuthenticationService } from './authentication.service';
import { env } from 'process';
import { EventService } from './event.service';
import { CheckboxRequiredValidator } from '@angular/forms';
import { repeat } from 'rxjs/operators';
import { DataCacheService } from './dataHolderService';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Constants } from '../constants/constants';
import { PerspectiveComponent } from '../components/pages/perspective/perspective.component';
import { Utils } from '../utils/utils';
import { FirestoreService } from '../firebase/firestore.service';
import { where } from "firebase/firestore";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/components/dialog/dialog.component';
import { DeviceService } from './device.service';
import { Device } from '../interfaces/devices/device';
import { ScheduleService } from './schedule.service';
import { Schedule } from '../interfaces/schedule';

@Injectable({
  providedIn: 'root',
})
export class NavigationService{

    constructor(public snackBar: MatSnackBar, public dialog: MatDialog, private router: Router, private route: ActivatedRoute,private location: Location,  public authenticationService: AuthenticationService,
      public eventService: EventService, public dataCache: DataCacheService, public firestoreService: FirestoreService, public deviceService: DeviceService, public scheduleService: ScheduleService) { 
      this.init();

      setInterval(() => {
        this.cycleOnce();
      }, 2000);

      this.eventService.setViewReq.subscribe(view => {
        this.setView(view);
      })

      this.eventService.closeNavbar.subscribe(resp => {
        this.closeNavbar();
      })
      
      this.eventService.showAlertReq.subscribe(body => {
        this.showAlert(body.message, body.action);
      })

      this.eventService.showDialogReq.subscribe(body => {
        this.showDialog(body);
      })

      this.eventService.closeDialogReq.subscribe(body => {
        this.closeDialog();
      })

      this.eventService.closeOverlayReq.subscribe(resp => {
        this.hideOverlay();
      })

      this.eventService.userLoggedIn.subscribe(resp => {
        this.jumpHome();
        if (this.authenticationService.user) {
          let preferences = this.authenticationService.user.preferences;
          if (preferences) {
            let theme = preferences.theme;
            if (theme) {
              this.setTheme(theme, false);
            }
          }
        }
      })

      let temp = this;
      // Use below events to check if caps lock is on
      window.addEventListener("keyup", function(event) {
        try {
          temp.capsLockEnabled = event.getModifierState("CapsLock");
        } catch (e) {

        }
      });
      window.addEventListener("keydown", function(event) {
        try {
          temp.capsLockEnabled = event.getModifierState("CapsLock");
        } catch (e) {

        }
      });
      window.addEventListener("click", function(event) {
        try {
          temp.capsLockEnabled = event.getModifierState("CapsLock");
        } catch (e) {

        }
      });
    }
    
    desiredRoute: String = '';
    /** Current view object (Generally a navbarItem or childNavItem)*/
    view: any = null;
    /** Theme variable. Matches css attribute which selects proper colors for css variable */
    theme: string = Constants.THEME_DEFAULT;
    /** Variable that is only true for first time through the init mehtod */
    firstLaunch: boolean = true;
    /** Variable that describes currently active screen size (note mateches css value) uses Constants.SCREEN_SIZE_X */
    screenSize: string = Constants.SCREEN_SIZE_LARGE;
    /** Variable denoting if the navbar is visible (mainly for medium or small screen views)*/
    showingNavbar: boolean = false;
    /** JSON object of current query parameters */
    queryParams = Utils.getAllQueryParameters();
    /** Boolean denoting whether the current device is a phone/tablet or not */
    isMobile: boolean = false;
    /** Current active perspective component  */
    perspective: PerspectiveComponent | null = null; 
    /** Variable simply denoting if caps lock is active */
    capsLockEnabled: boolean = false;
    /** Date representing current time (should be within 2 seconds) */
    currentTime = new Date();

    popup: string | null = null;

    overlayShowing = false;

    rightPanel: string | null = null;

    navbarItems: any[] = [
      {
        name: 'Home',
        view: Constants.ROUTE_HOME,
        navItems: [],
        showInNav: false,
        showOnHome: false,
        icon: 'home'
      },
      {
        name: 'Account',
        view: Constants.ROUTE_ACCOUNT,
        navItems: [],
        showInNav: true,
        showOnHome: false,
        icon: 'person'
      },
      {
        name: 'Messages',
        view: Constants.ROUTE_MESSAGES,
        navItems: [],
        showInNav: false,
        showOnHome: true,
        icon: 'notifications'
      },
      // {
      //   name: 'Favorites',
      //   view: Constants.ROUTE_FAVORITES,
      //   navItems: [],
      //   showInNav: false,
      //   showOnHome: true,
      //   icon: 'favorite_border'
      // },
      {
        name: 'Devices',
        view: Constants.ROUTE_DEVICES,
        navItems: [],
        showInNav: false,
        showOnHome: false,
        icon: 'storage'
      },
      {
        name: 'Device Settings',
        view: Constants.ROUTE_DEVICE_SETTINGS,
        navItems: [],
        showInNav: false,
        showOnHome: false,
        icon: 'settings'
      },
      {
        name: 'Schedules',
        view: Constants.ROUTE_SCHEDULE,
        navItems: [],
        showInNav: false,
        showOnHome: true,
        icon: 'schedule'
      },
      {
        name: 'History',
        view: Constants.ROUTE_HISTORY,
        navItems: [],
        showInNav: false,
        showOnHome: true,
        icon: 'timeline'
      },
      {
        name: 'Register Device',
        view: Constants.ROUTE_ADD_DEVICE,
        navItems: [],
        showInNav: true,
        showOnHome: false,
        icon: 'add'
      },
      {
        name: 'Help',
        view: Constants.ROUTE_HELP,
        navItems: [],
        showInNav: true,
        showOnHome: false,
        icon: 'help_outline'
      }
    ]
    
    /** Method used to initialize the navigation service */
    init() {
      let homeView = 'home';
      let desiredView = this.queryParams.selectedView;
      // this.queryParams.selectedView = null;
      if (desiredView) {
        this.desiredRoute = desiredView;
      } else {
        if (this.desiredRoute) {
          desiredView = this.desiredRoute;
        }
      }

      let obj = null;
      let homeBackup = null;

      this.navbarItems.forEach(function(item: any) {
        if (item.view == desiredView) {
          obj = item;
        } else {
          item.navItems.forEach(function(navItem: any) {
            if (navItem.view == desiredView) {
              obj = navItem;
            }
          })
        }
        if (item.view == homeView) {
          homeBackup = item;
        } else {
          item.navItems.forEach(function(navItem: any) {
            if (navItem.view == homeView) {
              homeBackup = navItem;
            }
          })
        }
      })
      
      if (desiredView && obj) {
        this.setView(obj);
      } else if (homeBackup) {
        this.setView(homeBackup);
      }
      
      this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      if (this.firstLaunch) {
        this.firstLaunch = false;

        if (this.screenSize != Constants.SCREEN_SIZE_LARGE) {
          this.closeNavbar();
        }
      }
    }

    selectDevice(device: Device | null) {
      if (device) { 
        this.deviceService.selectDevice(device);
      } else {
        this.deviceService.unselectDevice();
      }
    }

    showDialog(body: any) {
      this.dialog.open(DialogComponent, {
        data: body
      });
    }

    closeDialog() {
      this.dialog.closeAll();
    }

    showAlert(message: string, act: string | null | undefined) {
      let action : string | undefined;
      if (act) {
        action = act;
      }
      this.snackBar.open(message, action, {duration: 3000});
    }

    showPopup(s: string) {
      this.popup = s;
      this.overlayShowing = true;
    }

    closePopup() {
      this.overlayShowing = false;
      this.popup = null;
    }

    /** Method used to set view/perspective of UI. (Expects a navbarItem like object)
     * This method checks to see if a minimum acccess level is required and responds accordingly
     * 
     * @param view navbarItem like object (JSON) that can be used to set view
     * @returns boolean of whether it successfully set view
     *  */
    setView(view: any): boolean {
      if (!view) {
        return false;
      }


      if (!this.checkIfCanNavigateAway(view, true)) {
        return false;
      }

      if (view.view) {
        if (view.minAccessLevel && this.authenticationService.initialized) {
          
        }
        this.queryParams.selectedView = view.view;
        this.router.navigate([view.view], {relativeTo: this.route, queryParams: this.queryParams});
        this.view = view;
        this.eventService.newPerspectiveSelectedNoti.emit(null);
        this.queryParams = {};
        this.closeNavbar();
      } else if (view.navItems && view.navItems.length == 1) {
        return this.setView(view.navItems[0]);
      }
      
      return true;
    }

    toggleNavbar() {
      if (this.showingNavbar) {
        this.closeNavbar();
      } else {
        this.openNavbar();
      }
    }

    challengeLogout() {
      this.showDialog({
        header: 'Logout?',
        content: 'Are you sure you want to logout?',
        buttons: [new Button('Yes', null, this.eventService.logoutUserReq, 'warn')]
      })
    }

    getNavItemByName(name: string): any | null {
      let rVal = null;

      this.navbarItems.forEach(function(item: any) {
        if (item.name == name) {
          rVal = item;
        } else {
          item.navItems.forEach(function(navItem: any) {
            if (navItem.name == name) {
              rVal = navItem;
            }
          })
        }
      })

      return rVal;
    }

    getNavItemByView(view: string): any | null {
      let rVal: any = null;
      
      this.navbarItems.forEach(function(item: any) {
        if (item.view == view) {
          rVal = item;
        } else {
          item.navItems.forEach(function(navItem: any) {
            if (navItem.view == view) {
              rVal = navItem;
            }
          })
        }
      })
      return rVal;
    }

    /**
     * 
     * Asks currently active perspective if it has any reason it WON'T allow the user to navigate away...
     * .. Thus allowing the perspective to handle that before moving the user away
     * 
     * @param desiredNavItem 
     * @param isView 
     * @returns true if the current perspective has no reason to keep user from navigating away
     */
    checkIfCanNavigateAway(desiredNavItem: any, isView: boolean): boolean {
      if (this.perspective != null) {
        return this.perspective.beforeAway(desiredNavItem, isView);
      } else {
        return true;
      }
    }

    /** Method used to close navbar
     * If overlay has no other reason to be open... it will be closed
     */
    closeNavbar() {
        this.showingNavbar = false;
    }

    openNavbar() {
        this.showingNavbar = true;
    }

    setRightPanel(panel: string | null) {
      this.rightPanel = panel;
    }

    /** Method used to redirect user AWAY from UI... should NOT be used for inner UI travel */
    jumpToRedirect(redirect: string) {
      window.location.href = redirect;
    }

    jumpHome() {
      this.setView(this.getNavItemByView(Constants.ROUTE_HOME));
    }

    selectSchedule(schedule: Schedule | null) {
      if (this.view.view == Constants.ROUTE_SCHEDULE) {
        if (schedule) {
          this.scheduleService.selectSchedule(schedule); 
        } else {
          let newSchedule = new Schedule(null);
          newSchedule.deviceID = this.deviceService.selectedDevice!.serialNo;
          this.scheduleService.selectSchedule(newSchedule);
        }
        this.showOverlay();
      } else {
        this.setView(this.getNavItemByView(Constants.ROUTE_SCHEDULE))
      }
    }

    /**
     * Method used to set active theme of UI
     * 
     * @param theme string theme to set (matches css variable... see resources/theme.css)
     */
    setTheme(theme: string, publish: boolean = true) {
      document.documentElement.setAttribute("theme", theme);
      this.theme = theme;
      if (publish) {
        if (this.authenticationService.user) {
          if (!this.authenticationService.user.preferences) {
            this.authenticationService.user.preferences = {};
          }
          this.authenticationService.user.preferences.theme = theme;
          this.authenticationService.setUser(this.authenticationService.user);
        }
      }
    }

    showOverlay() {
      this.overlayShowing = true;
    }

    hideOverlay() {
      setTimeout(() => {
        this.scheduleService.selectSchedule(null);
        this.popup = null;
      },500);
      this.overlayShowing = false;
    }

    /** Cycle once called every 2 seconds just to keep the time up to date */
    cycleOnce() {
      this.currentTime = new Date();

      // this.showingNavbar = !this.showingNavbar;
    }

    getSalutation(): string {
      let rVal = '';
      let hours = this.currentTime.getHours();
      if (hours < 12) {
        rVal = 'Good Morning'
      } else if (hours < 17) {
        rVal = 'Good Afternoon';
      } else {
        rVal = 'Good Evening';
      }
      return rVal;
    }

    /** Simple method to force a true browser refresh */
    refresh() {
      window.location.reload();
    }
}
