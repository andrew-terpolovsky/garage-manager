import {Component} from '@angular/core';
import {Car, CarResource, Garage, GarageResource, ICar, IGarage} from './app.resource';
import {ManageCarDialogComponent, ManageGarageDialogComponent} from './dialogs/dialogs.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  garages: IGarage[];
  garageIndex: number;
  garage: IGarage;
  cars: ICar[];
  unassignedCars: ICar[];

  constructor(
    public dialog: MatDialog,
    private garageResource: GarageResource,
    private carResource: CarResource,
  ) {
    this.cars = [];
    this.unassignedCars = [];

    this.loadData();
  }

  loadData() {
    this.garageResource.query().then((res: IGarage[]) => {
      this.garages = res;
    });

    this.carResource.query({unassigned: true}).then((res) => {
      this.unassignedCars = res;
      this.selectUnassigned();
    });
  }

  selectUnassigned() {
    this.cars = this.unassignedCars;
    this.garageIndex = undefined;
  }

  selectGarage(index) {
    this.garageIndex = index;
    this.cars = this.garages[this.garageIndex].cars;
  }

  addGarage() {
    this.manageGarage(new Garage(), null);
  }

  manageGarage(garage, $event) {
    if ($event) {
      $event.stopPropagation();
    }

    const dialogRef = this.dialog.open(ManageGarageDialogComponent, {
      width: '400px',
      data: {garage}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.garages.map(item => item.id).indexOf(result.id);
        if (index === -1) {
          this.garages.push(result);
        } else {
          this.garages[index] = result;
        }
      }
    });
  }

  addCar() {
    const car = new Car();
    car.manufacturer = {};
    this.manageCar(car);
  }

  manageCar(car) {
    const dialogRef = this.dialog.open(ManageCarDialogComponent, {
      width: '400px',
      data: {car, garages: this.garages}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let cars;
        if (result.garage) {
          const index = this.garages.map(item => item.id).indexOf(result.garage);
          if (index !== -1) {
            this.selectGarage(index);
          }
          cars = this.garages[index].cars;
        } else {
          cars = this.unassignedCars;
        }
        const index = cars.map(item => item.id).indexOf(result.id);
        if (index === -1) {
          cars.push(result);
        } else {
          cars[index] = result;
        }
      }
    });
  }

  deleteCar(car) {
    car = new Car(car);
    const id = car.id;
    console.log(car);
    car.$remove().$promise.then((res) => {
      if (typeof this.garageIndex === 'undefined') {
        const index = this.unassignedCars.map(item => item.id).indexOf(id);
        this.unassignedCars.splice(index, 1);
      } else {
        const index = this.garages[this.garageIndex].cars.map(item => item.id).indexOf(id);
        this.garages[this.garageIndex].cars.splice(index, 1)
      }
    });
  }

  deleteGarage(car, $event) {
    if ($event) {
      $event.stopPropagation();
    }

    car.$delete();
  }
}

