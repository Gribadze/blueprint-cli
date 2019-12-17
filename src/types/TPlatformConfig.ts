import Platform = NodeJS.Platform;

export type TPlatformConfig<T> = {
  [platform in Platform]: T;
};
