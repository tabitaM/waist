import { Component, OnInit, Input } from '@angular/core';
import { Measurement } from '../model/measurement';
import { ActivatedRoute } from '@angular/router';
import { MeasurementsService } from '../service/measurements.service';
import { AngularFireList } from "angularfire2/database";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Input() measure;
  public key: string;
  //public id: number;
  measurement: Measurement = {waist: null, date: null, key: null};
  firebaseMeasurements: AngularFireList<any>;
  measurementList: Measurement[];
  public measureId="";

  constructor(
    private route: ActivatedRoute,
    private measurementsService: MeasurementsService) { 
  }

  ngOnInit(): void {
  //   this.measurementsService.getMeasure(this.key).valueChanges().subscribe(measurementFromFirebase => {
  //   this.measurement = measurementFromFirebase
  // });
  //   console.log("Measure with id "+this.key+" is ",this.measurement);
  //   console.log(this.measure);

  // this.measurementsService.get().subscribe(list => {
  //   // CALLBACK, asyncron
  //   this.measurementList = list.map(item => {
  //     return {
  //       key: item.key,
  //       ...item.payload.val() //payload contains all the info about objects, but not the key from FB
  //     };
  //   });
  // });

  // this.route.paramMap.subscribe(params => {
  //   this.measurement = this.measurementList[+params.get('id')];
  // })

  //check if id is taken ok from the route
  let id = this.route.snapshot.paramMap.get('id');  
    this.measureId = id; 
    console.log(id);
    
    console.log("Record with id "+id+ " is: ",this.measurementsService.getMeasure(this.measurement).valueChanges().subscribe(item => {
      console.log(item);
    }));
 }
}



