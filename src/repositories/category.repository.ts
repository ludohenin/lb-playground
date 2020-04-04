import {inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  Getter,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {MariaDataSource} from '../datasources';
import {Category, CategoryRelations, Project} from '../models';
import {ProjectRepository} from './project.repository';

export class CategoryRepository extends DefaultCrudRepository<
  Category,
  typeof Category.prototype.id,
  CategoryRelations
> {
  projects: HasManyRepositoryFactory<Project, typeof Category.prototype.id>;

  constructor(
    @inject('datasources.maria') dataSource: MariaDataSource,
    @repository.getter('ProjectRepository')
    projectRepoGetter: Getter<ProjectRepository>,
  ) {
    super(Category, dataSource);

    this.projects = this.createHasManyRepositoryFactoryFor(
      'projects',
      projectRepoGetter,
    );
  }
}
