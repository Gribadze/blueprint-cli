import { TOpenLinkInitializer } from '../types/TOpenLinkInitializer';

const linuxOpenLink: TOpenLinkInitializer = (processSpawn) => (url) => {
  processSpawn('xdg-open', [url]);
};

export default linuxOpenLink;
