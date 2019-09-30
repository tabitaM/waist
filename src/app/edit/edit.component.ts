import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Measurement } from '../model/measurement';
import { Router, ActivatedRoute } from '@angular/router';
import { MeasurementsService } from '../service/measurements.service';
import { Location } from '@angular/common';
import { AuthService } from '../service/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;
  private measurement: Measurement = {
    key: null,
    waist: null,
    date: null,
    chest: null,
    bicep: null,
    weight: null
  };

  constructor(
    private route: ActivatedRoute,
    private measurementsService: MeasurementsService,
    private router: Router,
    private location: Location,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.measurement.key = this.route.snapshot.paramMap.get('key');
      this.measurementsService
        .getMeasure(user.uid, this.measurement.key)
        .subscribe(item => {
          this.measurement = {
            ...this.measurement,
            waist: item.waist,
            chest: item.chest,
            bicep: item.bicep,
            weight: item.weight,
            date: item.date
          };
          console.log('Measure selected: ', this.measurement);
        });
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  updateMeasurement(measurement: Measurement) {
    this.measurementsService.update(measurement);
    alert('Measurement was successfully updated!');
    this.router.navigate(['measurements']);
  }

  back() {
    this.location.back();
  }
}
