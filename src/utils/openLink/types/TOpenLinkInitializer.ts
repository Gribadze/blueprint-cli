import { TOpenLink } from './TOpenLink';
import { TProcessSpawn } from './TProcessSpawn';

export type TOpenLinkInitializer = (processSpawn: TProcessSpawn) => TOpenLink;
