import {ApplicationConfig} from '@loopback/core';
import {LbPlaygroundApplication} from './application';

export {LbPlaygroundApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new LbPlaygroundApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
