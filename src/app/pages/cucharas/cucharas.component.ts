import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuComponent } from '../../commons/menu/menu.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cucharas',
  imports: [MenuComponent, CommonModule, FormsModule],
  templateUrl: './cucharas.component.html',
  styleUrl: './cucharas.component.css'
})
export class CucharasComponent {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/cucharas';
  private vasoUrl = 'http://localhost:8080/api/vasos';

  cucharas: any[] = [];
  vasos: any[] = [];
  showForm = false;
  cucharaForm: any = {};
  isEditing = false;

  constructor() {
    this.getAllCucharas();
    this.getAllVasos();
  }

  getAllVasos() {
    this.http.get<any[]>(this.vasoUrl).subscribe({
      next: (data) => {
        this.vasos = data;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  getAllCucharas() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.cucharas = data;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  openForm() {
    this.showForm = true;
    this.isEditing = false;
    this.cucharaForm = {
      material: '',
      tamano: '',
      vasoId: null
    };
  }

  saveCuchara() {
    const payload = {
      material: this.cucharaForm.material,
      tamano: this.cucharaForm.tamano,
      vaso: this.cucharaForm.vasoId ? { id: Number(this.cucharaForm.vasoId) } : null
    };

    

    
    if (this.isEditing) {
      this.http.put(`${this.apiUrl}/${this.cucharaForm.id}`, payload).subscribe({
        next: () => {
          this.getAllCucharas();
          this.closeForm();
        }
      });
    } else {
      this.http.post(this.apiUrl, payload).subscribe({
        next: () => {
          this.getAllCucharas();
          this.closeForm();
        }
      });
    }
  }

  editCuchara(cuchara: any) {
    this.cucharaForm = {
      ...cuchara,
      vasoId: cuchara.vaso?.id || null
    };
    this.isEditing = true;
    this.showForm = true;
  }

  deleteCuchara(id: number) {
    if (confirm('¿Eliminar esta cuchara?')) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe({
        next: () => {
          this.getAllCucharas();
        }
      });
    }
  }

  closeForm() {
    this.showForm = false;
    this.cucharaForm = {};
  }
}
