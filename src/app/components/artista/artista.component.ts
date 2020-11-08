import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: [
  ]
})
export class ArtistaComponent implements OnInit {
  artista:any = {

  };
  topTracks:any[] = [];
  loadingArtist:boolean;
  constructor(
    private route:ActivatedRoute,
    private spotiService:SpotifyService
    ) {
      this.loadingArtist = true;
    this.route.params.subscribe(params=>{
      console.log(params['id']);
      this.getArtista(params['id']);
      this.getTopTracks(params['id']);
    });
   }

  ngOnInit(): void {
  }

  getArtista(id:string){
    this.loadingArtist = true;
    this.spotiService.getArtista(id)
      .subscribe(artista=>{
        console.log(artista);
        this.artista = artista;
        this.loadingArtist = false;
      });
  }

  getTopTracks(id:string){
    this.spotiService.getTopTracks(id)
      .subscribe(topTracks => {
        console.log(topTracks);
        this.topTracks = topTracks;
      });
  }

}
