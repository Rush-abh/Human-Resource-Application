import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('csrftoken');
const auth_token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : ""

export default axios.create({
	baseURL: "http://localhost:8000/api",
	headers: {
		'X-CSRFToken': token,
		'Authorization': `Token ${auth_token}`
	}
});