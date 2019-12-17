export type TProcessSpawn = (command: string, args: readonly string[]) => any;

export type TOpenLink = (url: string) => void;

export type TOpenLinkInitializer = (processSpawn: TProcessSpawn) => TOpenLink;
