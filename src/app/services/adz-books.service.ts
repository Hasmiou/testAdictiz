import { Injectable } from '@angular/core';
import AdzBook from '../models/Book.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import AdzQuery from '../models/Query.model';

@Injectable({
  providedIn: 'root'
})
export class AdzBooksService {

  constructor(private httpClient: HttpClient) {
    //this.getBooks();
  }

  books: AdzBook[] = [];
  query: AdzQuery = new AdzQuery('', 0);

  booksSubject = new Subject<AdzBook[]>();
  querySubject = new Subject<AdzQuery>();

  emitBooks() {
    this.booksSubject.next(this.books);
    this.querySubject.next(this.query);
  }

  getBooks(request: string) {
    this.httpClient
      .get<any>("https://www.googleapis.com/books/v1/volumes?q=" + request)
      .subscribe(
        (response) => {
          this.responseParser(response, request);
          this.emitBooks();
        },
        (error) => {
          console.log('Error: ' + error);
        }
      );
  }

  responseParser(response: any, req: string) {
    this.query.request = req;
    //this.query.totalItems = response.items.length;
    const items: any[] = response.items;
    items.map(
      i => {
        let book: AdzBook = new AdzBook();
        book.authors = i.volumeInfo.authors;
        book.title = i.volumeInfo.title;
        book.publishedDate = i.volumeInfo.publishedDate ? new Date(i.volumeInfo.publishedDate) : Number.NaN;
        book.publisher = i.volumeInfo.publisher;
        book.description = i.volumeInfo.description;
        book.pageCount = i.volumeInfo.pageCount;
        book.categories = i.volumeInfo.categories;
        book.imageLink = (i.volumeInfo.imageLinks.thumbnail) ? i.volumeInfo.imageLinks.thumbnail : '/assets/book.pngy';
        book.language = i.volumeInfo.language;
        book.link = i.volumeInfo.canonicalVolumeLink;
        book.country = i.saleInfo.country;
        book.price = (i.saleInfo.listPrice) ? i.saleInfo.listPrice.amount : 0;
        book.currency = (i.saleInfo.listPrice) ? i.saleInfo.listPrice.currencyCode : '';
        book.isEbook = i.saleInfo.isEbook;

        this.books.push(book);
      }
    );
  }

}
