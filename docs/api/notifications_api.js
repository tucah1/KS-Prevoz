// ! ###############################################
// @route       GET api/notifications/getNotifications
// @desc        Fetch list of all notifications
// @access      Private
// * Return object:
const get_notifications_return = {
  //returns an array of objects of this format
  notification_id: "",
  subject: "",
  body: "",
  date_of_creation: "",
};

// ! ###############################################
// @route       POST api/notifications/sendNotification
// @desc        Send notification to all registered users in the database except admins.
// @access      Private
// * Required data in POST object:
const send_notification_required = {
  subject: "",
  body: "",
};

// * Return object:
const send_notification_response = {
  message: "Notification sent successfully!",
};
