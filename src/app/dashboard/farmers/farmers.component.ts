import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Observable, Subscriber} from 'rxjs';
import * as L from 'leaflet';
// @ts-ignore
import {MarkerClusterGroup} from "leaflet.markercluster";


import {environment} from "../../../environments/environment";
import {FarmInterface} from "../types/farmInterface";
import {FarmsService} from "../services/farm/farms.service";
import {UsersService} from "../services/user/users.service";
import {FarmCropInterface} from "../types/cropInterface";
import {FarmCropService} from "../services/farm-crop/farm-crop.service";
import {UserInterface} from "../types/userInterface";
import {ChatModel} from "../types/chatInterface";
import {ChatEntityService} from "../services/chat/chat-entity.service";
import {UntypedFormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-farmers',
  templateUrl: './farmers.component.html',
  styleUrls: ['./farmers.component.scss']
})
export class FarmersComponent implements OnInit, AfterViewInit {
  farms: any;
  farmName: string = '';
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

  // Reply form
  replyForm = this.fb.group({
    id: ['', Validators.required],
    reply:['', Validators.required],
    is_message_replied:['', Validators.required],
  })

  constructor(
    private fb: UntypedFormBuilder,
    private farmsService: FarmsService,
    private farmCropService: FarmCropService,
    private usersService: UsersService,
    private chatService: ChatEntityService
  ) {
  }

  ngOnInit() {
    this.farmsService.entities$.subscribe({
      next: (data: FarmInterface[]) => {
        this.farms = data
      },
      error: (error) => {
        console.log('err', error)
      }
    });

    this.usersService.entities$.subscribe({
      next: (data: any) => {
        this.getFilteredUsers()
      },
      error: (error) => {
        console.log('err', error)
      }
    });

    this.getChats()
  }

  //// Get form controls
  get cf() {
    return this.replyForm!.controls;
  }

  //// Get all the chats
  getChats() {
    this.chatService.entities$.subscribe({
      next: (data: ChatModel[]) => {
        this.chats = data
      },
      error: (error) => {
        console.log('err', error)
      }
    })
  }

  /// Get filtered user
  getFilteredUsers() {
    this.usersService.setFilter(2)
    this.usersService.filteredEntities$.subscribe({
      next: (useR: any) => {
        this.users = useR
      },
      error: (error) => {
        console.log('fil err', error)
      }
    })
  }

  toggleSide(user: any) {
    this.sideOpen = !this.sideOpen;
    this.farmerName = user.first_name + ' ' + user.last_name;
    console.log(this.farmerName)
  }


  /////////////////////**** MAP **** /////////////////////
  public ngAfterViewInit() {
    this.loadMap()
  }

  private loadMap(): void {
    this.map = L.map('map').setView([0.0236, 37.9062], 8);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: environment.mapbox.accessToken,
    }).addTo(this.map);

    const icon = L.icon({
      iconUrl: 'assets/img/marker-icon.png',
      popupAnchor: [13, 0],
    });

    const delay = (ms: number | undefined) => new Promise(res => setTimeout(res, ms));
    const waitForFarms = async () => {
      await delay(2000);
      this.address = this.farms
      const markerCluster = new MarkerClusterGroup();
      for (let i = 0; i < this.address.length; i++) {
        const name = this.address[i].name as string;
        const size = this.address[i].size as string;
        const location = this.address[i].location as string;
        const lat = this.address[i].latitude as number;
        const lng = this.address[i].longitude as number;
        const marker = L.marker(new L.LatLng(lat, lng), {icon: icon})
          .on('click',
            () =>{
              this.farmCropService.entities$.subscribe({
                next:(farmCrops:FarmCropInterface[]) => {
                  this.farmCrops = farmCrops.filter((farmCrop:FarmCropInterface) => {
                    return farmCrop.farm_id === this.address[i].id
                  });
                },
                error: (error) => {
                  console.log('err', error)
                }
              });
              this.usersService.entities$.subscribe({
                next:(users: any) => {
                  this.farmerName = users.filter((user: UserInterface) =>{
                    return user.id === this.address[i].user_id
                  });
                },
                error: (error) => {
                  console.log('err', error)
                }
              })

              this.farmName = name;
              const farmerName = this.farmerName[0].first_name + ' ' + this.farmerName[0].last_name;
              this.farmerName = farmerName;
              // this.sideOpen = !this.sideOpen
            });
        const popup = L.popup({
          closeButton: true,
          autoClose: true
        })
          .setContent(`
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
          `)
        marker.bindPopup(popup);
        markerCluster.addLayer(marker);
      }
      this.map.addLayer(markerCluster);

      await delay(2000);
    };
    if (this.address === undefined) {
      waitForFarms().then(r => {})
    }




    // this.getCurrentPosition()
    //   .subscribe((position: any) => {
    //     this.map.flyTo([position.latitude, position.longitude], 13);
    //
    //     const icon = L.icon({
    //       iconUrl: 'assets/img/marker-icon.png',
    //       popupAnchor: [13, 0],
    //     });
    //
    //     const popup = L.popup({
    //       closeButton: true,
    //       autoClose: true
    //     })
    //       .setContent(`
    //         <table class="table-fixed my-6">
    //             <tbody class=" text-[1.4rem] ">
    //               <tr>
    //                 <td class="text-start text-darkGreen font-bold">Crops</td>
    //                 <td class="text-end">Beans & Avocado</td>
    //               </tr>
    //               <tr>
    //                 <td class="text-start text-darkGreen font-bold">Farm Name</td>
    //                 <td class="text-end">Kilgoris Farm</td>
    //               </tr>
    //               <tr>
    //                 <td class="text-start text-darkGreen font-bold">Area</td>
    //                 <td class="text-end">700sq</td>
    //               </tr>
    //               <tr>
    //                 <td class="text-start text-darkGreen font-bold">Location</td>
    //                 <td class="text-end">Narok County, Kenya</td>
    //               </tr>
    //             </tbody>
    //         </table>
    //       `)
    //
    //     const marker = L.marker([position.latitude, position.longitude], {icon}).bindPopup(popup);
    //
    //     marker.addTo(this.map);
    //   });
  }
  /////////////////////**** End of MAP **** /////////////////////

  getSelectedChat(id: number) {
    this.selectedChatId = id;
  }
  replySubmit() {
    const update = {
      id: this.selectedChatId,
      reply: this.cf['reply'].value,
      is_message_replied: true
    }
    this.chatService.update(update).subscribe({
      next: () => {
        this.replyForm.reset();
      },
      error: (error) => {
        console.log('err', error)
      }
    })

  }


}
