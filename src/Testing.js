const justArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const justObj = {
  notes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
};
newFunction();

console.log("2nd");

newFunction();
function newFunction() {
  console.log(`array len before ${justArray.length}`);
  justArray.splice(0, 3);
  console.log(`array len after ${justArray.length}`);
}
