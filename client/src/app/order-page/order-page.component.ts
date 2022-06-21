import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Category, OrderPositions} from '../shared/Interfaces';
import {CategoriesService} from '../shared/services/categories.service';

@Component({
    selector: 'app-order-page',
    templateUrl: './order-page.component.html',
    styleUrls: ['./order-page.component.css']
})

export class OrderPageComponent implements OnInit, OnDestroy {

    categories: Observable<Category[]>
    static orderPositions: OrderPositions[] = []

    constructor(private categoriesService: CategoriesService) {
    }

    ngOnInit(): void {
        this.categories = this.categoriesService.fetch()
    }

    ngOnDestroy(): void {

    }
}
