import {Entity, hasMany, model, property} from '@loopback/repository';
import {Project} from './project.model';

@model()
export class Category extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    defaultFn: 'uuid',
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    id: true,
  })
  name: string;

  @hasMany(() => Project, {keyTo: 'name'})
  projects: Project[];

  constructor(data?: Partial<Category>) {
    super(data);
  }
}

export interface CategoryRelations {
  // describe navigational properties here
}

export type CategoryWithRelations = Category & CategoryRelations;
