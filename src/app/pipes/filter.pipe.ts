import { Pipe, PipeTransform } from '@angular/core';
import AdzBook from '../models/Book.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  /**
   * Prend en argument une liste de livre, l'expression de filtre et parquoi on va filtrer
   * @param books 
   * @param term 
   * @param by 
   */
  transform(books: AdzBook[], term: string, by?: string): any {
    /* console.log(term);
    console.log(`${by}`); */
    if (term !== undefined && term !== "") {
      if (by !== undefined) {
        return this.filter(books, term, by);
      }
    }

    return books;
  }

  /**
   * C'est la sous fonction qui effectue le filtre en fonction de l'expression saisie
   * @param books 
   * @param term 
   * @param by 
   */
  filter(books: AdzBook[], term: string, by: string) {
    let bks: AdzBook[] = books;
    if (by === 'title') {
      return books.filter(b => {
        return b.title.toLowerCase().includes(term.toLowerCase());
      });
    }

    if (by === 'publisher') {
      return books.filter(b => {
        return b.publisher && b.publisher.toLowerCase().includes(term.toLowerCase());
      });
    }

    if (by === 'country') {
      return books.filter(b => {
        return b.country.toLowerCase().includes(term.toLowerCase());
      });
    }

    if (by === 'language') {
      return books.filter(b => {
        return b.language.toLowerCase().includes(term.toLowerCase());
      });
    }

    if (by === 'pageslessthan') {
      return books.filter(b => {
        if (b.pageCount <= Number.parseInt(term)) return b;
      });
    }

    if (by === 'pagesmorethan') {
      return books.filter(b => {
        if (b.pageCount >= Number.parseInt(term)) return b;
      });
    }

    if (by === 'publishedYear') {
      return books.filter(b => {
        if (b.publishedDate && new Date(b.publishedDate).getFullYear() === new Date(term).getFullYear()) return b;
      });
    }

    if (by === 'pricelessthan') {
      return books.filter(b => {
        if (b.price && b.price <= Number.parseFloat(term)) return b;
      });
    }

    if (by === 'pricemorethan') {
      return books.filter(b => {
        if (b.price && b.price >= Number.parseFloat(term)) return b;
      });
    }

    if (by === 'authors') {
      return books.filter(b => {
        if (b.authors) {
          return b.authors.filter(a => a.toLowerCase().indexOf(term.toLowerCase()));
        }
      }
      );
    }

    if (by === 'categories') {
      return books.filter(b => {
        b.categories.map(c => {
          if (c.toLowerCase().includes(term.toLowerCase())) return b;
        });
      });
    }
    //console.log(books);
    //return books;
  }

}
