import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { EventsPageComponent } from './pages/events-page/events-page.component';
import { LayoutComponent } from './common-ui/layout/layout.component';
import { EventDetailPageComponent } from './pages/event-detail-page/event-detail-page.component';
import { ForbiddenComponent } from './common-ui/forbidden/forbidden.component';
import { canActivateAdminView, canActivateAuth, canActivateEditorView, canActivateLogin } from './auth/access.guard';

export const routes: Routes = [
    {path: '', component: LayoutComponent, children: [
            {path: '', component: EventsPageComponent},
            //{path: 'users', component: UsersPageComponent, canActivate: [canActivateAdminView]},
            {path: 'users', component: UsersPageComponent},
            {path: 'users/:id', component: ProfilePageComponent},
            {path: 'events/:id', component: EventDetailPageComponent },
        ],
        canActivate: [canActivateAuth]
    },
    {path: 'login', component: LoginPageComponent, canActivate: [canActivateLogin]},
    {path: 'signup', component: SignupPageComponent, canActivate: [canActivateLogin]},
    {path: '403', component: ForbiddenComponent}
];
