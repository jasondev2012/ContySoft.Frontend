import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  valCheck: string[] = ['remember'];

  password!: string;

  constructor(public layoutService: LayoutService) { }
}
