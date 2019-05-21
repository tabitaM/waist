import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Measurement } from './measurement';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',  
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // measurements: Observable<Measurement[]>;

  // constructor(database: AngularFireDatabase) {
  //   database.list<Measurement>('/measurements').valueChanges().subscribe(measurements => {
  //     console.log(measurements);
  //   })
  // }
  title = 'Waist';
}
