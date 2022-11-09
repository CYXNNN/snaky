import {Socket} from 'ngx-socket-io';
import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private socket: Socket) {

    socket.on('connect', (data: any) => {
      console.log(data);
    });

    socket.on('event', (event: any, data: any) => {

      switch (event.type) {
        case 'PLAYER_JOINED':
          // a player joined
          break;

        case 'PLAYER_LEFT':
          // a player left the game
          break;

        case 'GAME_END':
          // a other player won the game
          break;

        default:
          console.log(event, data)
          break;
      }
      console.log(event);
      console.log(data);
    });

    socket.on('error', () => {
      console.log('there seems to be an error');
    });

    socket.on('connect_error', (err: string) => {
      console.log('connect failed' + err);
    });

    socket.on('connection', () => {
      console.log('connected');
    });
  }

  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }
}
