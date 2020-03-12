import { Moment } from 'moment';
import configuration from '../configuration.json';
import sessionStorage from './sessionStorage';

export interface Storage {
  getCode: () => string | undefined;
  getToken: () => string | undefined;
  getRefreshDate: () => Moment | undefined;

  setCode: (code: string) => void;
  setToken: (token: string, expires_in: number) => void;
}

const getImports = async () => {
  const storages = [{ name: 'sessionStorage', value: sessionStorage }];
  return storages;
};

export const getStorage: () => Promise<Storage | undefined> = async () => {
  const goodImport = (await getImports()).find(
    (p) => p.name === configuration.store
  );
  return goodImport?.value;
};
