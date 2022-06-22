import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrderPageComponent} from '../../order-page.component';

@Inject({

})
@Component({
  selector: 'app-order-checklist-form',
  templateUrl: './order-checklist.component.html',
  styleUrls: ['./order-checklist.component.css']
})
export class OrderChecklistComponent implements OnInit {
    forms: FormGroup[] = []
    selectedPos = OrderPageComponent.orderPositions
    constructor() { }

    ngOnInit(): void {

        for (let i = 0; i < this.selectedPos.length; i++) {
            this.forms.push(new FormGroup({
                number: new FormControl(1, [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*[.,]?")])
            }))
        }
    }
}
