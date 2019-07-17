import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AuthService} from '../users/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  private URL = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private authService: AuthService) {
  }

  getCollections(id: number) {
    return this.http.get(`${this.URL}/secure/collections/get-by-user/${id}`);
  }

  getFindingCollections(findingParams) {
    const params = new HttpParams()
      .set('review', findingParams.review)
      .set('originalLanguage', findingParams.originalLanguage)
      .set('translateLanguage', findingParams.translateLanguage)
      .set('tags', findingParams.tags);
    return this.http.get(`${this.URL}/secure/collections/by-params`, {params});
  }

  deleteCollection(id){    
    return this.http.delete(`${this.URL}/secure/collections/delete`, id);
  }

  createColection(idOrders: number[], tittle: string) {
    const idCustomer = this.authService.getUserId();
    return this.http.post(`${this.URL}/secure/collections/create`, {idCustomer, idOrders, tittle});
  }

}
