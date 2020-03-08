import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  password:any;
  constructor(private activatedRoute: ActivatedRoute,private http: HttpClient) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
  sub(){
	 let pass=this.password;
	 // this.http.get('http://localhost/api/api.php?tag=users').subscribe(data => {
		 // console.log(data);
	 // });
	 
	 let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), };
    this.http.post('http://localhost/api/api.php?tag=otp',{"otp":pass},httpOptions).subscribe((data: any) => {
       console.log(data);
    });
  }

}
