import { Injectable } from "@angular/core";
import { Measurement } from "../model/measurement";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from "angularfire2/database";
import { getCurrentDate } from "../utils/utils";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MeasurementsService {
  firebaseMeasurements: AngularFireList<any>;
  measureSelected: AngularFireObject<Measurement> = null;
  private basePath: string = "/measurements";
  measurementList: Measurement[];

  constructor(private firebase: AngularFireDatabase) {}

  get() {
    this.firebaseMeasurements = this.firebase.list("/measurements");
    return this.firebaseMeasurements.snapshotChanges();
  }

  getMeasure(key: string) {
    this.measureSelected = this.firebase.object(`/measurements/${key}`);
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
