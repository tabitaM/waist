import { Injectable } from '@angular/core';
import { Measurement } from '../model/measurement';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from 'angularfire2/database';
import { getCurrentDate } from '../utils/utils';
import { AuthService } from './auth.service';

@Injectable()
export class MeasurementsService {
  firebaseMeasurements: AngularFireList<any>;
  measureSelected: AngularFireObject<Measurement> = null;
  measurementList: Measurement[];

  constructor(
    private fb: AngularFireDatabase,
    private authService: AuthService
  ) {}

  get(uid: string) {
    this.firebaseMeasurements = this.fb.list(uid);
    return this.firebaseMeasurements.snapshotChanges();
  }

  getMeasure(uid: string, key: string) {
    this.measureSelected = this.fb.object(`${uid}/${key}`);
    return this.measureSelected.valueChanges();
  }

  add(measurement: Measurement) {
    this.firebaseMeasurements.push({
      waist: measurement.waist,
      chest: measurement.chest,
      bicep: measurement.bicep,
      weight: measurement.weight,
      date: getCurrentDate()
    });
  }

  update(measurement: Measurement) {
    this.firebaseMeasurements.update(measurement.key, {
      waist: +measurement.waist,
      chest: +measurement.chest,
      bicep: +measurement.bicep,
      weight: +measurement.weight
    });
  }

  delete(key: string) {
    this.firebaseMeasurements.remove(key);
  }
}
