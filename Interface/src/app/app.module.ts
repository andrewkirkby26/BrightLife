import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './components/components/app/app.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRippleModule} from '@angular/material/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
// import {MatStepperHarness} from '@angular/material/stepper/testing';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import { DataCacheService } from './services/dataHolderService';
import { AuthenticationService } from './services/authentication.service';
import { Utils } from './utils/utils';
import { EventService } from './services/event.service';
import { HomePageComponent } from './components/pages/home/home.component';
import { CommonComponent } from './components/components/common/common.component';
import { PerspectiveComponent } from './components/pages/perspective/perspective.component';
import { FirestoreService } from './firebase/firestore.service';
import { FunctionsService } from './firebase/functions.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FirebaseService } from './firebase/firebase.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginWrapperComponent } from './components/components/loginWrapper/loginWrapper.component';
import { NavbarComponent } from './components/components/navbar/navbar.component';
import { GroupedDevicesComponent } from './components/components/groupedDevices/groupedDevices.component';
import { DeviceService } from './services/device.service';
import { AccountPageComponent } from './components/pages/account/account.component';
import { DialogComponent } from './components/components/dialog/dialog.component';
import { DevicePageComponent } from './components/pages/device/device.component';
import { DeviceTileComponent } from './components/components/device/device.component';
import { DevicesPageComponent } from './components/pages/devices/devices.component';
import { DeviceListComponent } from './components/components/deviceList/deviceList.component';
import { FavoritesPageComponent } from './components/pages/favorites/favorites.component';
import { HelpPageComponent } from './components/pages/help/help.component';
import { SchedulePageComponent } from './components/pages/schedule/schedule.component';
import { MessagesPageComponent } from './components/pages/messages/messages.component';
import { HistoryPageComponent } from './components/pages/history/history.component';
import { AddDevicePageComponent } from './components/pages/addDevice/addDevice.component';
import { MessageService } from './services/message.service';
import { PetService } from './services/pet.service';
import { GroupService } from './services/group.service';
import { ScheduleService } from './services/schedule.service';
import { MessageListComponent } from './components/components/messagelist/messagelist.component';
import { MessageComponent } from './components/components/message/message.component';
import { ScheduleListComponent } from './components/components/scheduleList/scheduleList.component';
import { ScheduleComponent } from './components/components/schedule/schedule.component';
import { AddDecimalsPipe } from './pipes/addDecimals.pipe';
import { AllUppercasePipe } from './pipes/allUppercase.pipe copy';
import { BooleanToYesOrNoPipe } from './pipes/booleanToYesOrNo.pipe';
import { CamelCaseSpacePipe } from './pipes/camelCaseSpace.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { CheckForEmptyPipe } from './pipes/checkForEmpty.pipe';
import { CommasToNumberPipe } from './pipes/commasToNumber.pipe';
import { RemoveNullsFromArrayPipe } from './pipes/removeNullsFromArray.pipe';
import { RemoveNumbersFromStringPipe } from './pipes/removeNumbersFromString.pipe';
import { ReversePipe } from './pipes/reverse.pipe';
import { SecondsToHourMinSecondsPipe } from './pipes/secondsToHourMinSeconds';
import { SortJsonListByPipe } from './pipes/sortJsonListBy.pipe';
import { ToZeroPipe } from './pipes/toZero.pipe';
import { TrimPipe } from './pipes/trim.pipe';
import { UnichToDayTimePipe } from './pipes/unichToDayTime.pipe';
import { UnichToDayeAndTimePipe } from './pipes/unichToDayAndTime.pipe';
import { UnichToExactTimeAndDatePipe } from './pipes/unichToExactTimeAndDate.pipe';
import { UnichToFullDatePipe } from './pipes/unichToFullDate.pipe';
import { UnichToTimePipe } from './pipes/unichToTime.pipe';
import { PopupComponent } from './components/components/popup/popup.component';
import { RightPanelComponent } from './components/components/rightPanel/rightPanel.component';
import { EventsService } from './services/events.service';
import { EventComponent } from './components/components/event/event.component';
import { EventListComponent } from './components/components/eventList/eventList.component';
import { DeviceSettingsPageComponent } from './components/pages/deviceSettings/deviceSettings.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountPageComponent,
    HomePageComponent,
    AddDevicePageComponent,
    MessageListComponent,
    MessageComponent,
    ScheduleListComponent,
    ScheduleComponent,
    CommonComponent,
    HistoryPageComponent,
    PopupComponent,
    SchedulePageComponent,
    MessagesPageComponent,
    PerspectiveComponent,
    DeviceSettingsPageComponent,
    DialogComponent,
    HelpPageComponent,
    RightPanelComponent,
    FavoritesPageComponent,
    DevicePageComponent,
    DeviceListComponent,
    DevicesPageComponent,
    DeviceTileComponent,
    GroupedDevicesComponent,
    NavbarComponent,
    LoginWrapperComponent,

    AddDecimalsPipe,
    AllUppercasePipe,
    BooleanToYesOrNoPipe,
    CamelCaseSpacePipe,
    CapitalizePipe,
    CheckForEmptyPipe,
    CommasToNumberPipe,
    RemoveNullsFromArrayPipe,
    RemoveNumbersFromStringPipe,
    ReversePipe,
    EventComponent,
    EventListComponent,
    SecondsToHourMinSecondsPipe,
    SortJsonListByPipe,
    ToZeroPipe,
    TrimPipe,
    UnichToDayTimePipe,
    UnichToDayeAndTimePipe,
    UnichToExactTimeAndDatePipe,
    UnichToFullDatePipe,
    UnichToTimePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    // Material Components
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    // MatStepperHarness,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule
  ],
  providers: [
    DataCacheService,
    AuthenticationService,
    Utils,
    FirestoreService,
    MessageService,
    PetService,
    FirebaseService,
    EventService,
    DeviceService,
    ScheduleService,
    GroupService,
    FunctionsService,
    EventsService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
