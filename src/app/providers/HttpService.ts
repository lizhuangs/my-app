/**
 * Created by yanxiaojun617@163.com on 12-27.
 */
import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest, HttpParams, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import {TimeoutError} from 'rxjs/util/TimeoutError';
import 'rxjs/add/operator/timeout';
import {Utils} from './Utils';
import {GlobalData} from './GlobalData';
import {APP_SERVE_URL, REQUEST_TIMEOUT} from './Constants';
import {Logger} from './Logger';

@Injectable()
export class HttpService {

  constructor(public http: HttpClient,
              private globalData: GlobalData,
              public logger: Logger) {
  }

  /**
   * 将对象转为查询参数
   * @param paramMap
   * @returns {URLSearchParams}
   private static buildURLSearchParams2(paramMap): URLSearchParams {
    let params = new URLSearchParams();
    if (!paramMap) {
      return params;
    }
    for (let key in paramMap) {
      let val = paramMap[key];
      if (val instanceof Date) {
        val = Utils.dateFormat(val, 'yyyy-MM-dd hh:mm:ss');
      }
      params.set(key, val);
    }
    return params;
  }*/

  private static buildParams(paramMap): URLSearchParams {
    const params = new HttpParams();
    if (!paramMap) {
      return params;
    }
    for (const key in paramMap) {
      let val = paramMap[key];
      if (val instanceof Date) {
        val = Utils.dateFormat(val, 'yyyy-MM-dd hh:mm:ss');
      }
      params.set(key, val);
    }
    return params;
  }

  public request(method: string, url: string, params: HttpParams, header: HttpHeaders): Observable<Response> {
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
        this.requestFailed(url, options, err); // 处理请求失败
        observer.error(err);
      });
    });
  }

  public get(url: string, paramMap: any = null): Observable<Response> {
    return this.request(url, 'GET', HttpService.buildURLSearchParams(paramMap));
  }

  public post(url: string, body: any = {}): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Post,
      body: body,
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8'
      })
    }));
  }

  public postFormData(url: string, paramMap: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Post,
      search: HttpService.buildURLSearchParams(paramMap).toString(),
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      })
    }));
  }

  public put(url: string, body: any = {}): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Put,
      body: body
    }));
  }

  public delete(url: string, paramMap: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Delete,
      search: HttpService.buildURLSearchParams(paramMap).toString()
    }));
  }

  public patch(url: string, body: any = {}): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Patch,
      body: body
    }));
  }

  public head(url: string, paramMap: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Head,
      search: HttpService.buildURLSearchParams(paramMap).toString()
    }));
  }

  public options(url: string, paramMap: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Options,
      search: HttpService.buildURLSearchParams(paramMap).toString()
    }));
  }

  /**
   * 处理请求失败事件
   * @param url
   * @param options
   * @param err
   */
  private requestFailed(url: string, options: RequestOptionsArgs, err: Response): void {
    // this.nativeService.hideLoading();
    console.log('hideLoading');
    console.log('%c 请求失败 %c', 'color:red', '', 'url', url, 'options', options, 'err', err);
    if (err instanceof TimeoutError) {
      console.log('alert 请求超时,请稍后再试!');
      return;
    }
    /* if (!this.nativeService.isConnecting()) {
      console.log('alert 请求失败，请连接网络');
      return;
    } */
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
  }
}
