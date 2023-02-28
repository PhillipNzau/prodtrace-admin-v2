export interface FarmResponseInterface {
  count?: number;
  next?: null;
  previous?: null;
  results: FarmInterface[];
}

export interface FarmInterface {
  id?: any;
  name: string;
  size: string;
  location: string;
  latitude: number;
  longitude: number;
  user_id: any;
  created_at?: string;
  updated_at?: string;
}
