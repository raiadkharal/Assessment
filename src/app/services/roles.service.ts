import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseModel } from '../models/ApiResponseModel';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  http = inject(HttpClient);
  constructor() {}

  getAllRoles(): Observable<ApiResponseModel> {
    return this.http.get<ApiResponseModel>(
      environment.BASE_URL + 'roles/getall'
    );
  }

  getRoleById(id: number): Observable<ApiResponseModel> {
    return this.http.get<ApiResponseModel>(
      environment.BASE_URL + 'roles/get/' + id
    );
  }

  //  createCategory(category:Category):Observable<ApiResponseModel>{
  //   return this.http.post<ApiResponseModel>(environment.BASE_URL+"category/create",category);
  //  }

  //  updateCategory(id:number,category:Category):Observable<ApiResponseModel>{
  //   return this.http.put<ApiResponseModel>(environment.BASE_URL+"category/update/"+id,category);
  //  }

  //  deleteCategory(id:number):Observable<ApiResponseModel>{
  //   return this.http.delete<ApiResponseModel>(environment.BASE_URL+"category/delete/"+id);
  //  }
}
