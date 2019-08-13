import { Message } from './Message';
import{ User} from './User';
import {Comment} from  "./Comment";
import {Chat} from "./Chat"
import {Menu} from './Menu';
import {System} from "./System";
import {Order} from "./Order"
export default {
  user: new User(),
  message :new Message(),
  comment : new Comment(),
  chat : new Chat(),
  menu : new Menu(),
  system : new System(),
  order :new Order(),
};