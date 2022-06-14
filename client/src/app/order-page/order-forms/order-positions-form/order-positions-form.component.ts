import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { Position } from 'src/app/shared/Interfaces';
import { MaterialService } from 'src/app/shared/services/material.service';
import { PositionsService } from 'src/app/shared/services/positions.service';

@Component({
  selector: 'app-order-positions-form',
  templateUrl: './order-positions-form.component.html',
  styleUrls: ['./order-positions-form.component.css']
})
export class OrderPositionsFormComponent implements OnInit {
  constructor(
    private rout: ActivatedRoute,
    private router: Router,
	private positionsService: PositionsService
  ) { }

  positions: Position[] = []
  loading = true

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
			next: positios => {
				this.positions = positios
				this.loading = false
			},
			error: error => MaterialService.toast(error.error.message)
		})
	}
}
