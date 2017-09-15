/**
 * Created by yanxiaojun617@163.com on 07-25.
 */
import { Injectable } from '@angular/core';
import { GlobalData } from './GlobalData';
declare var fundebug;

/**
 * Utils类存放和业务无关的公共方法
 * @description
 */
@Injectable()
export class Logger {
  constructor(private globalData: GlobalData) {
  }

  log(err: any, action: string, other = null): void {
    console.log('Logger.log：action-' + action);
    other && console.log(other);
    console.log(err);
    /* fundebug.notifyError(err,
      {
        metaData: {
          action: action,
          other: other,
          user: { id: this.globalData.userId, name: this.globalData.username }
        }
      }); */
  }

  httpLog(err: any, msg: string, other = {}): void {
    console.log('Logger.httpLog：msg-' + msg);
    /* fundebug && fundebug.notifyHttpError(err,
      {
        metaData: {
          action: msg,
          other: other,
          user: { id: this.globalData.userId, name: this.globalData.username }
        }
      }); */
  }



}
