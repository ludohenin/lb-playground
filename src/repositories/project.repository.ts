import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
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
    private categoryRepoGetter: Getter<CategoryRepository>,
    @repository.getter('UserRepository')
    private userRepoGetter: Getter<UserRepository>,
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

  async create(project: Partial<Project>): Promise<Project> {
    await this.integrityCheck(project);
    return super.create(project);
  }

  private async integrityCheck(project: Partial<Project>): Promise<void> {
    // https://github.com/strongloop/loopback-next/issues/1718

    try {
      const userRepo = await this.userRepoGetter();
      await userRepo.findById(project.userId);
    } catch (err) {
      if (err.statusCode === 404)
        throw new HttpErrors.UnprocessableEntity(
          'Provided user id does not exist',
        );
      else throw err;
    }

    const categoryRepo = await this.categoryRepoGetter();
    const category = await categoryRepo.findOne({
      where: {name: project.categoryName},
    });
    if (!category)
      throw new HttpErrors.UnprocessableEntity(
        'Provided category name does not exist',
      );
  }
}
