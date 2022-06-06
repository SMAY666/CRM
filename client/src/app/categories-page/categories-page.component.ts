import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../shared/Interfaces';
import { CategoriesService } from '../shared/services/categories.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {

  constructor(private categoriesService: CategoriesService) { }

  categories$: Observable<Category[]>

  ngOnInit(): void {
    this.categories$ = this.categoriesService.fetch()
  }
}
