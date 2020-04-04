import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Category} from './category.model';
import {User} from './user.model';

@model()
export class Project extends Entity {
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
  })
  name: string;

  @belongsTo(
    () => User,
    {keyTo: 'id', keyFrom: 'userId', name: 'user'},
    {
      type: 'string',
      required: true,
    },
  )
  userId: string;

  @belongsTo(
    () => Category,
    {keyTo: 'name', keyFrom: 'categoryName', name: 'category'},
    {type: 'string', required: true},
  )
  categoryName: string;

  constructor(data?: Partial<Project>) {
    super(data);
  }
}

export interface ProjectsRelations {
  // describe navigational properties here
}

export type ProjectsWithRelations = Project & ProjectsRelations;
