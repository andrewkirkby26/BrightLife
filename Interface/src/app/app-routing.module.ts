import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountPageComponent } from './components/pages/account/account.component';
import { AddDevicePageComponent } from './components/pages/addDevice/addDevice.component';
import { DevicePageComponent } from './components/pages/device/device.component';
import { FavoritesPageComponent } from './components/pages/favorites/favorites.component';
import { HelpPageComponent } from './components/pages/help/help.component';
import { HistoryPageComponent } from './components/pages/history/history.component';
import { HomePageComponent } from './components/pages/home/home.component';
import { DevicesPageComponent } from './components/pages/devices/devices.component';
import { MessagesPageComponent } from './components/pages/messages/messages.component';
import { PerspectiveComponent } from './components/pages/perspective/perspective.component';
import { SchedulePageComponent } from './components/pages/schedule/schedule.component';
import { Constants } from './constants/constants';
import { DeviceSettingsPageComponent } from './components/pages/deviceSettings/deviceSettings.component';

const routes: Routes = [
  //Common
  {path: Constants.ROUTE_HOME, component: PerspectiveComponent},
  {path: Constants.ROUTE_FAVORITES, component: FavoritesPageComponent},
  {path: Constants.ROUTE_HELP, component: HelpPageComponent},
  {path: Constants.ROUTE_ACCOUNT, component: AccountPageComponent},
  {path: Constants.ROUTE_MESSAGES, component: MessagesPageComponent},
  {path: Constants.ROUTE_ADD_DEVICE, component: AddDevicePageComponent},
  {path: Constants.ROUTE_SCHEDULE, component: SchedulePageComponent},
  {path: Constants.ROUTE_DEVICE_SETTINGS, component: DeviceSettingsPageComponent},
  {path: Constants.ROUTE_HISTORY, component: HistoryPageComponent},
  // {path: Constants.ROUTE_DEVICES, component: DevicesPageComponent},

  //Required
  {path: '', redirectTo: '/' + Constants.ROUTE_HOME, pathMatch: 'full'},
  {path: '**',   redirectTo: '/' + Constants.ROUTE_HOME}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
