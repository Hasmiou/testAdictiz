import { Component, OnInit, Inject } from '@angular/core';
import { AdzBooksService } from 'src/app/services/adz-books.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import AdzBook from 'src/app/models/Book.model';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import AdzQuery from 'src/app/models/Query.model';


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
    private _snackBar: MatSnackBar,
    private toastr: ToastrService
  ) { }

  requestString: string = null;
  filteredBy = "title";

  books: AdzBook[] = [];
  booksSubscription: Subscription;

  query: AdzQuery = this.booksService.query;

  isFinish = false;

  ngOnInit() {
    this.booksService.notifyUseCookie();
    this.booksSubscription = this.booksService.booksSubject.subscribe(
      (b: AdzBook[]) => {
        this.books = b;
      }
    );

    this.parseUrl();
    try {
      this.booksService.getBooks(this.requestString);
      this.booksService.emitBooks();
    } catch (error) {
      this.toastr.error("Nous sommes désolé, une erreur interne s'est produite!", 'Erreur');
    }
  }

  onGoBack() {
    this.router.navigate(['/home']);
  }

  parseUrl() {
    let search = this.activatedRoute.snapshot.params['s'];
    if (search === "") {
      this.toastr.error('Veuiller saisir un nom de livre puis appuyez sur ENTRER pour rechercher', 'Erreur');
      this.router.navigate(['/home'])
    }

    try {
      search = decodeURI(search);
      this.requestString = search;
    } catch (error) {
      this.notify("Error: une erreur s'est produite: " + error);
    }
  }

  openDialog(book: AdzBook) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = book;
    const dialogRef = this._dialog.open(DialogContentComponent, dialogConfig);
  }

  notify(message: string) {
    this._snackBar.open(message, 'X', {
      duration: 5000
    });
  }

  ngOnDestroy(): void {
    this.booksSubscription.unsubscribe();
  }
}

@Component({
  selector: 'dialogContent',
  templateUrl: 'dialogContent.html',
})
export class DialogContentComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }
}
