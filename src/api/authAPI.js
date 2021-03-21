import API from './APIService'

class AuthAPI {
    login = (username, password) => API.post('/auth/login', {username, password});
    registration = (payload) => API.post('/auth/registration', payload);
}

export default new AuthAPI();
