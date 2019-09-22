import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adz-home',
  templateUrl: './adz-home.component.html',
  styleUrls: ['./adz-home.component.scss']
})
export class AdzHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    const search: string = f.value['search'];
    this.router.navigate(['/result', search]);
  }

}
