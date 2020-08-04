const USER_KEY = '用户'

export default {
	saveUser(user) {
		sessionStorage.setItem(USER_KEY, JSON.stringify(user))
		//因为保存的必须是对象的json字符串 
	},

	getUser() {
		return JSON.parse(sessionStorage.getItem(USER_KEY))
	},

	removeUser() {
		sessionStorage.removeItem(USER_KEY)
	}
}