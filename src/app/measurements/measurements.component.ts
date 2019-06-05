import { Component, OnInit } from "@angular/core";
import { Measurement } from "../measurement";
import { AngularFireDatabase } from "angularfire2/database";

@Component({
  selector: "app-measurements",
  templateUrl: "./measurements.component.html",
  styleUrls: ["./measurements.component.css"]
})
export class MeasurementsComponent {
  measurementList: Measurement[] = [];
  inputIsNumber: boolean = false;

  // initialize withfirebase
  constructor(database: AngularFireDatabase) {
    database.list<Measurement>('/measurements').valueChanges().subscribe(measurementsFB => {
      console.log("Values from firebase: ",measurementsFB);
      this.measurementList.push(...measurementsFB)
    })
  }

  onKeyPress(key: string) {
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

  removeTodayMeasurement(): void{
    // TODO implement
  }

  addMeasurement(measure: number): void {
    // check if we have a measure today
    if(this.todayAlreadyMeasured()) {
      alert("You already set a measurement for today!");
      return;
    }

    // validate if it's a number
    if (isNaN(measure)) {
      console.log(`${measure} is not a number`);
    }

    // add date with number
    this.measurementList.push({ waist: measure, date: this.getCurrentDate() });

    // TODO add to firebase !!

    console.log("Measurement list updated: ", this.measurementList);
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

  isWeekend(date :string): boolean {
    var day = date.split(',')[0]
    if(day === "Saturday" || day === "Sunday"){
      return true;
    }

    return false;
  }

  todayAlreadyMeasured(): boolean {
    if (this.measurementList.length === 0) {
      return false;
    }

    let measurementLength = this.measurementList.length;
    if (
      this.measurementList[measurementLength - 1].date === this.getCurrentDate()
    ) {
      console.log(this.measurementList[measurementLength - 1].date);
      return true;
    }

    return false;
  }
}
