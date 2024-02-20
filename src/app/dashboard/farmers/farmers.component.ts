import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
// @ts-ignore
import { MarkerClusterGroup } from 'leaflet.markercluster';

import { environment } from '../../../environments/environment';
import { FarmInterface } from '../types/farmInterface';
import { FarmsService } from '../services/farm/farms.service';
import { UsersService } from '../services/user/users.service';
import { FarmCropInterface } from '../types/cropInterface';
import { FarmCropService } from '../services/farm-crop/farm-crop.service';
import { UserInterface } from '../types/userInterface';
import { ChatModel } from '../types/chatInterface';
import { ChatEntityService } from '../services/chat/chat-entity.service';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { PlantCycleService } from '../services/plantCycle/plant-cycle.service';
import { PlantCycleInterface } from '../types/plantCycleInterface';

@Component({
  selector: 'app-farmers',
  templateUrl: './farmers.component.html',
  styleUrls: ['./farmers.component.scss'],
})
export class FarmersComponent implements OnInit {
  farms: any;
  farmName: any;
  farmerName: any;
  farmCrops: any;
  users: any;
  address: any;
  farmers: any;
  sideOpen: boolean = false;
  map: any;
  selectedChatId!: number;
  replyMessage!: string;

  chats: ChatModel | any;
  searchTerm = '';
  uId: any = 'all';
  plantCycles: PlantCycleInterface[] = [];
  selectedFcropIndex: number | undefined;
  icon: any;
  markerCluster: any;

  // fumigation vars
  isFumigation:boolean = false;

  // Reply form
  replyForm = this.fb.group({
    id: ['', Validators.required],
    reply: ['', Validators.required],
    is_message_replied: ['', Validators.required],
  });

  constructor(
    private fb: UntypedFormBuilder,
    private farmsService: FarmsService,
    private farmCropService: FarmCropService,
    private usersService: UsersService,
    private chatService: ChatEntityService,
    private cropCycleService: PlantCycleService
  ) {}

  ngOnInit() {
    this.getAllFarms();
    this.getAllFarmers();
    this.markerCluster = new MarkerClusterGroup();
    this.loadMap();
  }

  // Fumigation function
  toggleFumigation() {
    this.isFumigation =!this.isFumigation;
  }

  //// Get all users
  getAllFarmers() {
    this.usersService.entities$.subscribe({
      next: (data: any) => {
        this.getFilteredUsers();
      },
      error: (error) => {
        console.log('err', error);
      },
    });
  }

  //// Filter plant Cycle
  getPlantCycle(id: any) {
    this.cropCycleService.entities$.subscribe({
      next: (plantCycle: PlantCycleInterface[]) => {
        this.plantCycles = plantCycle.filter(
          (plantCycle: PlantCycleInterface) => plantCycle.farm_crop_id === id
        );
      },
      error: (error: any) => {
        console.error('Error getting plant cycle', error);
      },
    });
  }

  //// Get all farms
  getAllFarms() {
    this.farmsService.entities$.subscribe({
      next: (data: FarmInterface[]) => {
        this.farms = data;
      },
      error: (error) => {
        console.log('err', error);
      },
    });
  }

  //// Get filtered farms
  getUserFarms() {
    this.farmsService.entities$.subscribe({
      next: (data: FarmInterface[]) => {
        this.farms = data.filter((farm: FarmInterface) => {
          return farm.user_id === this.uId;
        });
      },
      error: (error) => {
        console.log('err', error);
      },
    });
  }

  //// Get recent activities
  getRecentActivities(farmCrop: any, i: number) {
    this.getPlantCycle(farmCrop.id);
    this.toggleFumigation();
    this.selectedFcropIndex = i;
  }

  //// Get form controls
  get cf() {
    return this.replyForm!.controls;
  }

  /// Get filtered user
  getFilteredUsers() {
    this.usersService.setFilter(2);
    this.usersService.filteredEntities$.subscribe({
      next: (useR: any) => {
        this.users = useR;
      },
      error: (error) => {
        console.log('fil err', error);
      },
    });
  }

