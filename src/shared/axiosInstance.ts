import { Axios } from 'axios';
import { jwtDecode } from 'jwt-decode';

const refresh_interval = 60

export class AxiosInstance extends Axios {
  refresh_token = localStorage.getItem('refresh_token');
  access_token = localStorage.getItem('access_token');

  constructor() {
    super({
      baseURL: 'http://localhost:5000/',
      headers: {
        'Content-Type': 'mutlipart/form-data',
      },
    });
    if (this.checkTokenExpired()) {
      this.refreshTokens()
    } else {
      this.setAuth();
    }
  }

  checkTokenExpired() {
    if (this.access_token) {
      const decoded_token = jwtDecode(this.access_token)
      if (typeof decoded_token.exp === "number" && Date.now() > (decoded_token.exp * 1000)) {
        return true
      }
    }
    return false
  }

  setAuth() {
    if (this.access_token) {
      this.defaults.headers.common = {
        "Authorization": `Bearer ${this.access_token}`
      }
    }
  }

  async refreshTokens() {
    if (this.refresh_token) {
      try {
        const { data } = await this.put('/api/user/refresh', { access_token: this.access_token}, {headers: {
            Authorization: `Bearer ${this.refresh_token}`,
            "Content-Type": "application/json"
        }});
        const parsedData = JSON.parse(data)
        this.access_token = parsedData.access_token
        localStorage.setItem('access_token', parsedData.access_token);
        window.location.reload()
      } catch (err) {
        console.log(err);
      }
    }
  }
}
