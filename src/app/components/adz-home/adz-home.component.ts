import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdzBooksService } from 'src/app/services/adz-books.service';
import AdzQuery from 'src/app/models/Query.model';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-adz-home',
  templateUrl: './adz-home.component.html',
  styleUrls: ['./adz-home.component.scss']
})
export class AdzHomeComponent implements OnInit {

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private booksService: AdzBooksService,
    private cookieService: CookieService) { }

  lang: string;

  query: AdzQuery = this.booksService.query;

  ngOnInit() {
    this.lang = this.cookieService.get('lang') ? this.cookieService.get('lang') : 'fr';
    this.query.lang = this.lang;
    this.booksService.notifyUseCookie();

  }

  setLanguage(l: string) {
    console.log('variable: ' + this.lang);
    console.log('Cookies: ' + this.cookieService.get('lang'));
    this.cookieService.set('lang', 'fr');
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
