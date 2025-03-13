import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponseModel } from '../models/ApiResponseModel';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Project } from '../models/Project';
import { ProjectCollaboratorDto } from '../models/ProjectCollaboratorDto';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  http = inject(HttpClient);
  constructor() {}

  getAllProjects(): Observable<ApiResponseModel> {
    return this.http.get<ApiResponseModel>(
      environment.BASE_URL + 'projects/getall'
    );
  }

  getProjectById(id: number): Observable<ApiResponseModel> {
    return this.http.get<ApiResponseModel>(
      environment.BASE_URL + 'projects/get/' + id
    );
  }

  getProjectsByUserId(id: number): Observable<ApiResponseModel> {
    return this.http.get<ApiResponseModel>(
      environment.BASE_URL + 'projects/getbyusersid/' + id
    );
  }

  createProject(project: Project): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(
      environment.BASE_URL + 'projects/create',
      project
    );
  }

  updateProject(id: number, project: Project): Observable<ApiResponseModel> {
    return this.http.put<ApiResponseModel>(
      environment.BASE_URL + 'projects/update/' + id,
      project
    );
  }

  deleteProjectById(id: number): Observable<ApiResponseModel> {
    return this.http.delete<ApiResponseModel>(
      environment.BASE_URL + 'projects/delete/' + id
    );
  }

  removeProjectCollaborator(
    obj: ProjectCollaboratorDto
  ): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(
      environment.BASE_URL + 'projects/removeProjectCollaborator',
      obj
    );
  }
}
