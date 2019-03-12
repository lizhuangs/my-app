/**
 * Created by yanxiaojun617@163.com on 12-27.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { TimeoutError } from 'rxjs/util/TimeoutError';
import 'rxjs/add/operator/timeout';
import { Utils } from './Utils';
import { GlobalData } from './GlobalData';
import { BASE_URL, REQUEST_TIMEOUT } from './Constants';
import { Logger } from './Logger';

@Injectable()
export class HttpService {

  constructor(public http: HttpClient,
    private globalData: GlobalData,
    public logger: Logger) {
  }

  /**
   * 统一发送请求
   * @param params
   * @returns
   */
  public request(options: any): any {
    const method: string = options['method'] || 'get';
    let url = options['url'] || '';
    url = Utils.formatUrl(url.startsWith('http') ? url : BASE_URL + url);
    const params = options['params'] || null;
    const type = options['type'] || 'json';
    return this.http.request(method, url,
      {
        body: options['data'],
        params: new HttpParams({ fromObject: params }),
        headers: new HttpHeaders(options['header']),
        responseType: type
      }).timeout(3000).debounceTime(300).distinctUntilChanged().pipe();
    /* .subscribe(
      value => {
        console.log('Post call successful value returned in body', value);
      },
      error => {
        console.log('Post call in error', error);
      },
      () => {
        console.log('The Post observable is now completed.')
      }
    );*/
  }

  /*  private handleSuccess(res: Response) {
     let body = res["_body"];
     // console.log("接口返回的成功信息：" + body)
     if (body) { // 有数据返回
       return {
         data: res.json().data || {}, // 返回内容
         code: res.json().code || {}, // 返回code
         message: res.json().message || {}, // 返回信息
         statusText: res.statusText,
         status: res.status,
         success: true
       }
     } else { // 无数据返回
       return {
         data: res.json().data || {}, // 返回内容
         code: res.json().code || {}, // 返回code
         message: res.json().message || {}, // 返回信息
         statusText: res.statusText,
         status: res.status,
         success: true
       }
     }
   }

   private handleError(error) {
     console.log(error);
     let msg = '请求失败';
     if (error.status == 400) {
       console.log('请求参数正确');
     }
     if (error.status == 404) {
       console.error('请检查路径是否正确');
     }
     if (error.status == 500) {
       console.error('请求的服务器错误');
     }
     console.log(error);
     return { success: false, msg: msg };
   }

   private requestFailed(url: string, options: RequestOptionsArgs, err: Response): void {
     console.log('hideLoading');
     console.log('%c 请求失败 %c', 'color:red', '', 'url', url, 'options', options, 'err', err);
     if (err instanceof TimeoutError) {
       console.log('alert 请求超时,请稍后再试!');
       return;
     }
     let msg = '请求发生异常';
     try {
       let result = err.json();
       console.log(result.message || msg);
     } catch (err) {
       let status = err.status;
       if (status === 0) {
         msg = '请求失败，请求响应出错';
       } else if (status === 404) {
         msg = '请求失败，未找到请求地址';
       } else if (status === 500) {
         msg = '请求失败，服务器出错，请稍后再试';
       }
       console.log(msg);
       this.logger.httpLog(err, msg, {
         url: url,
         status: status
       });
     }

   }

   private optionsAddToken(header: HttpHeaders): void {
     const token = this.globalData.token;
     if (header) {
       header.append('Authorization', 'Bearer ' + token);
     } else {
       header = new HttpHeaders({
         'Authorization': 'Bearer ' + token
       });
     }
   } */

  /* public request(method: string, url: string, params?: any, header: HttpHeaders): Observable<Response> {
    url = Utils.formatUrl(url.startsWith('http') ? url : APP_SERVE_URL + url);
    this.optionsAddToken(options);
    return Observable.create(observer => {
      console.log('%c 请求前 %c', 'color:blue', '', 'url', url, 'options', options);
      this.http.request('POST', url, options).timeout(REQUEST_TIMEOUT).subscribe(res => {
        console.log('%c 请求成功 %c', 'color:green', '', 'url', url, 'options', options, 'res', res);
        if (res['_body'] === '') {
          res['_body'] = null;
        }
        observer.next(res);
      }, err => {
        this.requestFailed(url, options, err);
        observer.error(err);
      });
    });
  } */
}
