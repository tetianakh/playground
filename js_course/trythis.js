

var obj = {
  age: 10,
  getAge: function () {
    console.log(this);
    console.log(this.age);
  }
}

console.log(this);
obj.getAge();
foo(obj.getAge);

function foo (func) {
  console.log("Calling inside foo:");
  func();
}
