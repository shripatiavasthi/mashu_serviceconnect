const events = {
  button_clicked: 'button_clicked',
  link_clicked: 'link_clicked',
  language_changed: 'language_changed',
  video_ended: 'video_ended',
  video_played: 'video_played',
  notification_opened: 'notification_opened',
  call: 'call',
  opened_map: 'opened_map',
  file_download: 'file_download',
  email_clicked: 'email_clicked',
};
const sendAnalytics = async (event, event_detail) => {
  if (event) {
    console.log('analytics event', event, event_detail);
  }
};
const sendScreenView = async screen_name => {
  if (screen_name) {
    console.log('screen view', screen_name);
  }
};

export {sendAnalytics, events, sendScreenView};
