import { Component, OnInit } from "@angular/core";
import { Measurement } from "../model/measurement";
import { MeasurementsService } from "../service/measurements.service";
import { getCurrentDate } from "../utils/utils";
import { Observable } from "rxjs";
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';


@Component({
  selector: "app-measurements",
  templateUrl: "./measurements.component.html",
  styleUrls: ["./measurements.component.css"]
})

export class MeasurementsComponent implements OnInit {
  title = 'Waist';
  //measurementList$: Observable<Measurement[]>;
  measurementList: Measurement[];
  inputIsNumber: boolean = false;
  editTextbox: boolean = true;

  constructor(
    private measurementsService: MeasurementsService, 
    private userService: UserService,
    private router: Router) {}

  //retrieve data from Firebase when the component starts
  ngOnInit() {
    this.measurementsService.get().subscribe(list => {
      //CALLBACK, asyncron
      this.measurementList = list.map(item => {
        return {
          key: item.key,
          ...item.payload.val()
        };
      });
      console.log("Measurements list: ", this.measurementList);

      //NORMAL, syncron
    })
  }

  addMeasurement(waist: number, chest: number, bicep: number, weight: number): void {
    //make sure is number (this is here because of enter action)
    if (!this.inputIsNumber) {
      return;
    }

    // check if we have a waist today
    if (this.isTodayAlreadyMeasured()) {
      alert("You already set a measurement for today!");
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

  deleteMeasurement(key: string) {
    if (confirm("Are you sure you want to delete this record?")) {
      this.measurementsService.delete(key);
    }
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
    var day = date.split(",")[0];
    if (day === "Saturday" || day === "Sunday") {
      return true;
    }

    return false;
  }

  isTodayAlreadyMeasured(): boolean {
    if (this.measurementList.length === 0) {
      return false;
    }

    let measurementLength = this.measurementList.length;
    if (this.measurementList[measurementLength - 1].date === getCurrentDate()) {
      console.log("Current date already measured: ",this.measurementList[measurementLength - 1].date);
      return true;
    }
    return false;
  }

  logout() {
    this.userService.logout().then(res => {
      console.log("User info:", res);
    });
    this.router.navigate(['']);
  }
}
