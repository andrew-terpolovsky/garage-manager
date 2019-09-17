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
