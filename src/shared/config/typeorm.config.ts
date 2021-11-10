import { ConnectionOptions } from 'typeorm';
import { DatabaseConfig } from './database.config';
import * as dotenv from 'dotenv';

dotenv.config(); // very very important!!
const typeormConfig = DatabaseConfig() as ConnectionOptions;
export default typeormConfig;