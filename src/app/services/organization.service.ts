import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseModel } from '../models/ApiResponseModel';
import { environment } from '../../environments/environment.development';
import { Organization } from '../models/Organization';
import { OrganizationMember } from '../models/OrganizationMember';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  http = inject(HttpClient);
  constructor() {}

  getAllOrganizations(): Observable<ApiResponseModel> {
    return this.http.get<ApiResponseModel>(
      environment.BASE_URL + 'organizations/getall'
    );
  }

  getOrganizationById(id: number): Observable<ApiResponseModel> {
    return this.http.get<ApiResponseModel>(
      environment.BASE_URL + 'organizations/get/' + id
    );
  }

  createOrganization(obj: Organization): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(
      environment.BASE_URL + 'organizations/create',
      obj
    );
  }

  //  updateCategory(id:number,category:Category):Observable<ApiResponseModel>{
  //   return this.http.put<ApiResponseModel>(environment.BASE_URL+"category/update/"+id,category);
  //  }

  removeMemer(obj: OrganizationMember): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(
      environment.BASE_URL + 'organizations/remove-member',
      obj
    );
  }
}
