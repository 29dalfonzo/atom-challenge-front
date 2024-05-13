import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full",
  },
  {
    path: "login",
    loadComponent: () => import("./modules/login/login.component").then((m) => m.LoginComponent),
  },
  {
    path: "tasks",
    loadComponent: () => import("./modules/tasks/tasks.component").then((m) => m.TasksComponent),

  },
  {
    path: "404",
    loadComponent: () => import("./sharedComponents/PageNotFound").then((m) => m.PageNotFoundComponent),
  },
  {
    path: "**",
    redirectTo: "/404",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
