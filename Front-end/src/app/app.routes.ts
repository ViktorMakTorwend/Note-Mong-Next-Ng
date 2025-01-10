import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddEditTopicComponent } from './components/add-edit-topic/add-edit-topic.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'add-edit-topic', component: AddEditTopicComponent},
];
