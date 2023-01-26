import {UserInterface} from "../../../auth/types/userModel";

export interface PlantCycleResponseInterface {
  count?: number,
  next?: null,
  previous?: null,
  results: PlantCycleInterface[]
}

export interface PlantCycleInterface {
  id?: number,
  plant_cycle_stage_id: number,
  plant_cycle_stage?: string,
  activity_type_id: number,
  activity_type?: string,
  description?: string,
  spay_justification?: null,
  trade_name?: null,
  farm_crop_id?: number,
  active_ingredient?: null,
  images?: [],
  created_by?: number,
  created_at?: string,
  updated_at?: string,
}

export interface QrDataInterface {
  id?: number,
  plant_cycle_stage_id: number,
  plant_cycle_stage?: string,
  activity_type_id: number,
  activity_type?: string,
  description?: string,
  spay_justification?: null,
  trade_name?: null,
  active_ingredient?: null,
  images?: [],
  created_at?: string,
  updated_at?: string,
  created_by: UserInterface,
  farm_crop_id: QrFarmInterface,
}

export interface QrFarmInterface {
  id?: number,
  farm_crop_size: number,
  farm_id: {
    id?: number,
    name: string,
    size: number,
    location: string,
    latitude?: number,
    longitude?: number,
    user_id: number,
  },
  crop_id: {
    id?: number,
    name: string,
  }
}
