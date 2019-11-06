import { Component, OnInit, OnDestroy } from '@angular/core';
import { Measurement } from '../model/measurement';
import { MeasurementsService } from '../service/measurements.service';
import { getCurrentDate } from '../utils/utils';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SnackbarService } from '../service/snackbar.service';

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.css']
})
export class MeasurementsComponent implements OnInit, OnDestroy {
  title = 'your measurements.';
  measurementList: Measurement[];
  inputIsNumber = false;
  editTextbox = true;
  private userSubscription: Subscription;

  constructor(
    private measurementsService: MeasurementsService,
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  // retrieve data from Firebase when the component starts
  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.measurementsService.get(user.uid).subscribe(list => {
        this.measurementList = list
          .map(item => {
            return {
              key: item.key,
              ...item.payload.val()
            };
          })
          .reverse();
        console.log(
          `User: ${user.displayName} with Id: ${user.uid} has measurements list: `,
          this.measurementList
        );
      });
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  addMeasurement(
    waist: number,
    chest: number,
    bicep: number,
    weight: number
  ): void {
    // make sure is number (this is here because of enter action)
    if (!this.inputIsNumber) {
      return;
    }

    // check if we have a waist today
    if (this.isTodayAlreadyMeasured()) {
      this.snackbarService.show('You already set a measurement for today!');
      return;
    }

    // add date with number
    const measurement: Measurement = {
      key: null,
      waist: +waist,
      chest: +chest,
      bicep: +bicep,
      weight: +weight,
      date: getCurrentDate()
    };
    this.measurementsService.add(measurement);
  }

  // // // // // VALIDATIONS // // // // //
  isNumber(key: string): boolean {
    if (!key) {
      this.inputIsNumber = false;
      return;
    }

    if (isNaN(+key)) {
      this.inputIsNumber = false;
      console.log(`${key} is not a number`);
      return;
    }

    this.inputIsNumber = true;
  }

  isWeekend(date: string): boolean {
    const day = date.split(',')[0];
    if (day === 'Saturday' || day === 'Sunday') {
      return true;
    }

    return false;
  }

  isTodayAlreadyMeasured(): boolean {
    if (this.measurementList.length === 0) {
      return false;
    }

    const measurementLength = this.measurementList.length;
    if (this.measurementList[0].date === getCurrentDate()) {
      console.log(
        'Current date already measured: ',
        this.measurementList[0].date
      );
      return true;
    }
    return false;
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
