import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FormBuilder } from '@angular/forms';

import { Validators } from '@angular/forms';

import { Categories } from '../../data/json/categories';

@Component({
  selector: 'app-above-sticky-top',
  templateUrl: './above-sticky-top.component.html',
  styleUrls: ['./above-sticky-top.component.css']
})

export class AboveStickyTopComponent implements OnInit {
  categories: any = Categories;
  
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