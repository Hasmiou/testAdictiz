import { Pipe, PipeTransform } from '@angular/core';
import AdzBook from '../models/Book.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(book: AdzBook[], term: string, by?: string): any {
    console.log(term);
    //console.log(by);
    console.log(`${by}`);
    if (term !== undefined || term === "") {
      //if (by !== undefined) {
      // if (by === 'title') return book.filter(b => { b.title.toLowerCase().includes(term.toLowerCase()) });


      return book.filter(
        b => {
          console.log(`${b[by]}`);
          return b.language.toLowerCase().includes(term.toLowerCase()) ||
            b.title.toLowerCase().includes(term.toLowerCase()) ||
            b.country.toLowerCase().includes(term.toLowerCase())
            /* ||
            (b.authors && b.authors.map(a => {
              a.toLowerCase().includes(term.toLowerCase())
            }))*/
            ;
        }
      );
      //}
    }

    return book;

  }

}
