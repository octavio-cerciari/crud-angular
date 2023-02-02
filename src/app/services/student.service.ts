import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../model/interface/student.model';

@Injectable({
	providedIn: 'root',
})
export class StudentService {
	constructor(private http: HttpClient) {}

	getStudents() {
		return this.http.get('https://api-laser-teste.herokuapp.com/alunos');
	}

	postStudents(student: Student) {
		return this.http.post('https://api-laser-teste.herokuapp.com/alunos', student);
	}

	updateStudents(id: number, student: Student) {
		return this.http.put('https://api-laser-teste.herokuapp.com/alunos/'.concat(id.toString()), student);
	}

	deleteStudent(id: number) {
		return this.http.delete("https://api-laser-teste.herokuapp.com/alunos/".concat(id.toString()) );
	}
}