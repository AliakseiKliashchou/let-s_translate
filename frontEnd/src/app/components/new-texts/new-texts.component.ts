
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Angular2Txt } from 'angular2-txt/Angular2-txt';


import {Component, OnInit} from '@angular/core';


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

  constructor(private storage: AngularFireStorage, private db: AngularFirestore,) { }

  isHovering: boolean;
  files: File[] = [];

  constructor() {
  }


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
    this.files.push(file);
  }
  
  uploadText(text){
    console.log(text);
    const path = `toTranslate/${Date.now()}_aaaaa.txt`;
    const ref = this.storage.ref(path);
    new Angular2Txt(text, 'My Report');
  }

}
