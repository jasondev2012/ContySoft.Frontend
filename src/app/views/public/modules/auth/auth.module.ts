import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterAppService } from 'src/app/common/services/register-app.service';

@NgModule({
  declarations: [],
  imports: [
    AuthRoutingModule
  ],
  providers: [RegisterAppService]
})
export class AuthModule { }
