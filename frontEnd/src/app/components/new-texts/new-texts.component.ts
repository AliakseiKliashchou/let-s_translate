import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-new-texts',
  templateUrl: './new-texts.component.html',
  styleUrls: ['./new-texts.component.css', '../../app.component.css']
})
export class NewTextsComponent implements OnInit {
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
  }

}
