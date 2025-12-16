import {PAGE_LIMIT} from '@env';
const PAGE_LIMIT_NO = Number(PAGE_LIMIT);

export function hasMore(data) {
  return data.list.length === PAGE_LIMIT_NO;
}

export function addMore(data, newData) {
  const currentData = {...data};
  currentData.list = [...currentData.list, ...newData.list];
  return currentData;
}

export function addToMap(map, key, value) {
  const currentMap = {...map};
  currentMap[key] = value || key;
  return currentMap;
}
