import { Component, OnInit } from "@angular/core";
import { Measurement } from "../measurement";

@Component({
  selector: "app-measurements",
  templateUrl: "./measurements.component.html",
  styleUrls: ["./measurements.component.css"]
})
export class MeasurementsComponent {
  measurementList: Measurement[] = [];

  constructor() {
  }

  addMeasurement(measure: number): void {
    
    // validate is not empty
    if (!measure) {
      return;
    }

    // validate is a number
    // TODO

    // add date with number
    // TODO

    this.measurementList.push({ waist: measure });
    console.log(this.measurementList);
  }

  getDate(): string {
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
    var n = weekday[d.getDay()];

    let date : string = n + "," + dd + "/" + mm + "/" + yyyy;
    console.log(date);
    return date;
  }
}
