import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Gallery } from 'src/models/gallery.model';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/gallery/';
@Injectable({ providedIn: 'root' })
export class GalleryService {
  private Updatedgallery: Gallery[] = [];
  private galleriesSub = new Subject<{ gallery: Gallery[] }>();

  constructor(private http: HttpClient, private router: Router) {}

  getGalleries() {
    this.http
      .get<{ galleries: Gallery[] }>(BACKEND_URL)
      .pipe(
        map((galleryData) => {
          return {
            galleries: galleryData.galleries.map((gallery) => {
              return {
                title: gallery.title,
                content: gallery.content,
                id: gallery.id,
                path: gallery.path,
              };
            }),
          };
        })
      )
      .subscribe((transformedGalleryData) => {
        this.Updatedgallery = transformedGalleryData.galleries;

        this.galleriesSub.next({ gallery: this.Updatedgallery });
      });
  }

  getGallerySub() {
    return this.galleriesSub.asObservable();
  }
  getUpdatedGallery() {
    return this.Updatedgallery;
  }
  getGallery(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      path: string;
      creator: string;
    }>(BACKEND_URL + id);
  }

  addGallery(title: string, content: string, image: File) {
    const galleryData = new FormData();
    galleryData.append('title', title);
    galleryData.append('content', content);
    galleryData.append('image', image);
    this.http
      .post<{ message: string; gallery: Gallery }>(BACKEND_URL, galleryData)
      .subscribe((responseData) => {
        this.Updatedgallery = [...this.Updatedgallery, responseData.gallery];
        this.galleriesSub.next({ gallery: this.Updatedgallery });
        this.router.navigate(['/']);
      });
  }

  deleteGallery(galleryId: string) {
    return this.http.delete(BACKEND_URL + galleryId);
  }
}
