import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EditBusesComponent } from './components/edit-buses/edit-buses.component';
import { BusesComponent } from './components/buses/buses.component';
import { BusComponent } from './components/bus/bus.component';
import { SearchComponent } from './components/search/search.component';
import { LoginComponent } from './components/usuario/login/login.component';
import { RegisterComponent } from './components/usuario/register/register.component';
import { AdminGuard } from './guards/admin.guard';
import { ConductorComponent } from './components/conductor/conductor.component';
import { ConductorGuard } from './guards/conductor.guard';

const APP_ROUTES: Routes = [
{path: 'home', component: HomeComponent},
{path: 'about', component: EditBusesComponent, canActivate: [ AdminGuard ]},
{path: 'buses', component: BusesComponent},
{path: 'login', component: LoginComponent} ,
{path: 'conductor', component: ConductorComponent, canActivate: [ ConductorGuard ]} ,
{path: 'registrar', component: RegisterComponent, canActivate: [ AdminGuard ]},
{path: 'bus/:termino', component: BusComponent},
{path: 'search/:termino', component: SearchComponent},
{path: '', pathMatch: 'full', redirectTo: '/home'},  // regresa a la home
{path: 'auth', loadChildren: './components/usuario/auth.module#AuthModule'}

];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
