import { Component, OnInit } from '@angular/core';
import { AdzBooksService } from 'src/app/services/adz-books.service';
import { Router } from '@angular/router';
import AdzQuery from 'src/app/models/Query.model';
import { Subscription } from 'rxjs';
import AdzBook from 'src/app/models/Book.model';

@Component({
  selector: 'app-adz-result',
  templateUrl: './adz-result.component.html',
  styleUrls: ['./adz-result.component.scss']
})
export class AdzResultComponent implements OnInit {

  constructor(private booksService: AdzBooksService, private router: Router) { }

  requestString: string = 'lion';

  books: AdzBook[] = [];
  booksSubscription: Subscription;

  query: AdzQuery = null;
  querySubscription: Subscription;

  ngOnInit() {
    this.booksSubscription = this.booksService.booksSubject.subscribe(
      (b: AdzBook[]) => {
        this.books = b;
      }
    );

    this.querySubscription = this.booksService.querySubject.subscribe(
      (v: AdzQuery) => {
        this.query = v;
      }
    );

    this.booksService.getBooks(this.requestString);
    this.booksService.emitBooks();
  }

  onGoBack() {
    this.router.navigate(['/home']);
  }

  openPopup(id: number) {
    let popup = document.getElementById("popup" + id);
    popup.classList.toggle("show");
  }

  ngOnDestroy(): void {
    this.booksSubscription.unsubscribe();
    this.querySubscription.unsubscribe();
  }

}
