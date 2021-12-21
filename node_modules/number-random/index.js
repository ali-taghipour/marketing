/**
 * Generate random number in a range
 * @param {number}         min
 * @param {number}         max     [optional]
 * @param {number|boolean} float   [optional] default false
 * @returns {number}
 */
function random(min, max, float) {
  if (min === undefined) {
    return Math.random();
  }

  if (max === undefined) {
    max = min;
    min = 0;
  }

  if (max < min) {
    var tmp = max;
    max = min;
    min = tmp;
  }

  if (float) {
    var result = Math.random() * (max - min) + min;
    if (float === true) {
      return result;
    } else if (typeof float === 'number') {
      var str = result.toString();
      var index = str.indexOf('.');
      str = str.substr(0, index + 1 + float);
      if (str[str.length - 1] === '0') {
        str = str.substr(0, str.length - 1) + random(1, 9);
      }
      return parseFloat(str);
    }
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = random;
