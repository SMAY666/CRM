import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PositionsService } from 'src/app/shared/services/positions.service';
import { Position } from 'src/app/shared/Interfaces';
import { MaterialInstance, MaterialService } from 'src/app/shared/services/material.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { response } from 'express';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.css']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {
	@Input('categoryId') categoryId: string
	@ViewChild('modal') modalRef: ElementRef

	positions: Position[] = []
	positionId: any = null
	loading = false
	modal: MaterialInstance
	form: FormGroup

  	constructor(private positionsService: PositionsService) { }

	ngOnInit(): void {
		this.form = new FormGroup({
			name: new FormControl(null, Validators.required),
			cost: new FormControl(1.00, [Validators.required, Validators.min(1)])	
		})
		this.loading = true
		this.positionsService.fetch(this.categoryId).subscribe(positions => {
			this.positions = positions
			this.loading = false
		})
	}

	ngOnDestroy(): void {
		this.modal.destroy()
	}

	ngAfterViewInit() {
		return this.modal = MaterialService.initModal(this.modalRef)
	}
	onSelectPosition(position: Position) {
		this.positionId = position._id
		this.form.patchValue({
			name: position.name,
			cost: position.cost
		})
		this.modal.open()
		MaterialService.updateTextInputs()
	}
	onAddPosition() {
		this.positionId = null
		this.modal.open()
		this.form.reset({name: '', cost: 1.00})
		MaterialService.updateTextInputs()

	}
	onCancel() {
		this.modal.close()
	}

	onSubmit() {
		this.form.disable()

		const newPosition: Position = {
			name: this.form.value.name,
			cost: this.form.value.cost,
			category: this.categoryId
		}
		const completed = () => {
			this.modal.close()
			this.form.reset({name: '', cost: '1.00'})
			this.form.enable()
		}
		if (this.positionId) {
			newPosition._id = this.positionId
			this.positionsService.update(newPosition).subscribe(
				position => {
					const inx = this.positions.findIndex(p => p._id === position._id)
					this.positions[inx] = position
					MaterialService.toast("Позиция изменена успешно")
					}, error => {
					this.form.enable()
					MaterialService.toast(error.error.message)
				}, completed
			)
		}
		else {
			this.positionsService.create(newPosition).subscribe(
				position => {
					MaterialService.toast("Позиция изменена успешно")
					this.positions.push(position)
				}, error => {
					this.form.enable()
					MaterialService.toast(error.error.message)
				}, completed);
		}
	}
	onDeletPosition(event: Event, position: Position) {
		event.stopPropagation()
		const decision = window.confirm(`Вы действительно хотите удалить позицию ${position.name}?`)
		if (decision) {
			this.positionsService.delete(position).subscribe(
				response => {
					const inx = this.positions.findIndex(p => p._id === position._id)
					this.positions.splice(inx, 1)
					MaterialService.toast(response.message)
				}, error => MaterialService.toast(error.error.message)
				
			)
		}
	}
}
