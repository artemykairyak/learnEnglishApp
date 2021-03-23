import axios from 'axios'
// import {handleErrorFunc} from '../App'
import {BASE_URL, TOKEN_NAME} from '../constants'

class API {
    private localStorageData: string | null;
    private url: string;

    constructor(localStorageData = TOKEN_NAME) {
        this.url = BASE_URL || ''
        this.localStorageData = localStorageData
    }

    handleSuccess = (response: any) => {
        if(response.statusCode) {
            console.log('ERROR', response.message);
            return []
        }
        return response
    }

    handleError = (error: any) => {
        console.log(error)
        // handleErrorFunc(error)
        return Promise.reject(error)
    }

    create = (headers: any) => {
        // @ts-ignore
        const token = localStorage.getItem(this.localStorageData) || undefined

        const headerAuth = token && {Authorization: token ? `Bearer ${token}` : ''}
        const service = axios.create({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...headers,
                ...headerAuth
            },
        })
        service.interceptors.response.use(this.handleSuccess, this.handleError)
        service.interceptors.request.use(request => {
            console.log('Starting Request', request)
            return request
        })

        service.interceptors.response.use(response => {
            console.log('Response:', response)
            return response
        })
        return service
    }

    get = (path = '', headers?: any) => {
        const service = this.create(headers)

        return service.request({
            method: 'GET',
            url: `${this.url}${path}`,
        })
            .then(res => res.data)
            .catch(err => this.handleError(err))
    }

    post = (path = '', data = {}, headers?: any) => {
        const service = this.create(headers)

        return service.request({
            method: 'POST',
            url: `${this.url}${path}`,
            data
        })
            .then(res => res.data)
            .catch(err => this.handleError(err))
    }

    put = (path = '', data = {}, headers?: any) => {
        const service = this.create(headers)

        return service.request({
            method: 'PUT',
            url: `${this.url}${path}`,
            data
        })
            .then(res => res.data)
            .catch(err => this.handleError(err))
    }

    delete = (path = '', headers?: any) => {
        const service = this.create(headers)

        return service.request({
            method: 'DELETE',
            url: `${this.url}${path}`,
        })
            .then(res => res.data)
            .catch(err => this.handleError(err))
    }

    log = (service: any) => {
        service.interceptors.request.use((request: any) => {
            console.log('Starting Request', request)
            return request
        })

        service.interceptors.response.use((response: any) => {
            console.log('Response:', response)
            return response
        })
    }
}

export default new API()
