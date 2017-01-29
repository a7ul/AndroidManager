import fileMap from './icons/map.json';
import path from 'path';

const loadedMap = {};

const getResource = (extension) => {
  const iconName = fileMap[extension] || '';
  let resource = {};
  try {
    resource = loadedMap[iconName] || require(`./icons/svg/${iconName}.svg`);
  } catch (err) {
    resource = require(`./icons/svg/unknown.svg`);
  }
  loadedMap[iconName] = resource;
  return resource;
};

const getIcon = (f) => {
  switch (f.type) {
    case 'FILE':
      {
        return getResource(path.extname(f.name));

      }
    case 'DIRECTORY':
      {
        return getResource('.folder')
      }
    case 'SYMLINK':
      {
        return getResource('.symlink')
      }
    default:
      {
        return getResource('');
      }
  }
};

module.exports = {
  getIcon
};
