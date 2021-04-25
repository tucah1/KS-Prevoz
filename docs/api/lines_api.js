// ! ###############################################
// @route       GET api/line/lines/:page_no/:item_limit
// @desc        Get list of all lines
// @access      Public
// * Return object:
const get_lines_return = [
	{
		line_id: 'dcc4680d-37b9-4a00-be1f-6cc4c55008a4',
		from_point: 'Ilidza',
		to_point: 'Tarcin',
	},
	{
		line_id: 'd0352376-1692-42e7-a610-de7e08fd80e9',
		from_point: 'Presjednistvo',
		to_point: 'Vogosca',
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
}
