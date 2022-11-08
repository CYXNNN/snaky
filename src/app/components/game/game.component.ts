import {Component, HostListener, OnInit} from '@angular/core';
import {Consumable} from '../../model/Consumable';
import {Field} from '../../model/Field';
import {Player} from '../../model/Player';
import {DirectionKey} from '../../model/Types';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  SIZE = 40;
  // the id of the game
  gameId: string = '';

  //urself
  player: Player;

  consumables: Consumable[]; // every eatable item on the map

  board: any;
  board_ctx: any;

  otherPlayers!: Player[] //used to draw other players



  constructor() {

    // call backend to check, if there is a saved game state and the game should be resumed:
    if (true) {
      this.player = new Player();

    } else {
      // resume saved state from backend
    }

    this.consumables = [];

  }

  ngOnInit(): void {

    this.board =  document.getElementById("board");
    this.board_ctx = this.board.getContext("2d");

    this.game();

  }

  game(): void {
    setInterval(() => {

      this.init();
      const grow = this.checkCollision();
      this.player.move(grow);
      this.drawSnake(this.player.snake) //repeat this for the other players in this.players

      if (this.consumables.length < 1) {
        this.consumables.push(new Consumable(new Field(6,10)));
      }
      this.consumables = this.consumables.filter(c => !c.consumed);
      this.consumables.forEach(c => this.drawConsumable(this, c.location));


    }, 500) // every second



  }

  checkCollision(): boolean {
    let res = false;
    this.consumables.forEach(c => {
      if(c.location.x === this.player.head.x && c.location.y === this.player.head.y) {
        c.consumed = true;
        debugger;
        res = true;
      }
    })
    return res;
  }

  // draw a border around the canvas
  init(): void {
    const board_border = 'black';
    const board_background = "white";
    this.board_ctx.fillStyle = board_background;
    this.board_ctx.strokestyle = board_border;
    this.board_ctx.fillRect(0, 0, this.board.width, this.board.height);
    this.board_ctx.strokeRect(0, 0, this.board.width, this.board.height);
  }

  drawSnake(snake: Field[]): void {
    snake.forEach(field => this.drawSnakePart(this, field));
  }

  drawSnakePart(me: any, part: Field): void {
    const snake_col = 'lightblue';
    const snake_border = 'darkblue';

    this.board_ctx.fillStyle = snake_col;
    this.board_ctx.strokestyle = snake_border;
    this.board_ctx.fillRect(part.x * 10, part.y * 10, 10, 10);
    this.board_ctx.strokeRect(part.x * 10, part.y * 10, 10, 10);
  }

  drawConsumable(me: any, location: Field): void {
    this.board_ctx.fillStyle = 'red';
    this.board_ctx.strokestyle = 'darkred';
    this.board_ctx.fillRect(location.x * 10, location.y * 10, 10, 10);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const direction = Object.values(DirectionKey).filter(d => d === event.key)[0];
    this.player.direction = direction;
  }

}
