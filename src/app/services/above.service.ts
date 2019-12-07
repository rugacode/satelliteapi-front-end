import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, empty } from 'rxjs';
import { map, catchError, toArray, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AboveService {

  observer_lat: number = 36.105700;
  observer_lng: number = -112.094800;
  observer_alt: number = 0;
  search_radius: number = 90;
  category_id: number = 0;
  apiKey: string = 'R2CQLF-FTC39A-HFHR2W-33JE';
  request: string;
  headers = new HttpHeaders();
  params = new HttpParams().set('apiKey', this.apiKey);
  
  constructor(
    private httpClient: HttpClient
  ) {
    this.setRequest();
  }

  setRequestParams(requestParams) {
    this.observer_lat = requestParams.observer_lat;
    this.observer_lng = requestParams.observer_lng;
    this.observer_alt = requestParams.observer_alt;
    this.search_radius = requestParams.search_radius;
    this.category_id = requestParams.category_id;
    this.setRequest();
  }

  getRequestParams() {
    return {
      observer_lat: this.observer_lat,
      observer_lng: this.observer_lng,
      observer_alt: this.observer_alt,
      search_radius: this.search_radius,
      category_id: this.category_id
    };
  }

  setRequest() {
    this.request = `https://www.n2yo.com/rest/v1/satellite/above/${this.observer_lat}/${this.observer_lng}/${this.observer_alt}/${this.search_radius}/${this.category_id}`;
  }

  getAbove(): Observable<any[]> {
    return this
    .httpClient
    .get(this.request,
      {
        headers: this.headers,
        params: this.params
      }
    )
    .pipe(
      map(response => {
        return response['above'];
      }),
      shareReplay(),
      catchError(error => {
        return empty();
      })
    );
  }
  
  sorting(satellites$: Observable<any[]>, tableHeaderData: object, orderBy: string) {
    return satellites$
    .pipe(
      map(satellite => {
        return satellite.sort((a, b) => {
          if(tableHeaderData['type'] === 'number')
            return this.sortingNumber(tableHeaderData['attribute'], orderBy, a, b);
          if(tableHeaderData['type'] === 'string')
            return this.sortingStringDate(tableHeaderData['attribute'], orderBy, a, b);
          if(tableHeaderData['type'] === 'stringDate')
            return this.sortingStringDate(tableHeaderData['attribute'], orderBy, a, b);
        });
      })
    );
  }

  sortingNumber(column, orderBy, a, b) {
    if(orderBy === 'asc')
      return a[column] - b[column];
    return b[column] - a[column];
  }
  
  sortingString(column, orderBy, a, b) {
    if(orderBy === 'asc') {
      if(a[column] < b[column]) {
        return -1;
      }
      
      if(a[column] > b[column]) {
        return 1;
      }
      
      return 0;
    }

    if(a[column] > b[column]) {
      return -1;
    }
    
    if(a[column] < b[column]) {
      return 1;
    }
    
    return 0;
  }
  
  sortingStringDate(column, orderBy, a, b) {
    a = a[column].split('-').join('');
    b = b[column].split('-').join('');
    
    if(orderBy === 'asc')
      return a.localeCompare(b);
    return b.localeCompare(a);
  }
}