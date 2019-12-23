import { TOpenLinkInitializer } from './types';

const getDarwinOpenLink: TOpenLinkInitializer = (processSpawn) => (url) => {
  processSpawn('open', [url]);
};

export default getDarwinOpenLink;
