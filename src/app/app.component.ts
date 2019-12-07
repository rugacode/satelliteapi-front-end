import { Component } from '@angular/core';

import { AboveService } from './services/above.service';
import { Title } from '@angular/platform-browser';

import { Headers } from './data/json/headers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Satellite Info';

  satellites$: Observable<any[]>;

  headers: any = Headers;

  requestParams: object;

  constructor(
    private titleService: Title,
    private aboveService: AboveService
  ) {}

  ngOnInit() {
    this.titleService.setTitle(this.title);

    this.satellites$ = this.aboveService.getAbove();

    this.requestParams = this.aboveService.getRequestParams();
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
      this.satellites$ = this.aboveService.sorting(this.satellites$, this.headers[target.id], 'asc');
    }
    else {
      target.classList.add('desc');
      this.satellites$ = this.aboveService.sorting(this.satellites$, this.headers[target.id], 'desc');
    }
  }

  onFetch(event) {
    this.aboveService.setRequestParams(event);
    this.satellites$ = this.aboveService.getAbove();
  }
}