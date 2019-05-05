import { Component, OnInit } from "@angular/core";
import { Measurement } from "../measurement";
import { AngularWaitBarrier } from "blocking-proxy/built/lib/angular_wait_barrier";
import { isNumber } from "util";
import { getLocaleDateFormat } from "@angular/common";

@Component({
  selector: "app-measurements",
  templateUrl: "./measurements.component.html",
  styleUrls: ["./measurements.component.css"]
})
export class MeasurementsComponent {
  model = {
    left: true,
    middle: false,
    right: false
  };
  measurementList: Measurement[] = [];
  inputIsNumber: boolean = false;
  isWeekend: boolean = false;
  isSameDay: boolean = false;

  constructor() {}

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

  addMeasurement(measure: number): void {
    //check if it's the same day
    // if((this.measurementList).length) {
    //   this.checkCurrentDay(this.getDate());
    // }
    // validate is not empty
    if (!measure) {
      console.log("inputul e gol");
      return;
    }

    // validate is a number
    if (isNaN(measure)) {
      console.log(`${measure} is not a number`);
    }

    // add date with number
    if(!this.isSameDay) {
    this.measurementList.push({ waist: measure, currentDay: this.getDate() });
    }
    console.log("Measurement list updated: ", this.measurementList);
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

    let date: string = n + ", " + dd + "/" + mm + "/" + yyyy;
    
    weekday.forEach(day => {
      if(day === "Saturday" || day === "Sunday") {
        this.isWeekend = true;
      }
    });
    return date;
  }

  checkCurrentDay(day: string) :void {
    let lastDay = (this.measurementList).length;
    if(this.measurementList[lastDay - 1].currentDay === day) {
      console.log(this.measurementList[lastDay - 1].currentDay);
      this.isSameDay = true;
      alert("You already set a measurement for today!");
      return;
    }
  }
}
