import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddTopicComponent } from './components/add-topic/add-topic.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'add-topic', component: AddTopicComponent}
];
