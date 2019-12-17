import { TOpenLinkInitializer } from '../types/TOpenLinkInitializer';

const getDarwinOpenLink: TOpenLinkInitializer = (processSpawn) => (url) => {
  processSpawn('open', [url]);
};

export default getDarwinOpenLink;
