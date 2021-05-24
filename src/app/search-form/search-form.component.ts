import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  searchTerm: string = "";

  @Output() passTerm = new EventEmitter<string>();

  constructor() { }

  passSearchTerm() {
    this.passTerm.emit(this.searchTerm)
    this.searchTerm = ""
  }

  ngOnInit(): void {
  }

}
