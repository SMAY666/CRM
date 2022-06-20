import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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
    forms: FormGroup[] = []

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

                    for (let i = 0; i < this.positions.length; i++) {
                        this.forms.push(new FormGroup({
                            number: new FormControl(1, [Validators.required, Validators.min(1)])
                        }))
                    }

                    this.loading = false
                },
                error: error => MaterialService.toast(error.error.message)
            })
    }

    addToList(position: Position, form: FormGroup) {
        OrderPageComponent.orderPositions.push({
            name: position.name,
            quantity: form.value,
            cost: position.cost
        })
        console.log(OrderPageComponent.orderPositions)
    }
}
