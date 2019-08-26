import { Component, OnInit, Input } from "@angular/core";
import { Measurement } from "../model/measurement";
import { Router, ActivatedRoute } from "@angular/router";
import { MeasurementsService } from "../service/measurements.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"]
})
export class EditComponent implements OnInit {
  @Input() measure: Measurement;
  measurement: Measurement = {
    key: null,
    waist: null,
    date: null,
    chest: null,
    bicep: null,
    weight: null
  };

  constructor(
    private route: ActivatedRoute,
    private measurementsService: MeasurementsService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    // firebase
    this.measurement.key = this.route.snapshot.paramMap.get("key");

    this.measurementsService
      .getMeasure(this.measurement.key)
      .subscribe(item => {
        this.measurement = {
          ...this.measurement,
          waist: item.waist,
          chest: item.chest,
          bicep: item.bicep,
          weight: item.weight,
          date: item.date
        };
        console.log("Measure selected: ", this.measurement);
      });
  }

  updateMeasurement(measurement: Measurement) {
    this.measurementsService.update(measurement);
    alert("Measurement was successfully updated!");
    this.router.navigate([""]);
  }

  back() {
    this.location.back();
  }
}
