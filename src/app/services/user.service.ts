import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseModel } from '../models/ApiResponseModel';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  constructor() {}

  getAllUsers(): Observable<ApiResponseModel> {
    return this.http.get<ApiResponseModel>(
      environment.BASE_URL + 'users/getall'
    );
  }

  getUserById(id: number): Observable<ApiResponseModel> {
    return this.http.get<ApiResponseModel>(
      environment.BASE_URL + 'users/get/' + id
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
