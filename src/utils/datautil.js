
export function chuckArray(inputArray, perChunk) {
  const result = inputArray.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perChunk)

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // start a new chunk
    }

    resultArray[chunkIndex].push(item)

    return resultArray
  }, []);
  return result;
}
function generateKeySequence(array) {
  let end = "";
  let key = "";
  for (const [i, k] of array.entries()) {
    key += key == "" ? k : `(${k}`;
    end += i == array.length - 1 ? "" : ")";
  }
  let result = key + end;
  if (result === "") result = "KC.NO";
  return result;
}
export function buildString(allKeys) {
  let str = "[\n\t";
  var tempkeys = allKeys.map((key) => {
    return { name: key.name, keys: generateKeySequence(key.keys) };
  });
  for (const [i, k] of tempkeys.entries()) {
    str += i % 4 === 0 && i !== 0 ? "\n\t" : "";
    // str += i % 4 === 0 && i !== 0 ? "\n\n" : "";
    str += `{"name":"${k.name}", "keys":${k.keys}}`;
    str += i === tempkeys.length - 1 ? "" : ",";
  }
  str += "\n]";
  return str;
}
