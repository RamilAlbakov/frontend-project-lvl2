import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (diff, formatterType) => {
  if (formatterType === 'plain') {
    return plain(diff);
  }
  if (formatterType === 'stylish') {
    return stylish(diff);
  }

  throw new Error('Unknown formatterType');
};

export default formatter;
