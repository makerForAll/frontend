/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';
import { ClientService } from './services/ClientService';
import { PartyService } from './services/PartyService';
import { PaymentdetailService } from './services/PaymentdetailService';
import { PlanService } from './services/PlanService';
import { UserService } from './services/UserService';
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class APIforBackEnd {
    public readonly client: ClientService;
    public readonly party: PartyService;
    public readonly paymentdetail: PaymentdetailService;
    public readonly plan: PlanService;
    public readonly user: UserService;
    public readonly request: BaseHttpRequest;
    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? '',
            VERSION: config?.VERSION ?? '1.0',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });
        this.client = new ClientService(this.request);
        this.party = new PartyService(this.request);
        this.paymentdetail = new PaymentdetailService(this.request);
        this.plan = new PlanService(this.request);
        this.user = new UserService(this.request);
    }
}

