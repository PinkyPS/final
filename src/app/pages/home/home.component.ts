import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuComponent } from '../../commons/menu/menu.component';

@Component({
  selector: 'app-home',
  imports: [MenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private http =inject(HttpClient);

  constructor(){
    //this.getVaso()
  }
  getVaso(){
    this.http.get("http://localhost:8080/api/vasos").subscribe(data=>{
      console.log;
    })
  }
}
