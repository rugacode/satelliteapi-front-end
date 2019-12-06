import { Component } from '@angular/core';

import { AboveService } from './services/above.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Satellite Info';

  satellites$;

  tableHeadersData = [
    {
      attribute: 'satid',
      headerName: 'Satellite ID',
      type: 'number'
    },
    {
      attribute: 'satname',
      headerName: 'Satellite Name',
      type: 'string'
    },
    {
      attribute: 'launchDate',
      headerName: 'Launch Date',
      type: 'stringDate'
    },
    {
      attribute: 'satlat',
      headerName: 'Latitude',
      type: 'number'
    },
    {
      attribute: 'satlng',
      headerName: 'Longitude',
      type: 'number'
    },
    {
      attribute: 'satalt',
      headerName: 'Altitude',
      type: 'number'
    }
  ];

  constructor(
    private titleService: Title,
    private aboveService: AboveService
  ) {}

  ngOnInit() {
    this.titleService.setTitle(this.title);

    this.satellites$ = this.aboveService.getAbove();
  }

  sorting(event) {
    let target = event.target || event.srcElement || event.currentTarget;

    let asc = target.classList.contains('asc');

    let desc = target.classList.contains('desc');
    
    let tableHeaders = Array.from(document.querySelectorAll('.sortable-column'));
    
    for(let tableHeader of tableHeaders) {
      tableHeader.classList.remove('asc');
      tableHeader.classList.remove('desc');
    }

    if((!asc && !desc) || desc) {
      target.classList.add('asc');
      this.satellites$ = this.aboveService.sorting(this.satellites$, this.tableHeadersData[target.id], 'asc');
    }
    else {
      target.classList.add('desc');
      this.satellites$ = this.aboveService.sorting(this.satellites$, this.tableHeadersData[target.id], 'desc');
    }
  }
}