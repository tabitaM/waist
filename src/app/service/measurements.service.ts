import { Injectable } from "@angular/core";
import { Measurement } from "../model/measurement";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { getCurrentDate } from "../utils/utils";

@Injectable({
  providedIn: "root"
})
export class MeasurementsService {
  firebaseMeasurements: AngularFireList<any>;

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
      waist: measurement.waist
    });
  }

  delete(key: string) {
    this.firebaseMeasurements.remove(key);
  }
  
}
