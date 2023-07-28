export class Player {
  constructor(name){
    this._name = name;
    this._score = 0;
  }

  upScore(){
    this._score++;
  }

  get score(){
    return this._score;
  }
}