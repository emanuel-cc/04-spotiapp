import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http:HttpClient) { }

  getQuery(query:string){
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQA_83vZ2FxZh9GeVRzeR9BkbXDaQdhbxLWPTnUy6dQn7RpZJsBuiC1-3MaL9sVhW_deIkX4vzdltndSbTM'
    });

    return this.http.get(url,{headers});
  }

  getNewReleases(){
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer BQD5Gis8E9Ea9N4kmgIKdmNurD7LGZwrYt7oB-bpj4iP2864YsSfjRdBTAr3Ac9Ng6q1LIWJdHEUAyNaHoM'
    // });
    return this.getQuery('browse/new-releases')
    .pipe(map(data =>{
          return data['albums'].items;
        }));
  }

  getArtistas(termino:string){
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer BQD5Gis8E9Ea9N4kmgIKdmNurD7LGZwrYt7oB-bpj4iP2864YsSfjRdBTAr3Ac9Ng6q1LIWJdHEUAyNaHoM'
    // });
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
      .pipe(map(data=>{
        return data['artists'].items;
      }));
  }

  getArtista(id:string){
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer BQD5Gis8E9Ea9N4kmgIKdmNurD7LGZwrYt7oB-bpj4iP2864YsSfjRdBTAr3Ac9Ng6q1LIWJdHEUAyNaHoM'
    // });
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(id:string){
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer BQD5Gis8E9Ea9N4kmgIKdmNurD7LGZwrYt7oB-bpj4iP2864YsSfjRdBTAr3Ac9Ng6q1LIWJdHEUAyNaHoM'
    // });
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
      .pipe(map(data => data['tracks']));
  }
}
