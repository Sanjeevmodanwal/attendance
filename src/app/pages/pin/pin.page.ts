import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController,ToastController } from '@ionic/angular';
@Component({
  selector: 'app-pin',
  templateUrl: './pin.page.html',
  styleUrls: ['./pin.page.scss'],
})
export class PinPage implements OnInit {

  show: boolean = false;
  one: any;
  two: any;
  three: any;
  four: any;
  number: any;
  public items: Array<{ emp_id: string; }> = [];
  @Input() pagetitle: String = "Enter Pin";

  pin: string = "";

  @Output() change: EventEmitter<string> = new EventEmitter<string>();

  constructor(private http: HttpClient,public loadingController: LoadingController,private toastCtrl: ToastController) { }
 
  
  ngOnInit() { }
  emitEvent() {
    this.change.emit(this.pin);
    let pin = this.pin;
    // alert(this.pin);
  }
  
 async presentToast(msg,color) {
  const toast = await this.toastCtrl.create({
    message: msg,
    duration: 2000,
    position: 'top',
	color:color
  });
  toast.present();
}
  
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }


  handleInput(pin) {

    this.items.push({ emp_id: pin });
    // console.log(this.items.length);
    if (this.items.length == 1) {
      this.one = pin;
    } else if (this.items.length == 2) {
      this.two = pin;
    }
    else if (this.items.length == 3) {
      this.three = pin;
    }
    else if (this.items.length == 4) {
      this.four = pin;
    }
  }

  clear() {
    if (this.items.length == 1) {
      this.items.pop();
      this.one = "";
    } else if (this.items.length == 2) {
      this.items.pop();
      this.two = "";
    }else if (this.items.length == 3) {
      this.items.pop();
      this.three = "";
    }else if (this.items.length == 4) {
      this.items.pop();
      this.four = "";
    }
    // console.log(this.items.length);
  }

  ok(){
	  this.presentLoading();
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}), };
    this.http.post('http://essglobal.online/ess_crm/response_andr.php?tag=checking',{"data":this.items},httpOptions).subscribe( (data:any) => {
          console.log(data[0]['checkRslt']);
		  
		if(data[0]['checkRslt']==1){
			this.loadingController.dismiss();
			let msg="Successfully Login";
			let color="success";
			this.presentToast(msg,color);
			this.one = "";
			this.two = "";
			this.three = "";
			this.four = "";
		}
		
		if(data[0]['checkRslt']==2){
			this.loadingController.dismiss();
			let msg="You have entered invalid pin.";
			let color="warning";
			this.presentToast(msg,color);
		}
		if(data[0]['checkRslt']==3){
			this.loadingController.dismiss();
			let msg="Successfully Logout";
			let color="success";
			this.presentToast(msg,color);
			this.one = "";
			this.two = "";
			this.three = "";
			this.four = "";
		}
		if(data[0]['checkRslt']==4){
			this.loadingController.dismiss();
			let msg="Successfully Logout";
			let color="success";
			this.presentToast(msg,color);
			this.one = "";
			this.two = "";
			this.three = "";
			this.four = "";
		}
		if(data[0]['checkRslt']==5){
			this.loadingController.dismiss();
			let msg='You are in wrong network zone';
			let color="danger";
			this.presentToast(msg,color);
		}
		if(data[0]['checkRslt']==6){
			this.loadingController.dismiss();
			let msg='Passcode must be of four digits';
			let color="danger";
			this.presentToast(msg,color);
		} 
		  
    });
  }




}
