import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuComponent } from '../../commons/menu/menu.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vasos',
  imports: [MenuComponent, CommonModule, FormsModule],
  templateUrl: './vasos.component.html',
  styleUrl: './vasos.component.css'
})
export class VasosComponent {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/vasos';

  vasos: any[] = [];
  showForm = false;
  vasoForm: any = {};
  isEditing = false;

  constructor() {
    this.getAllVasos();
  }

  getAllVasos() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.vasos = data;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  openForm() {
    this.showForm = true;
    this.isEditing = false;
    this.vasoForm = {
      material: '',
      color: '',
      capacidad: 0,
      contenido: ''
    };
  }

  saveVaso() {
    if (this.isEditing) {
      this.http.put(`${this.apiUrl}/${this.vasoForm.id}`, this.vasoForm).subscribe({
        next: () => {
          this.getAllVasos();
          this.closeForm();
        }
      });
    } else {
      this.http.post(this.apiUrl, this.vasoForm).subscribe({
        next: () => {
          this.getAllVasos();
          this.closeForm();
        }
      });
    }
  }

  editVaso(vaso: any) {
    this.vasoForm = { ...vaso };
    this.isEditing = true;
    this.showForm = true;
  }

  deleteVaso(id: number) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe({
        next: () => {
          this.getAllVasos();
        }
      });
  }

  closeForm() {
    this.showForm = false;
    this.vasoForm = {};
  }
}
