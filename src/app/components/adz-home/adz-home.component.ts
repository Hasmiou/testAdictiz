import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material';
import { AdzBooksService } from 'src/app/services/adz-books.service';
import AdzQuery from 'src/app/models/Query.model';

@Component({
  selector: 'app-adz-home',
  templateUrl: './adz-home.component.html',
  styleUrls: ['./adz-home.component.scss']
})
export class AdzHomeComponent implements OnInit {

  constructor(private router: Router, private toastr: ToastrService, private _snackBar: MatSnackBar, private booksService: AdzBooksService) { }
  lang: string = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'fr';

  query: AdzQuery = this.booksService.query;

  ngOnInit() {
    this._snackBar.open("Bienvenu à vous, veuillez saisir un nom de livre puis appuyez sur ENTRER pour rechercher", 'X', {
      duration: 5000
    });
  }

  setLanguage(l: string) {
    localStorage.setItem('lang', l);
    this.booksService.query.lang = l;
  }

  onSubmit(f: NgForm) {
    const search: string = f.value['search'];
    if (search === "") {
      this.toastr.info('Veuillez saisir un nom de livre puis appuyez sur ENTRER pour rechercher', 'Erreur');
    }
    this.router.navigate(['/result', search]);
  }

}
