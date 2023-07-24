import decode from "jwt-decode";

interface DecodedToken {
    data: {
        username: string,
        email: string,
        _id: string
    },
    iat: number,
    exp: number
}

const auth = {
    getProfile() {
        const token = this.getToken()
        if (token != null) {            
            return decode(token);
        }
    },

    loggedIn() {
        const token = this.getToken();
        // If there is a token and it's not expired, return `true`
        return token && !this.isTokenExpired(token) ? true : false;
    },

    isTokenExpired(token: string) {
        // Decode the token to get its expiration time that was set by the server
        const decoded: DecodedToken = decode(token);
        // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
        if (decoded.exp < Date.now() / 1000) {
            localStorage.removeItem("id_token");
            return true;
        }
        // If token hasn't passed its expiration time, return `false`
        return false;
    },

    getToken() {
        return localStorage.getItem("id_token");
    },

    login(idToken: string) {
        localStorage.setItem("id_token", idToken);
        window.location.assign("/");
    },

    logout() {
        localStorage.removeItem("id_token");
        window.location.reload();
    },
};

export default auth;
