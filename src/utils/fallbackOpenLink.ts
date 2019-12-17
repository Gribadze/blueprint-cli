import BlueprintError from '../errors/BlueprintError';
import { TOpenLinkInitializer } from '../types/TOpenLinkInitializer';

class OpenLinkImplementationError extends BlueprintError {
  constructor() {
    super(`openLink is not implemented for platform: ${process.platform}`);
  }
}

const fallbackOpenLink: TOpenLinkInitializer = () => {
  throw new OpenLinkImplementationError();
};

export default fallbackOpenLink;
