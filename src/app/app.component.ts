import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmComponent } from 'src/shared/modal-confirm/modal-confirm.component';
import { Student } from './model/interface/student.model';
import { StudentService } from './services/student.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
	constructor(private formBuilder: FormBuilder, private studentService: StudentService, private changeDetectorRefs: ChangeDetectorRef, public dialog: MatDialog) { }

	displayedColumns: string[] = ['id', 'nome', 'sobrenome', 'idade', 'sexo', 'acoes'];
	dataSource!: Student[];
	students: Student[] = [];
	form: FormGroup = this.initializeForm();
	student!: Student | null;
	loading = true;
	searchFormControl = new FormControl('', [Validators.required]);

	ngOnInit() {
		this.getStudents();
	}

	initializeForm(): FormGroup {
		return this.formBuilder.group({
			nome: new FormControl('', [Validators.required]),
			sobrenome: new FormControl('', [Validators.required]),
			idade: new FormControl('', [Validators.required]),
			sexo: new FormControl('', [Validators.required]),
		});
	}

	editStudent(student: Student) {
		this.cancelEdit();
		this.student = student;
		this.form.controls.nome.setValue(student.nome)
		this.form.controls.sobrenome.setValue(student.sobrenome)
		this.form.controls.idade.setValue(student.idade)
		this.form.controls.sexo.setValue(student.sexo)
	}

	cancelEdit() {
		this.form = this.initializeForm();
		this.student = null;
	}

	deleteStudent(id: number) {

		this.dialog.open(ModalConfirmComponent, {

			data: {
				title: 'Excluir Aluno',
				text: 'Você tem certeza que deseja excluir esse aluno?',
				confirmAction: () => {
					this.studentService.deleteStudent(id).subscribe(
						(next: any) => {
							console.log(next);
							this.getStudents();
						},
						(error: any) => {
							console.log(error);
						}
					)
				},
			}
		});
	}

	getStudents() {
		this.studentService.getStudents().subscribe(
			(next: any) => {
				this.dataSource = [];
				this.dataSource.push(...next);
				this.students = this.dataSource;
				this.changeDetectorRefs.detectChanges();
				this.loading = false;
			},
			(error: any) => {
				console.log(error);
			}
		)
	}

	postStudent() {
		if (this.form.invalid) return
		this.loading = true;
		const newStudent = this.form.value;
		this.studentService.postStudents(newStudent).subscribe(
			() => {
				this.getStudents();
				this.cancelEdit();
			},
			(error: any) => {
				console.log(error);
			}
		)
	}

	updateStudent() {
		if (this.form.invalid || !this.student) return
		
		this.student = {
			id: this.student.id,
			nome: this.form.controls.nome.value,
			sobrenome: this.form.controls.sobrenome.value,
			idade: this.form.controls.idade.value,
			sexo: this.form.controls.sexo.value
		}

		this.dialog.open(ModalConfirmComponent, {

			data: {
				title: 'Atualizar Aluno',
				text: 'Você tem certeza que deseja atualizar esse aluno?',
				confirmAction: () => {
					this.dataSource = [];
					this.loading = true;
					if (this.student && this.student.id) {
						this.studentService.updateStudents(this.student.id, this.student).subscribe(
							() => {
								this.getStudents();
								this.cancelEdit();
							},
							(error: any) => {
								console.log(error);
							}
						)
					}
				},
			}
		});
	}

	getErrorMessage() { }
	searchStudent() { 
		console.log("ENTROU SERACH")
		console.log(this.searchFormControl.value)
		console.log(this.students)
		const filteredStudents = this.students.filter(s => s.nome.toLowerCase().includes(this.searchFormControl.value?.toString().toLowerCase() || ''))

		this.dataSource = [];
		if (filteredStudents) {this.dataSource.push(... filteredStudents);}
		
		this.changeDetectorRefs.detectChanges();

		console.log(filteredStudents);
	}
}

