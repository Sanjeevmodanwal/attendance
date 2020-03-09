import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.page.html',
  styleUrls: ['./pin.page.scss'],
})
export class PinPage implements OnInit {

show:boolean=false;
one:any;
two:any;
three:any;
four:any;
number:any;
 @Input() pagetitle: String = "Enter Pin";

  pin:string= "";

  @Output() change: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}
ngOnInit(){}
  emitEvent() {
    this.change.emit(this.pin);
	let pin=this.pin;
	alert(this.pin);
  }

  
  handleInput(pin) {
	  let value = this.pin;
	  console.log(value);
	 // var count=[pin]
	 // console.log(count.length);
     // if(count.length==1){
		 // this.one=pin;
	 // }else if(count.length==2){
		  // this.two=pin;
	 // }
  }
   
  
 

}
