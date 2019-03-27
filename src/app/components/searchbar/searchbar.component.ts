import { Component, OnInit } from '@angular/core';
import { DataSharingService } from 'src/app/services/datasharing.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  searchInput = '';
  message: string;

  customOptions: any = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay: true,
    navSpeed: 600,
    navText: [''],
    responsive: {
      0: {
        items: 1
      } ,
      200: {
        items: 1
      },
      400: {
        items: 1
      },
      600: {
        items: 1
      }
    },
    nav: false
  };

  searchProducts() {
    console.log(this.searchInput);
    this.data.changeMessage(this.searchInput);
  }

  newMessage(categoria: string) {
    this.data.changeMessage(categoria);
  }

  constructor(
    private data: DataSharingService
  ) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
  }
}
