import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from "./app.component";
import { MeasurementsComponent } from "./measurements/measurements.component";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { environment } from "../environments/environment";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatCardModule
} from "@angular/material";
import { EditComponent } from "./edit/edit.component";
import { MeasurementsService } from "./service/measurements.service";

@NgModule({
  declarations: [AppComponent, MeasurementsComponent, EditComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    NgbModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: "", component: MeasurementsComponent },
      { path: "edit/:key", component: EditComponent }
    ])
  ],
  providers: [MeasurementsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
