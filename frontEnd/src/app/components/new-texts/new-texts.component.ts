import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Angular2Txt } from 'angular2-txt/Angular2-txt';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-texts',
  templateUrl: './new-texts.component.html',
  styleUrls: ['./new-texts.component.css', '../../app.component.css']
})
export class NewTextsComponent implements OnInit {


  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  constructor(
    private storage: AngularFireStorage, 
    private db: AngularFirestore, 
    private _snackBar: MatSnackBar) { }

  isHovering: boolean;
  files: File[] = [];
  maxSize = 20 * (10 ** 6);
  isHasError = {
    size: false,
    format: false
  };
  typeAllowed = ['txt', 'pdf', 'doc', 'docx', 'image'];

  


  ngOnInit() {
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }

  onFileDrop(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    if (file.size > this.maxSize) {
      this.isHasError.size = true;
      this._snackBar.open('Size of the document is too large', '', {
        duration: 2000,
      });
      console.log('this file is too large');
    }
    let type = (file.type.split('/')[0] === 'image') ?
      file.type.split('/')[0] : file.name.split('.');
    if (typeof type === 'object') type = type[type.length - 1];
    if (this.typeAllowed.indexOf(type) !== -1) this.files.push(file);
    else this.isHasError.format = true;

    // if (type in this.typeAllowed)
  }
  
  uploadText(text){
    console.log(text);
    const path = `toTranslate/${Date.now()}_aaaaa.txt`;
    const ref = this.storage.ref(path);
    //let txt = new Angular2Txt(text, 'My Report');
    this.task = this.storage.upload(path, new Angular2Txt(text, 'My Report'));
  
  }

}
