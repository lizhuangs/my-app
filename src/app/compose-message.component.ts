import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { slideInDownAnimation } from './animations';

@Component({
  templateUrl: './compose-message.component.html',
  styles: [':host { position: relative; bottom: 10%;left:300px; }'],
  animations: [slideInDownAnimation]
})
export class ComposeMessageComponent {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  details: string;
  sending = false;

  constructor(private router: Router) { }

  send() {
    this.sending = true;
    this.details = 'Sending Message...';

    setTimeout(() => {
      this.sending = false;
      this.closePopup();
    }, 1000);
  }

  cancel() {
    this.closePopup();
  }

  closePopup() {
    // Providing a `null` value to the named outlet
    // clears the contents of the named outlet
    this.router.navigate([{ outlets: { popup: null } }]);
  }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
