import { Component, OnInit } from '@angular/core';
import { AdzBooksService } from 'src/app/services/adz-books.service';
import { Subscribable, Subscription } from 'rxjs';
import AdzQuery from 'src/app/models/Query.model';

@Component({
  selector: 'app-adz-header',
  templateUrl: './adz-header.component.html',
  styleUrls: ['./adz-header.component.scss']
})
export class AdzHeaderComponent implements OnInit {
  ngOnInit() {
  }

}
