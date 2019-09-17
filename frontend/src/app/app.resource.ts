import {
  IResourceActionInner,
  ResourceCRUDPromise,
  ResourceHandler,
  ResourceModel,
  ResourceParams
} from '@ngx-resource/core';
import {environment} from '../environments/environment';

export interface ICar {
  id: number;
  color: string;
  manufacturer: any;
  model: string;
  year: number;
}

export interface ICarQuery {
  unassigned: boolean;
}

export interface IGarage {
  id: number;
  title: string;
  cars: ICar[];
}


@ResourceParams({
  // IResourceParams
  pathPrefix: environment.apiEndPoint + '/cars'
})
export class CarResource extends ResourceCRUDPromise<ICarQuery, Car, Car> {

  constructor(restHandler: ResourceHandler) {
    super(restHandler);
  }

  $resultFactory(data: any, options: IResourceActionInner = {}): any {
    return new Car(data);
  }

  getCookie(name: string): string {
    const nameLenPlus = (name.length + 1);
    return document.cookie
      .split(';')
      .map(c => c.trim())
      .filter(cookie => {
        return cookie.substring(0, nameLenPlus) === `${name}=`;
      })
      .map(cookie => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0] || '';
  }

  $getHeaders() {
    const token = this.getCookie('csrftoken');
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRFToken': token
    };
    return headers;
  }
}

export class Car extends ResourceModel implements ICar {

  readonly $resource = CarResource;

  id: number;
  color: string;
  manufacturer: any;
  model: string;
  year: number;
  garage: number;

  constructor(data?: ICar) {
    super();
    if (data) {
      this.$setData(data);
    }
  }

  $setData(data: ICar): this {
    Object.assign(this, data);
    return this;
  }
}


@ResourceParams({
  // IResourceParams
  pathPrefix: environment.apiEndPoint + '/garages'
})
export class GarageResource extends ResourceCRUDPromise<IGarage[], Garage, Garage> {

  constructor(restHandler: ResourceHandler) {
    super(restHandler);
  }

  $resultFactory(data: any, options: IResourceActionInner = {}): any {
    return new Garage(data);
  }


  getCookie(name: string): string {
    const nameLenPlus = (name.length + 1);
    return document.cookie
      .split(';')
      .map(c => c.trim())
      .filter(cookie => {
        return cookie.substring(0, nameLenPlus) === `${name}=`;
      })
      .map(cookie => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0] || '';
  }

  $getHeaders() {
    const token = this.getCookie('csrftoken');
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRFToken': token
    };
    return headers;
  }
}

export class Garage extends ResourceModel implements IGarage {

  readonly $resource = GarageResource;

  id: number;
  title: string;
  cars: ICar[];

  constructor(data?: IGarage) {
    super();
    if (data) {
      this.$setData(data);
    }
  }

  $setData(data: IGarage): this {
    Object.assign(this, data);
    return this;
  }
}
