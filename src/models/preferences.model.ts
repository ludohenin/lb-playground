import {Model, model, property} from '@loopback/repository';

@model()
export class Preferences extends Model {
  @property({
    type: 'string',
    required: true,
  })
  language: string;

  constructor(data?: Partial<Preferences>) {
    super(data);
  }
}

export interface PreferenceRelations {
  // describe navigational properties here
}

export type PreferenceWithRelations = Preferences & PreferenceRelations;
