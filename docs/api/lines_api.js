// ! ###############################################
// @route       GET api/line/lines/:page_no/:item_limit
// @desc        Get list of all lines
// @access      Private - Admin
// * Return object:
const get_lines_return = [
	{
		line_id: 'dcc4680d-37b9-4a00-be1f-6cc4c55008a4',
		from_point: 'Ilidza',
		to_point: 'Tarcin',
		transport_type: 'Bus',
	},
	{
		line_id: 'd0352376-1692-42e7-a610-de7e08fd80e9',
		from_point: 'Presjednistvo',
		to_point: 'Vogosca',
		transport_type: 'Tram',
	},
]

// ! ###############################################
// @route       GET api/line/schedule/:line_id
// @desc        Get schedule for single line
// @access      Public
// * Return object:
// Don't know how to describe this object. It's a file piped to the response object. See the code below:
// const readStream = fs.createReadStream(
// 	path.join(config['avatarStorage'], avatar)
// )
// readStream.pipe(res)

// ! ###############################################
// @route       POST api/line/add-line
// @desc        Add new line into database
// @access      Private - Admin
const add_line_required = {
	file: '.csv file',
	from_point: '',
	to_point: '',
	transport_type: '',
}
const add_line_return = {
	message: 'Line added successfully!',
}

// ! ###############################################
// @route       POST api/line/edit-line
// @desc        Edit existing line info
// @access      Private - Admin
const edit_line_required = {
	file: 'file', // OPTIONAL
	line_id: '',
	from_point: '',
	to_point: '',
	transport_type: '',
}
const edit_line_return = {
	message: 'Line updated successfully!',
}

// ! ###############################################
// @route       DELETE api/line/delete-line/:line_id
// @desc        Delete existing line
// @access      Private - Admin
const delete_line_return = {
	message: 'Line deleted successfully!',
}
