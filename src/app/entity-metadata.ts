import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Farms: {},
  Crop: {},
  FarmCrop: {},
  Users: {
    filterFn: (entities: {user_type_id: number}[], searchTerm: number) => {
      return entities.filter(entity => entity.user_type_id == searchTerm);
    }
  },
  PlantCycle: {},
  Chat: {},
};

const pluralNames = {  };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
