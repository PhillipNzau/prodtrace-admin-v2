export interface FarmResponseInterface {
  count?: number,
  next?: null,
  previous?: null,
  results: FarmInterface[]
}

export interface FarmInterface {
    id?: number,
    name: string,
    size: string,
    location: string,
    latitude?: number,
    longitude?: number,
    user_id: number,
    created_at?: string,
    updated_at?: string,
}
