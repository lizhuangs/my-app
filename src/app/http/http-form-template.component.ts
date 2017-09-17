/* tslint:disable: member-ordering */
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../providers/HttpService';
import { Logger } from '../providers/Logger';
import { Hero } from '../heroes/hero';
import {
  Http, Response, Headers, RequestOptions, URLSearchParams,
  RequestOptionsArgs, RequestMethod
} from '@angular/http';
import { GlobalData } from '../providers/GlobalData';
@Component({
  selector: 'app-http-form-template',
  templateUrl: './http-form-template.component.html',
  styleUrls: ['../form/forms.css', '../../assets/bower_components/bootstrap/css/bootstrap.min.css']
})
export class HttpFormTemplateComponent implements OnInit {
  hero_url = '/heroes/1';
  power_url = '/powers';
  constructor(
    private http: Http,
    private httpService: HttpService,
    private logger: Logger,
    globalData: GlobalData) {
    this.hero_url = globalData.api_url + this.hero_url;
    this.power_url = globalData.api_url + this.power_url;
  }
  powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];
  hero: Hero = { id: null, name: 'Dr.', alterEgo: 'Dr. What', power: this.powers[0] };
  // hero = { name: 'Dr.', alterEgo: 'Dr. What', power: this.powers[0] };
  param = { name: 'test' };

  ngOnInit(): void {
    this.logger.log('ngOnInit', 'HttpFormTemplateComponent');
    this.httpService.get(this.hero_url)
      .map((response: Response) => {
        this.hero = response.json() as Hero;
        console.log('用户信息:' + JSON.stringify(this.hero));
        return this.hero; // 这里不return后面的subscribe就获取不到了
      }).subscribe(
      data => {
        console.log('用户信息:' + JSON.stringify(data));
      },
      error => {
        console.error(error);
      }
      );
  }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
