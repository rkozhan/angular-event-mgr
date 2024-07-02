import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { EventsPageComponent } from './pages/events-page/events-page.component';
import { LayoutComponent } from './common-ui/layout/layout.component';
import { canActivateAuth } from './auth/access.guard';

export const routes: Routes = [
    {path: '', component: LayoutComponent, children: [
            {path: '', component: EventsPageComponent},
            {path: 'users', component: UsersPageComponent}
        ],
        canActivate: [canActivateAuth]
    },
    {path: 'login', component: LoginPageComponent},
];
