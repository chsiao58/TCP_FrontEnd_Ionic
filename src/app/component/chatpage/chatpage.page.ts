import { Component, OnInit } from '@angular/core';
import { DirectMessageService } from '../../services/direct-message.service';
import { LoginService } from '../../services/login.service';
import { Message } from './message';
import { User } from '../../classes/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chatpage',
  templateUrl: './chatpage.page.html',
  styleUrls: ['./chatpage.page.scss'],
})
export class ChatpagePage implements OnInit {
  messages: Message[];
  allUser: User[];
  fromId = 2;

  constructor(private directMessageService: DirectMessageService,
              private loginService: LoginService,
              private userService: UserService) { }

  ngOnInit() {
    this.getDMdata();
    this.getUserdata();
  }

  getDMdata() {
    this.directMessageService.getData(this.loginService.currentUser.user_id, this.fromId).subscribe(
      data => {
        this.messages = data;
      }
    );

  }

  getUserdata() {
    this.userService.getAllUserData().subscribe(
      data => {
        console.log(data);
        this.allUser = data;
      }
    );
  }

  onKeyDown(event: any) {
    if (event.key === 'Enter') {
      this.directMessageService.postMessage(
        this.loginService.currentUser.user_id, this.fromId, event.target.value);
      event.target.value = '';
    }
  }
}
