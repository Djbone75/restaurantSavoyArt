import { Component, OnInit } from '@angular/core';

import { Gallery } from 'src/models/gallery.model';
import { Subscription } from 'rxjs';

import { GalleryService } from '../gallery.service';
@Component({
  selector: 'app-galleryList',
  templateUrl: './galleryList.component.html',
  styleUrls: ['./galleryList.component.scss'],
})
export class GalleryListComponent implements OnInit {
  private gallerySub?: Subscription;
  updatedGallery: Gallery[] = [];
  image1 = '';

  constructor(private galleryService: GalleryService) {}
  ngOnInit(): void {
    this.galleryService.getGalleries();
    this.gallerySub = this.galleryService
      .getGallerySub()
      .subscribe((galleries) => {
        this.updatedGallery = galleries.gallery;
      });
  }
}
