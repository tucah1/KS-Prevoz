// ! ###############################################
// @route       GET api/auth
// @desc        Authorize user and get user info
// @access      Private
// * Return object:
const get_user = {
    app_user_id: '',
	first_name: '',
	last_name: '',
	email: '',
    app_user_access: 0
}

// ! ###############################################
// @route       POST api/auth/register
// @desc        Register new user
// @access      Public
// * Required data in POST object:
const register_required = {
	first_name: '',
	last_name: '',
	email: '',
	password: '',
}
// * Return object:
const register_return = {
	token: 'token to return',
}

// ! ###############################################
// @route       POST api/auth/login
// @desc        Login a user
// @access      Public
// * Required data in POST object:
const login_required = {
	email: '',
	password: '',
}
// * Return object:
const login_return = {
	token: 'token to return',
}

// ! ###############################################
// @route       GET api/auth/google/callback
// @desc        Authenticate and authorize user via google account
// @access      Public
// * Required data in POST object:
const google_register_required = {
	googleToken: 'token from google',
}
// * Return object:
const register_return = {
	token: 'token to return',
}