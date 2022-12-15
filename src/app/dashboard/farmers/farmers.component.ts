import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import * as L from 'leaflet';
import {environment} from "../../../environments/environment";
@Component({
  selector: 'app-farmers',
  templateUrl: './farmers.component.html',
  styleUrls: ['./farmers.component.scss']
})
export class FarmersComponent implements OnInit, AfterViewInit{
  farms = [1,2,3,4,5,6,7,8,9,10,11,25,5,5,5,55];
  map: any;
  constructor() {
  }

  ngOnInit() {
  }

  /////////////////////**** MAP **** /////////////////////
  public ngAfterViewInit() {
    this.loadMap()
  }

  private getCurrentPosition(): any {
    return new Observable((observer: Subscriber<any>) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: any) => {
          observer.next({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          observer.complete();
        });
      } else {
        observer.error();
      }
    });
  }

  private loadMap(): void {
    this.map = L.map('map').setView([0, 0], 1);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: environment.mapbox.accessToken,
    }).addTo(this.map);

    this.getCurrentPosition()
      .subscribe((position: any) => {
        this.map.flyTo([position.latitude, position.longitude], 13);

        const icon = L.icon({
          iconUrl: 'assets/img/marker-icon.png',
          popupAnchor: [13, 0],
        });

        const popup = L.popup({
          closeButton: true,
          autoClose: true
        })
          .setContent(`
            <table class="table-fixed my-6">
                <tbody class=" text-[1.4rem] ">
                  <tr>
                    <td class="text-start text-darkGreen font-bold">Crops</td>
                    <td class="text-end">Beans & Avocado</td>
                  </tr>
                  <tr>
                    <td class="text-start text-darkGreen font-bold">Farm Name</td>
                    <td class="text-end">Kilgoris Farm</td>
                  </tr>
                  <tr>
                    <td class="text-start text-darkGreen font-bold">Area</td>
                    <td class="text-end">700sq</td>
                  </tr>
                  <tr>
                    <td class="text-start text-darkGreen font-bold">Location</td>
                    <td class="text-end">Narok County, Kenya</td>
                  </tr>
                </tbody>
            </table>
          `)

        const marker = L.marker([position.latitude, position.longitude], { icon }).bindPopup(popup);

        marker.addTo(this.map);
      });
  }
}
