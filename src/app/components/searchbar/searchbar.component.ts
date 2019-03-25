import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
/*
const app = angular.module('searchBarApp', ['ngMaterial']);

app.controller('searchCtrl', function($scope) {
  var ctrl = this;
  ctrl.search = null;
  ctrl.showPreSearchBar = function() {
    return ctrl.search == null;
  };
  ctrl.initiateSearch = function() {
    ctrl.search = '';
  };
  ctrl.showSearchBar = function() {
    return ctrl.search != null
  };
  ctrl.endSearch = function() {
    return ctrl.search = null;
  };
  ctrl.submit = function() {
    console.error('Search function not yet implemented');
  }

  // to focus on input element after it appears
  $scope.$watch(function() {
    return document.querySelector('#search-bar:not(.ng-hide)');
  }, function(){
      document.getElementById('search-input').focus();
  });
});
*/
