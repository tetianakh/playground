class CityObject {
  constructor (name, buildYear) {
    this.name = name;
    this.buildYear= buildYear;
  }

  getAge () {
    const now = new Date().getFullYear();
    return now - this.buildYear;
  }
}

class Park extends CityObject {
  constructor(name, buildYear, numTrees, area) {
    super(name, buildYear);
    this.numTrees = numTrees;
    this.area = area;
  }
  getTreeDensity () {
    return this.numTrees/this.area;
  }
}

class Street extends CityObject {
  constructor (name, buildYear, length, size='normal') {
    super(name, buildYear);
    this.length = length;
    this.size = size;
  }
}

const sum = (...items) => {
  let result = 0;
  for (const item of items){
    result += item;
  }

  console.log(result);
  return result;
}

const getAverageAge = (...items) => {
  const ages = items.map(item => item.getAge());
  return sum(...ages)/items.length;
}

parks = [
  new Park('park1', 1986, 345, 17),
  new Park('park2', 2006, 450, 30),
  new Park('park3', 1918, 1500, 90),
];

streets = [
  new Park('street1', 1996, 45, 17, 'big'),
  new Park('street2', 2001, 40, 30, 'big'),
  new Park('street3', 1948, 15, 100),
  new Park('street4', 1981, 10, 100, 'tiny'),
];

console.log(`Our ${parks.length} parks have an average age of ${getAverageAge(...parks)} years.`);

for (const park of parks) {
  console.log(`${park.name} has a tree density of ${park.getTreeDensity()} trees per square km.`);
  if (park.numTrees > 1000) {
    console.log(`${park.name} has more than 1000 trees.`);
  }
}
