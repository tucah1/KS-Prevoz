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
	notifications: 0,
    app_user_access: 1
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

// ! ###############################################
// @route       PUT api/auth/edit-profile
// @desc        Edit user profile information
// @access      Private
// * Required data in POST object:
const edit_profile_required = {
	first_name: '',
	last_name: '',
	email: '',
	notifications: 1, // This value can be 0 or 1 (0 is notifications turn off). default in db is 1
	password: '' // OPTIONAL for only when user is changing their password
}
// * Return object:
const edit_profile_return = {
	message: 'Profile details updated successfully!'
}