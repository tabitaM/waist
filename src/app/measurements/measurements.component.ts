import { Component, OnInit } from "@angular/core";
import { Measurement } from "../measurement";
import { MeasurementsService } from "../measurements.service";

@Component({
  selector: "app-measurements",
  templateUrl: "./measurements.component.html",
  styleUrls: ["./measurements.component.css"]
})
export class MeasurementsComponent implements OnInit {
  measurementList: Measurement[] = [];
  inputIsNumber: boolean = false;
  measurementsArray = [];
  editTextbox: boolean = true;

  constructor(private measurementsService: MeasurementsService) {}

  //retrieve data from Firebase when the component started
  ngOnInit() {
    this.measurementsService.getMeasurementsFromFB().subscribe(list => {
      this.measurementsArray = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val() //payload contains all the info about objects, but not the key from FB
        };
      });
    });
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

  addMeasurement(waist: number): void {
    // make sure is number (this is here because of enter action)
    if (!this.inputIsNumber) {
      return;
    }

    // check if we have a waist today
    if (this.todayAlreadyMeasured()) {
      alert("You already set a measurement for today!");
      return;
    }

    // add date with number
    // TODO: investigate why we need to use parseInt() ??
    const measurement = {
      waist: parseInt(waist.toString()),
      date: this.getCurrentDate()
    };
    if (this.measurementsService.form.get("$key").value == null) {
      this.measurementsService.insertMeasurementToFB(measurement);
    } else {
      this.measurementsService.updateMeasurement(
        this.measurementsService.form.value
      );
    }
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

  isWeekend(date: string): boolean {
    var day = date.split(",")[0];
    if (day === "Saturday" || day === "Sunday") {
      return true;
    }

    return false;
  }

  todayAlreadyMeasured(): boolean {
    if (this.measurementsArray.length === 0) {
      return false;
    }

    let measurementLength = this.measurementsArray.length;
    if (
      this.measurementsArray[measurementLength - 1].date ===
      this.getCurrentDate()
    ) {
      console.log(this.measurementsArray[measurementLength - 1].date);
      return true;
    }
    return false;
  }

  onDelete($key) {
    if (confirm("Are you sure you want to delete this record?")) {
      this.measurementsService.deleteMeasurement($key);
    }
  }

  toogleInput() {
    this.editTextbox = !this.editTextbox;
  }
}