  //// Toggle side bar logic
  toggleSide(user: any, id: any) {
    this.isFumigation = false
    if (!this.sideOpen) {
      this.uId = id;
      this.sideOpen = true;
    } else if (id == this.uId) {
      this.sideOpen = !this.sideOpen;
      this.uId = id;
    } else if (id !== this.uId) {
      this.uId = id;
    }

    this.farmerName = user.first_name + ' ' + user.last_name;

    //// Reset the already populated values
    this.plantCycles = [];
    this.farmName = undefined;
    this.selectedFcropIndex = undefined;

    //// Get farm crops
    this.farmCropService.entities$.subscribe({
      next: (farmCrops: FarmCropInterface[]) => {
        this.farmCrops = farmCrops.filter((farmCrop: FarmCropInterface) => {
          return farmCrop.farm.user_id === id;
        });
      },
      error: (error) => {
        console.log('err', error);
      },
    });

    this.getChats();
    this.getUserFarms();
    this.filterMarkers();

    //// Add the filtered markers on the map
    this.map.addLayer(this.markerCluster);
  }

  ////////////////////**** CHAT FUNCTIONS ****////////////////
  //// Get all the chats
  getChats() {
    this.chatService.entities$.subscribe({
      next: (data: ChatModel[]) => {
        this.chats = data.filter((chat: ChatModel) => {
          return chat.user_id === this.uId;
        });
      },
      error: (error) => {
        console.log('err', error);
      },
    });
  }

  //// Get selected chat
  getSelectedChat(id: number) {
    this.selectedChatId = id;
  }

  //// Reply chat
  replySubmit() {
    const update = {
      id: this.selectedChatId,
      reply: this.cf['reply'].value,
      is_message_replied: true,
    };
    this.chatService.update(update).subscribe({
      next: () => {
        this.replyForm.reset();
      },
      error: (error) => {
        console.log('err', error);
      },
    });
  }

  ////////////////////**** End of chat functions ****////////////////

  /////////////////////**** MAP **** /////////////////////
  private loadMap(): void {
    this.map = L.map('map').setView([0.0236, 37.9062], 6.5);
    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: environment.mapbox.accessToken,
      }
    ).addTo(this.map);

    this.icon = L.icon({
      iconUrl: 'assets/img/map-icon2.png',
      popupAnchor: [13, 0],
    });

    //// Delay marker showing so that farms are populated
    setTimeout(() => {
      this.populateMap();
    }, 500);
  }

  //// Populate map with marker
  populateMap() {
    this.filterMarkers();
    this.map.addLayer(this.markerCluster);
  }

  //// Get all markers
  getAllMarkers() {
    this.uId = 'all';

    if (this.uId === 'all') {
      this.sideOpen = false;
    }

    this.getAllFarms();
    this.populateMap();
  }

  //// Filter markers on map
  filterMarkers() {
    //// Clear the existing marker from map
    this.markerCluster.clearLayers();
    this.farms.forEach((farm: FarmInterface) => {
      const name = farm.name as string;
      const size = farm.size as string;
      const location = farm.location as string;
      const lat = farm.latitude as number;
      const lng = farm.longitude as number;
      const marker = L.marker(new L.LatLng(lat, lng), { icon: this.icon }).on(
        'click',
        () => {
          this.plantCycles = [];

          this.farmCropService.entities$.subscribe({
            next: (farmCrops: FarmCropInterface[]) => {
              this.farmCrops = farmCrops.filter(
                (farmCrop: FarmCropInterface) => {
                  return farmCrop.farm_id === farm.id;
                }
              );
            },
            error: (error) => {
              console.log('err', error);
            },
          });
          this.usersService.entities$.subscribe({
            next: (users: any) => {
              this.farmerName = users.filter((user: UserInterface) => {
                return user.id === farm.user_id;
              });
            },
            error: (error) => {
              console.log('err', error);
            },
          });

          this.farmName = name;
          const farmerName =
            this.farmerName[0].first_name + ' ' + this.farmerName[0].last_name;
          this.farmerName = farmerName;
          // this.sideOpen = !this.sideOpen
        }
      );

      const popup = L.popup({
        closeButton: true,
        autoClose: true,
      }).setContent(`
            <table class="table-fixed my-6">
                <tbody class=" text-[1.4rem] ">

                  <tr>
                    <td class="text-start text-darkGreen font-bold">Farm Name</td>
                    <td class="text-end">${name}</td>
                  </tr>
                  <tr>
                    <td class="text-start text-darkGreen font-bold">Area</td>
                    <td class="text-end">${size}</td>
                  </tr>
                  <tr>
                    <td class="text-start text-darkGreen font-bold">Location</td>
                    <td class="text-end pt__text--limit">${location}</td>
                  </tr>
                </tbody>
            </table>
          `);
      marker.bindPopup(popup);
      this.markerCluster.addLayer(marker);
    });
  }

  /////////////////////**** End of MAP **** /////////////////////
}
