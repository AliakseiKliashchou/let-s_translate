import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.css', '../../app.component.css']
})
export class UploadTaskComponent implements OnInit {
  @Input() file: File;
@Output () downloadURLonDrop: EventEmitter<any> = new EventEmitter();
  task: AngularFireUploadTask;
  downloadURL: string;
  percentage: Observable<number>;
  snapshot: Observable<any>;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.startUpload();
  }

  startUpload() {
    const path = `toTranslate/${Date.now()}_${this.file.name}`;
    const ref = this.storage.ref(path);
    this.task = this.storage.upload(path, this.file);
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      finalize(async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise();

        this.db.collection('files').add({downloadURL: this.downloadURL, path});
        this._snackBar.open('The document was successfully uploaded', '', {
          duration: 2000,
        });
        this.downloadURLonDrop.emit(this.downloadURL);
      })
    );
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }


}
