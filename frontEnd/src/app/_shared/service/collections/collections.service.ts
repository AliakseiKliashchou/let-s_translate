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
    private authService: AuthService,
    ) {
  }

  getCollections(id: number) {
    return this.http.get(`${this.URL}/secure/collections/get-by-user/${id}`);
  }

  getFindingCollections(findingParams) {
    const idCustomer = this.authService.getUserId();
    const params = new HttpParams()
      .set('review', findingParams.review)
      .set('originalLanguage', findingParams.originalLanguage)
      .set('translateLanguage', findingParams.translateLanguage)
      .set('tags', findingParams.tags)
      .set('idCustomer', String(idCustomer));
    return this.http.get(`${this.URL}/secure/collections/by-params`, {params});
  }

  deleteCollection(idCollections) {
    return this.http.delete(`${this.URL}/secure/collections/delete/${idCollections}`);
  }


  createColection(idOrders: number[], tittle: string, isOneTranslator: boolean) {
    const idCustomer = this.authService.getUserId();
    console.log(idOrders)
    return this.http.post(`${this.URL}/secure/collections/create`, {idCustomer, idOrders, tittle, isOneTranslator});
  }

}
