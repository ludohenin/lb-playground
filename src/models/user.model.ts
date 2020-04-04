import {Entity, hasMany, model, property} from '@loopback/repository';
import {Preferences} from './preferences.model';
import {Project} from './project.model';

@model()
export class User extends Entity {
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

  @property({
    type: Preferences,
    required: false,
  })
  preferences?: Preferences;

  @hasMany(() => Project)
  projects: Project[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
