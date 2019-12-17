import * as childProcess from 'child_process';
import { TOpenLink, TOpenLinkInitializer, TProcessSpawn } from '../types/TOpenLinkInitializer';
import { TPlatformConfig } from '../types/TPlatformConfig';
import getDarwinOpenLink from './darwinOpenLink';
import fallbackOpenLink from './fallbackOpenLink';
import linuxOpenLink from './linuxOpenLink';

const platformConfig: TPlatformConfig<TOpenLinkInitializer> = {
  aix: fallbackOpenLink,
  android: fallbackOpenLink,
  cygwin: fallbackOpenLink,
  darwin: getDarwinOpenLink,
  freebsd: fallbackOpenLink,
  linux: linuxOpenLink,
  openbsd: fallbackOpenLink,
  sunos: fallbackOpenLink,
  win32: fallbackOpenLink,
};

const openLink: TOpenLink = platformConfig[process.platform](childProcess.spawn as TProcessSpawn);

export default openLink;
