import { Injectable } from '@angular/core';


function windowRef(): any {
  return window;
}

@Injectable()
export class BrowserService {

  constructor() { }

  window(): any {
    return windowRef();
  }

}
