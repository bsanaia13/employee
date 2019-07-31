import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  SERVER_URL = 'http://127.0.0.1:5000/upload';
  uploadForm: FormGroup;
  fileName = 'Upload From Excel File... Choose file';

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private cd: ChangeDetectorRef, private router: Router) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
      this.fileName = file.name;
      this.cd.markForCheck();
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);

    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    this.uploadForm.reset();
    this.cd.markForCheck();
    this.router.navigate(['/employees']);
  }
}
