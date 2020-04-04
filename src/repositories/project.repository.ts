import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {MariaDataSource} from '../datasources';
import {Category, Project, ProjectsRelations, User} from '../models';
import {CategoryRepository} from './category.repository';
import {UserRepository} from './user.repository';

export class ProjectRepository extends DefaultCrudRepository<
  Project,
  typeof Project.prototype.id,
  ProjectsRelations
> {
  category: BelongsToAccessor<Category, typeof Project.prototype.id>;
  user: BelongsToAccessor<User, typeof Project.prototype.id>;

  constructor(
    @inject('datasources.maria') dataSource: MariaDataSource,
    @repository.getter('CategoryRepository')
    categoryRepoGetter: Getter<CategoryRepository>,
    @repository.getter('UserRepository')
    userRepoGetter: Getter<UserRepository>,
  ) {
    super(Project, dataSource);

    this.category = this.createBelongsToAccessorFor(
      'category',
      categoryRepoGetter,
    );

    this.user = this.createBelongsToAccessorFor('user', userRepoGetter);

    this.registerInclusionResolver('category', this.category.inclusionResolver);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
