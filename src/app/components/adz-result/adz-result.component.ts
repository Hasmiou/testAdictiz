import { Component, OnInit, Input, Inject } from '@angular/core';
import { AdzBooksService } from 'src/app/services/adz-books.service';
import { Router, ActivatedRoute } from '@angular/router';
import AdzQuery from 'src/app/models/Query.model';
import { Subscription } from 'rxjs';
import AdzBook from 'src/app/models/Book.model';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-adz-result',
  templateUrl: './adz-result.component.html',
  styleUrls: ['./adz-result.component.scss']
})
export class AdzResultComponent implements OnInit {

  constructor(
    private booksService: AdzBooksService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

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
    this.parseUrl();
    this.booksService.getBooks(this.requestString);
    this.booksService.emitBooks();
  }

  onGoBack() {
    this.router.navigate(['/home']);
  }

  parseUrl() {
    let search = this.activatedRoute.snapshot.params['s'];
    if (search === "") {
      this.router.navigate(['/home'])
    }

    try {
      search = decodeURI(search);
      this.requestString = search;
    } catch (error) {
      this.notify("Error: une erreur s'est produite: " + error);
    }
  }

  openPopup(id: number) {
    let popup = document.getElementById("popup" + id);
    popup.classList.toggle("show");
  }

  ngOnDestroy(): void {
    this.booksSubscription.unsubscribe();
    this.querySubscription.unsubscribe();
  }

  openDialog(book: AdzBook) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = book;
    const dialogRef = this._dialog.open(DialogContentComponent, dialogConfig);


    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  notify(message: string) {
    this._snackBar.open(message, 'X', {
      duration: 5000
    });
  }
}

@Component({
  selector: 'dialogContent',
  templateUrl: 'dialogContent.html',
})
export class DialogContentComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    //console.log(data);
  }
}
