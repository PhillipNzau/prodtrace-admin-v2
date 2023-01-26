/////////////// CROP
import {FarmInterface} from "./farmInterface";

export interface CropResponseInterface {
  count?: number,
  next?: null,
  previous?: null,
  results: CropInterface[]
}

export interface CropInterface {
  id: number,
  name: string,
  created_at?: string,
  updated_at?: string,
}

export interface FarmCropResponseInterface {
  count?: number,
  next?: null,
  previous?: null,
  results: FarmCropInterface[]
}

export interface FarmCropInterface {
  id?: number,
  farm_id: string,
  crop_id: number,
  farm_crop_size: string,
  farm: FarmInterface,
  crop: CropInterface,
  created_at?: string,
  updated_at?: string,
}
