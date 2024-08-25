import { Component } from '@angular/core';
import { AppComponent } from "../../app.component";
import { CajaComponent } from "../caja/caja.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AppComponent, CajaComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
