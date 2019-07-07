import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class MeasurementsService {
  constructor(private firebase: AngularFireDatabase) {}

  measurementsList: AngularFireList<any>;
  editTextbox: boolean = true;

  form = new FormGroup({
    $key: new FormControl(null),
    waist: new FormControl(),
    date: new FormControl(this.getCurrentDate())
  });

  getMeasurementsFromFB() {
    this.measurementsList = this.firebase.list("/measurements");
    return this.measurementsList.snapshotChanges();
  }

  insertMeasurementToFB(measure) {
    this.measurementsList.push({
      waist: measure.waist,
      date: this.getCurrentDate()
    });
  }

  getCurrentDate(): string {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    var currentDayName = weekday[d.getDay()];

    let date: string = currentDayName + ", " + dd + "/" + mm + "/" + yyyy;
    return date;
  }

  updateMeasurement(measurement) {
    this.measurementsList.update(measurement.$key, {
      waist: measurement.waist
      //date: this.getCurrentDate()
    });
  }

  deleteMeasurement($key: string) {
    this.measurementsList.remove($key);
  }
}
