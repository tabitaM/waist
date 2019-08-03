import { Component, OnInit, Input } from "@angular/core";
import { Measurement } from "../model/measurement";
import { Router, ActivatedRoute } from "@angular/router";
import { MeasurementsService } from "../service/measurements.service";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"]
})
export class EditComponent implements OnInit {
  @Input() measure: Measurement;
  measurement: Measurement = {key: null, waist: null, date: null};

  constructor(
    private route: ActivatedRoute,
    private measurementsService: MeasurementsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // firebase
    this.measurement.key = this.route.snapshot.paramMap.get('key');

    this.measurementsService.getMeasure(this.measurement.key).subscribe(item => {
      this.measurement = {...this.measurement, date: item.date, waist: item.waist};
      console.log(this.measurement);
    });
    
  }

  updateMeasurement(measurement: Measurement) {
    this.measurementsService.update(measurement);
    alert("Measurement was successfully updated!");
    this.router.navigate(['']);
  }

}
