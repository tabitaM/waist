import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { MeasurementsComponent } from './measurements/measurements.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {
  MatButtonModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSnackBarModule,
  MatCardModule,
  MatDialogModule
} from '@angular/material';
import { EditComponent } from './edit/edit.component';
import { MeasurementsService } from './service/measurements.service';
import { LoginComponent } from './users/login/login.component';
import { AuthService } from './service/auth.service';
import { SnackbarService } from './service/snackbar.service';
import { AuthGuard } from './utils/auth-guard/auth.guard';
import { RegisterComponent } from './users/register/register.component';
import { MeasurementDetailComponent } from './measurement-detail/measurement-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    MeasurementsComponent,
    EditComponent,
    LoginComponent,
    RegisterComponent,
    MeasurementDetailComponent
  ],
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
    MatSidenavModule,
    MatSnackBarModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      {
        path: 'measurements',
        component: MeasurementsComponent,
        canActivate: [AuthGuard]
      },
      { path: 'edit/:key', component: EditComponent, canActivate: [AuthGuard] }
    ])
  ],
  providers: [MeasurementsService, AuthService, AuthGuard, SnackbarService],
  bootstrap: [AppComponent],
  entryComponents: [RegisterComponent]
})
export class AppModule {}
