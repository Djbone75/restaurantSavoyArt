import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GalleryService } from '../gallery.service';
import { Gallery } from 'src/models/gallery.model';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-galleryUpdate',
  templateUrl: './galleryUpdate.component.html',
  styleUrls: ['./galleryUpdate.component.scss'],
})
export class GalleryUpdateComponent implements OnInit {
  fileName: String = '';
  file?: File;
  private gallerySub?: Subscription;
  updatedGallery: Gallery[] = [];
  pageNumber = 1;
  previousPageNumber = 0;
  pageSize = 10;
  imagePreview?: string;
  form: FormGroup = new FormGroup({
    title: new FormControl('titre', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(24),
      ],
    }),
    content: new FormControl('contenu', {
      validators: [Validators.maxLength(100)],
    }),
    image: new FormControl(null, {}),
  });
  onSavePost() {
    if (this.form.invalid) {
      return;
    }

    if (this.form.value) {
      if (this.file) {
        this.galleryService.addGallery(
          this.form.value.title,
          this.form.value.content,
          this.file
        );
        this.snackBar.open('image enregistrée', '', { duration: 1000 });
      }
    }
  }
  onImageSelected(event: any) {
    this.file = <File>event.target.files[0];
    if (this.file) {
      this.fileName = this.file.name;

      this.form.get('image')?.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = reader.result as string;
        let mime = this.imagePreview.split(';')[0].split(':')[1];
        if (
          [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/gif',
            'image/svg+xml',
          ].includes(mime)
        ) {
        } else {
          return alert("ce type de fichier n'est pas autorisé");
        }
      };
      reader.readAsDataURL(this.file);
    }
  }
  handlePageEvent(page: PageEvent) {
    this.pageNumber = page.pageIndex + 1;
    console.log(page);
  }
  deleteHandle(id: string) {
    this.galleryService.deleteGallery(id).subscribe((message) => {
      this.snackBar.open('image effacée', '', { duration: 1000 });
      this.galleryService.getGalleries();
    });
  }
  constructor(
    private http: HttpClient,
    private galleryService: GalleryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.galleryService.getGalleries();
    this.gallerySub = this.galleryService
      .getGallerySub()
      .subscribe((galleries) => {
        this.updatedGallery = galleries.gallery;
      });
  }
}
