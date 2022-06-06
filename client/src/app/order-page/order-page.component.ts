import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../shared/Interfaces';
import { CategoriesService } from '../shared/services/categories.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})

export class OrderPageComponent implements OnInit, AfterViewInit {

  constructor(private categoriesService: CategoriesService) { }
  categories$: Observable<Category[]>

	ngOnInit(): void {
		this.categories$ = this.categoriesService.fetch()
  	}
	ngAfterViewInit(): void {
		
	}

}
