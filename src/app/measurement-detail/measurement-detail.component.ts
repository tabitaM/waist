import { Component, Input } from '@angular/core';
import { Measurement } from '../model/measurement';
import { MeasurementsService } from '../service/measurements.service';

@Component({
  selector: 'app-measurement-detail',
  templateUrl: './measurement-detail.component.html',
  styleUrls: ['./measurement-detail.component.css']
})
export class MeasurementDetailComponent {
  @Input() measurement: Measurement;

  constructor(private measurementsService: MeasurementsService) {}

  deleteMeasurement(key: string) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.measurementsService.delete(key);
    }
  }
}
