import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PerspectiveComponent } from '../perspective/perspective.component';

@Component({
  selector: 'favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css', '../perspective/perspective.component.css']
})
export class FavoritesPageComponent extends PerspectiveComponent {

  override browserTabSuffix = 'Favorites'
  
}
