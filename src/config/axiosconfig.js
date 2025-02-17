import axios from 'axios';

const instance = axios.create({

  baseURL: 'http://localhost:5000/', // Adjust according to your server address


});

export default instance;