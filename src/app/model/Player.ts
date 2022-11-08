import {Field} from './Field';
import {DirectionKey} from './Types';

export class Player {

  SIZE: number;

  snake: Field[];
  head: Field;

  direction: DirectionKey = DirectionKey.RIGHT; // lets start to the right


  constructor(size: number = 20) {
    this.SIZE = size;
    // spawn at 5x5
    // TODO randomize
    const start = new Field(5,5)
    this.snake = [start];
    this.head = start;

  }

  grow(): void {
    debugger;
    const tail = this.snake[this.snake.length -1];
    this.snake.push(new Field(tail.x, tail.y));
  }

  shrink(): void {
    this.snake.pop();
  }

  move(grow: boolean): void {
    let field;

    switch (this.direction) {
      case DirectionKey.DOWN: field = new Field(this.head.x, ++this.head.y); break;
      case DirectionKey.UP: field = new Field(this.head.x, --this.head.y); break;
      case DirectionKey.LEFT: field = new Field(--this.head.x, this.head.y); break;
      case DirectionKey.RIGHT: field = new Field(++this.head.x, this.head.y); break;
    }

    if(field.x < 0) {
      field.x = this.SIZE;
    }
    if(field.x > this.SIZE) {
      field.x = 0;
    }
    if(field.y < 0) {
      field.y = this.SIZE;
    }
    if(field.y > this.SIZE) {
      field.y = 0;
    }

    this.head = field;
    this.snake.unshift(field);

    if (!grow) {
      debugger;
     // remove tail
      this.snake.pop();
    }

    console.log(this.snake);
  }


}
