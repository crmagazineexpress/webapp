import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$api = axios.create({
	baseURL: 'http://localhost:3000',
})

Vue.prototype.$wp = axios.create({
	baseURL: 'https://crmagazineexpress.com.br/wp-json',
})
