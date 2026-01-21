// reduce function on array
const items = [1, 2, 3, 4];

const total = items.reduce((prevState, currState) => {
    console.log({ prevState, currState });
    return prevState + currState;
});