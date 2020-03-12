import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
// import { Storage } from '@ionic/storage';
import { LoadingController,AlertController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string;
  password: string;
  api:any;
  constructor(
    private http: HttpClient, 
    private router: Router, 
    // private storage: Storage, 
    public loadingController: LoadingController,
    public alertController: AlertController) { 
      this.api="http://localhost/api/login.php?tag=getLogin";
    }

  ngOnInit() {

  }

  async LoginAlert(msg) {
    const alert = await this.alertController.create({
      message:msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      duration: 3000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      id:'login'
    });
    return await loading.present();
    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  login() {
    this.presentLoadingWithOptions();
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), };   
    this.http.post(this.api, { "username": this.username, "password": this.password }, httpOptions).subscribe((data: any) => {
      console.log(data);
      if (data['0']['checkRslt'] == 1) {
        this.loadingController.dismiss('login');
        // this.storage.set('user', data.user);
        this.router.navigate(['/register']);
      } else {
        let msg='wrong';
        this.LoginAlert(msg);
      }
    });
  }

  registerModal(){
    this.router.navigate(['/register/']); 
  }
  forget(){
    this.router.navigate(['/forget-password/']); 
  }
}