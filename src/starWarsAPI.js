const BASE_URL = 'https://swapi.co/api'
const getFilmInfo = (filmNumber, doneCallback) => {
  const requestParams = {
    method : 'GET',
    mode: 'cors',
    headers : {
        "Content-Type": "application/json",
    }
  };

  const request = new Request(`${BASE_URL}/films/${filmNumber}`, requestParams);

  function *gen(){
    let result = {
      movieInfo: '',
      characterInfo: [],
    };

    const movieResp = yield fetch(request);
    const movieInfo = yield movieResp.json();
    result.movieInfo = movieInfo;

    console.log('movieInfo', movieInfo);
    let characterInfoResp;
    let characterInfo;
    for (let item of movieInfo.characters) {
      characterInfoResp = yield fetch(item);
      characterInfo = yield characterInfoResp.json();
      result.characterInfo.push(characterInfo);
      console.log('character', characterInfo);
    }
    yield 'done';
    doneCallback(result);
    return 'all done!';
  }

  function run(genFunc){
    const genObject= genFunc(); //creating a generator object

    function iterate(iteration){ //recursive function to iterate through promises
      const yieldedObject = iteration.value;
      if(iteration.done) //stop iterating when done and return the final value wrapped in a promise
        return Promise.resolve(iteration.value);
      return Promise.resolve(iteration.value) //returns a promise with its then() and catch() methods filled
        .then(x => iterate(genObject.next(x))) //calls recursive function on the next value to be iterated
        .catch(x => iterate(genObject.throw(x))); //throws an error if a rejection is encountered
    }

    try {
      return iterate(genObject.next()); //starts the recursive loop
    } catch (ex) {
        return Promise.reject(ex); //returns a rejected promise if an exception is caught
    }
  }

  run(gen).then(x => {
    console.log('x', x);
  }).catch(x => console.log(x.message));
}

export {
  getFilmInfo,
};