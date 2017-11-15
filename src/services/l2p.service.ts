import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import 'rxjs';

@Injectable()
export class L2pService {

    private host: string = 'http://l2p.ir/';
    public loading: boolean = false;

    constructor(private http: HttpClient) {

    }


    login(username, password): Promise<any> {
        const headers = {
            'Content-Type': 'application/json'
        };
        const data: any = { username: username, password: password };
        const url: string = this.host + 'auth/gettoken';
        this.loading = true;
        console.log(data);
        console.log(headers);
        return this.http.post(url, JSON.stringify(data), { headers: new HttpHeaders(headers) }).toPromise()
            .then((result: any) => {
                console.log(result);
                if (result && result.success == true) {
                    localStorage.setItem('x-access-token', result.token);
                    localStorage.setItem('display_name', result.user.display_name);
                }
                this.loading = false;
                return result;
            })
            .catch(this.handleError.bind(this));
    }

    getTerminals(): Promise<any> {
        const headers = {
            'Content-Type': 'application/json; charset=UTF-8',
            'x-access-token': localStorage.getItem('x-access-token')
        };

        const url: string = this.host + 'api/terminals';
        this.loading = true;
        return this.http.get(url, { headers:  new HttpHeaders(headers)  }).toPromise()
            .then(this.done.bind(this))
            .catch(this.handleError.bind(this))
    }

    createLink(amount, payer_name, payer_mobile, terminal_uuid): Promise<any> {
        const headers =
            {
                'Content-Type': 'application/json; charset=UTF-8',
                'x-access-token': localStorage.getItem('x-access-token')
            };

        const url: string = this.host + 'api/links';

        const data =
            {
                amount: amount,
                payer_name: payer_name,
                payer_mobile: payer_mobile,
                terminal_uuid: terminal_uuid
            };
        this.loading = true;
        return this.http.post(url, JSON.stringify(data), { headers:  new HttpHeaders(headers)  }).toPromise()
            .then(this.done.bind(this))
            .catch(this.handleError.bind(this));
    }

    links(page?: number, limit?: number): Promise<any> {
        const headers =
            {
                'Content-Type': 'application/json; charset=UTF-8',
                'x-access-token': localStorage.getItem('x-access-token')
            };


        let url = this.host + 'api/links';
        if (page > 0 && limit > 0) {
            url += '?page=' + page + '&limit=' + limit;
        }
        return this.http.get(url, { headers:  new HttpHeaders(headers)  }).toPromise()
            .then(this.done.bind(this))
            .catch(this.handleError.bind(this));

    }

    logout() {
        localStorage.removeItem('x-access-token');
        localStorage.removeItem('display_name');
    }

    handleError(error: Error | any | string): Promise<any> {
        this.loading = false;
        console.error(error.message || error);
        return Promise.reject(error);
    }

    done(response: any): Promise<any> {
        this.loading = false;
        console.log(response);
        return Promise.resolve(response);
    }



}