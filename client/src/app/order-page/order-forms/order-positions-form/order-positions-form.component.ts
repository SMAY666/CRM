import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Params} from '@angular/router';
import {switchMap} from 'rxjs';

import {Position} from 'src/app/shared/Interfaces';
import {MaterialService} from 'src/app/shared/services/material.service';
import {PositionsService} from 'src/app/shared/services/positions.service';
import {OrderPageComponent} from '../../order-page.component';


@Component({
    selector: 'app-order-positions-form',
    templateUrl: './order-positions-form.component.html',
    styleUrls: ['./order-positions-form.component.css']
})
export class OrderPositionsFormComponent implements OnInit {
    positions: Position[] = []
    loading = true

    constructor(
        private rout: ActivatedRoute,
        private positionsService: PositionsService
    ) {
    }

    ngOnInit(): void {
        this.rout.params
            .pipe(
                switchMap(
                    (params: Params) => {
                        return this.positionsService.fetch(params['id'])
                    }
                )
            )
            .subscribe({
                next: (positions) => {
                    this.positions = positions
                    this.loading = false
                },
                error: error => MaterialService.toast(error.error.message)
            })
    }

    addToList(position: Position) {
        OrderPageComponent.orderPositions.push({
            name: position.name,
            quantity: 1,
            cost: position.cost
        })
        console.log(OrderPageComponent.orderPositions)
    }
    onSubmit(position: Position): void {
        try {
            this.addToList(position)
            MaterialService.toast(`Позиция "${position.name}" добавлена в список заказаа`)
        } catch (error) {
            console.warn(error)
        }
    }
}
