import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AsaasService {
  constructor(private readonly http: HttpService) {}

  request<T>(method: 'get' | 'post' | 'put', path: string, body?: any) {
    const call =
      method === 'get'
        ? this.http.get<T>(path)
        : method === 'post'
          ? this.http.post<T>(path, body)
          : this.http.put<T>(path, body);
    return lastValueFrom(call).then((res) => res.data);
  }
}
