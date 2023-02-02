import { Component, Inject } from '@angular/core';
import { ModalDataInterface } from 'src/app/model/interface/modal-interface.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-modal-confirm',
	templateUrl: './modal-confirm.component.html'
})
export class ModalConfirmComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public data: ModalDataInterface) {}

	confirmAction():void {
		this.data.confirmAction();
	}
}