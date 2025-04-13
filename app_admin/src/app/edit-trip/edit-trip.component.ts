import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';


function formatDateToYyyyMmDd(value: Date): string {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.css'
})
export class EditTripComponent implements OnInit {
  public editForm !: FormGroup;
  trip !: Trip;
  submitted = false;
  message : string = "";

  constructor(
    private formBuilder : FormBuilder,
    private router : Router,
    private tripDataService : TripDataService
  ) {}

  ngOnInit(): void {
    let tripCode = localStorage.getItem('tripCode');
    if(!tripCode)
    {
      alert("Something wrong, couldn't find where I stashed the tripCode!");
      this.router.navigate(['']);
      return;
    }

    console.log('EditTripComponent::ngOnInit');
    console.log('tripCode: ' + tripCode);

    this.editForm = this.formBuilder.group(
      {
      _id: [],
      code: [tripCode, Validators.required],
      name: ["", Validators.required],
      length: ["", Validators.required],
      start: ["", Validators.required],
      resort: ["", Validators.required],
      perPerson: ["", Validators.required],
      image: ["", Validators.required],
      description: ["", Validators.required],
      } 
    )

    this.tripDataService.getTrip(tripCode)
      .subscribe( {
        next:(value) => {
          if(!value)
          {
            this.message = "No Trip Retrieved!";
          } else {
            console.log('Value: ', value)
            this.trip = value[0];
            console.log('Trip var: ', this.trip);

            this.editForm.patchValue({...this.trip, start: formatDateToYyyyMmDd(new Date(this.trip.start))});

            this.message = 'Trip: ' + tripCode + ' retrieved.';
            
          }
          console.log(this.message);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      }
    )
  }

  public onSubmit() {
    this.submitted = true;

    console.log(this.editForm.value);

    if(this.editForm.valid)
    {
      this.tripDataService.updateTrip(this.editForm.value)
      .subscribe(
        {
          next:(value) => {
            this.router.navigate(['']);
          },
          error: (error:any) => {
            console.log('Error: ' + error);
          }
        }
      )
    }
  }

  get f() {
    return this.editForm.controls;
  }
}
