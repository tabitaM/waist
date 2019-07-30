import { Injectable } from "@angular/core";
import { Measurement } from "../model/measurement";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from "angularfire2/database";
import { getCurrentDate } from "../utils/utils";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})

export class MeasurementsService {
  firebaseMeasurements: AngularFireList<any>;
  measureSelected: AngularFireObject<Measurement> = null;
  private basePath: string = '/measurements';

  constructor(private firebase: AngularFireDatabase) {}

  get() {
    this.firebaseMeasurements = this.firebase.list("/measurements");
    return this.firebaseMeasurements.snapshotChanges();
  }

  add(measurement: Measurement) {
    this.firebaseMeasurements.push({
      waist: measurement.waist,
      date: getCurrentDate()
    });
  }

  update(measurement: Measurement) {
    this.firebaseMeasurements.update(measurement.key, {
      waist: +measurement.waist
    });
  }

  delete(key: string) {
    this.firebaseMeasurements.remove(key);
  }

  getMeasure(measurement: Measurement): AngularFireObject<Measurement> {
    const measurePath = `${this.basePath}/${measurement.key};`
    this.measureSelected =  this.firebase.object(measurePath);
    return this.measureSelected;
  }
}
