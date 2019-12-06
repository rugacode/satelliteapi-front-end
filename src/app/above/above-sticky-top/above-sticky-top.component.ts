import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FormBuilder } from '@angular/forms';

import { Validators } from '@angular/forms';

@Component({
  selector: 'app-above-sticky-top',
  templateUrl: './above-sticky-top.component.html',
  styleUrls: ['./above-sticky-top.component.css']
})

export class AboveStickyTopComponent implements OnInit {
  categories = [
    {
      id: '18',
      catgory: 'Amateur radio'
    },
    {
      id: '35',
      catgory: 'Beidou Navigation System'
    },
    {
      id: '1',
      catgory: 'Brightest'
    },
    {
      id: '45',
      catgory: 'Celestis'
    },
    {
      id: '32',
      catgory: 'CubeSats'
    },
    {
      id: '8',
      catgory: 'Disaster monitoring'
    },
    {
      id: '6',
      catgory: 'Earth resources'
    },
    {
      id: '29',
      catgory: 'Education'
    },
    {
      id: '28',
      catgory: 'Engineering'
    },
    {
      id: '19',
      catgory: 'Experimental'
    },
    {
      id: '48',
      catgory: 'Flock'
    },
    {
      id: '22',
      catgory: 'Galileo'
    },
    {
      id: '27',
      catgory: 'Geodetic'
    },
    {
      id: '10',
      catgory: 'Geostationary'
    },
    {
      id: '50',
      catgory: 'Global Positioning System (GPS) Constellation'
    },
    {
      id: '20',
      catgory: 'Global Positioning System (GPS) Operational'
    },
    {
      id: '17',
      catgory: 'Globalstar'
    },
    {
      id: '51',
      catgory: 'Glonass Constellation'
    },
    {
      id: '21',
      catgory: 'Glonass Operational'
    },
    {
      id: '5',
      catgory: 'GOES'
    },
    {
      id: '40',
      catgory: 'Gonets'
    },
    {
      id: '12',
      catgory: 'Gorizont'
    },
    {
      id: '11',
      catgory: 'Intelsat'
    },
    {
      id: '15',
      catgory: 'Iridium'
    },
    {
      id: '46',
      catgory: 'IRNSS'
    }
  ];
  
  aboveForm = this.formBuilder.group({
    observer_lat: ['', Validators.required],
    observer_lng: ['', Validators.required],
    observer_alt: ['', Validators.required],
    search_radius: ['', Validators.required],
    category_id: ['0', Validators.required]
  });
  
  @Input()
  sendRequestParams: object;
  
  @Output()
  fetch = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.aboveForm.setValue(this.sendRequestParams);
  }

  fetchSatellites() {
    this.fetch.emit(this.aboveForm.value);
  }
}