import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CommonComponent } from '../common/common.component';
import { FormBuilder } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fadeInOut', [ 
      transition(':enter', [
        style({ opacity: 0 }), 
        animate(600, style({opacity: 1}))
      ]) ,
      transition(':leave', [
        style({ opacity: 1 }), 
        animate(600, style({opacity: 0}))
      ]) 
    ])
  ]
})
export class AppComponent extends CommonComponent {
  title = 'Home';

}
