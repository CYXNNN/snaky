import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {GameComponent} from './components/game/game.component';
import {WelcomeComponent} from './components/welcome/welcome.component';

const config: SocketIoConfig = { url: 'http://localhost:8000', options: {} };
const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  { path: 'welcome', component: WelcomeComponent},
  { path: 'game', component: GameComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    SocketIoModule.forRoot(config),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
