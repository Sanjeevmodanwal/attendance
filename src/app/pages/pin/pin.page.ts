import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  public items: Array<{ username: string; }> = [];
  @Input() pagetitle: String = "Enter Pin";

  pin: string = "";

  @Output() change: EventEmitter<string> = new EventEmitter<string>();

  constructor(private http: HttpClient) { }
  ngOnInit() { }
  emitEvent() {
    this.change.emit(this.pin);
    let pin = this.pin;
    alert(this.pin);
  }


  handleInput(pin) {

    this.items.push({ username: pin });
    console.log(this.items.length);
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
    console.log(this.items.length);
  }

  ok(){
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}), };
    this.http.post('http://mtree.in/api/chains/chkp',{"data":this.items},httpOptions).subscribe( (data:any) => {
          console.log(data);
    });
  }




}
