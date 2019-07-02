import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-new-texts',
  templateUrl: './new-texts.component.html',
  styleUrls: ['./new-texts.component.css', '../../app.component.css']
})
export class NewTextsComponent implements OnInit {
  isHovering: boolean;
  files: File[] = [];
  maxSize = 20 * (10 ** 6);
  isHasError = {
    size: false,
    format: false
  };
  typeAllowed = ['txt', 'pdf', 'doc', 'docx', 'image'];

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
    if (file.size > this.maxSize) {
      this.isHasError.size = true;
      console.log('this file is too large');
    }
    let type = (file.type.split('/')[0] === 'image') ?
      file.type.split('/')[0] : file.name.split('.');
    if (typeof type === 'object') type = type[type.length - 1];
    if (this.typeAllowed.indexOf(type) !== -1) this.files.push(file);
    else this.isHasError.format = true;

    // if (type in this.typeAllowed)
  }

}
