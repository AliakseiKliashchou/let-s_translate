import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
    return this.http.get(`${this.URL}/secure/collections/${id}`);
  }

  getFindingCollections(findingParams){
    const params = new HttpParams()
      .set('review', findingParams.review)
      .set('originalLanguage', findingParams.originalLanguage)
      .set('translateLanguage', findingParams.translateLanguage)
      .set('tags', findingParams.tags);
    return this.http.get(`${this.URL}/secure/collections/by-params`, {params});
  }

}
