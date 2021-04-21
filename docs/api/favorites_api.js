// ! ###############################################
// @route       GET api/favorites/getFavorites
// @desc        Fetch favorite lines of user
// @access      Private
// * Return object:
const get_favorites_return = {
  favoriteLines: 'array of favorite lines (possibly empty)',
};

// ! ###############################################
// @route       POST api/favorites/addFavorite
// @desc        Add a line to favorite list
// @access      Private
// * Required data in POST object:
const add_favorite_required = {
  line_id: 'line ID',
};
// * Return object:
const add_favorite_return = {
  message: 'Line successfully added to favorites!',
};

// ! ###############################################
// @route       DELETE api/favorites/deleteFavorite
// @desc        Delete line from favorite list
// @access      Private
// * Required data in DELETE object:
const delete_favorite_required = {
  line_id: 'line ID',
};
// * Return object:
const delete_favorite_return = {
  message: 'Line successfully deleted from favorites!',
};
