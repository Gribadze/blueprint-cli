import { TOpenLinkInitializer } from './types';

const linuxOpenLink: TOpenLinkInitializer = (processSpawn) => (url) => {
  processSpawn('xdg-open', [url]);
};

export default linuxOpenLink;
