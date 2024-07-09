import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { EventsPageComponent } from './pages/events-page/events-page.component';
import { LayoutComponent } from './common-ui/layout/layout.component';
import { EventDetailComponent } from './common-ui/event-detail/event-detail.component';
import { ForbiddenComponent } from './common-ui/forbidden/forbidden.component';
import { canActivateAdminView, canActivateAuth, canActivateEditorView, canActivateLogin } from './auth/access.guard';

export const routes: Routes = [
    {path: '', component: LayoutComponent, children: [
            {path: '', component: EventsPageComponent},
            {path: 'users', component: UsersPageComponent, canActivate: [canActivateAdminView]},
            {path: 'events/:id', component: EventDetailComponent },
        ],
        canActivate: [canActivateAuth]
    },
    {path: 'login', component: LoginPageComponent, canActivate: [canActivateLogin]},
    {path: 'signup', component: SignupPageComponent, canActivate: [canActivateLogin]},
    {path: '403', component: ForbiddenComponent}
];
