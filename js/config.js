/* Fill in after deploying apps-script/Code.gs (see README.md).
   ENDPOINT = the Apps Script web app URL ending in /exec.  KEY must match KEY in Code.gs.

   CLASS_ENDPOINT / CLASS_KEY = the main app's class-progress server (teacher-dashboard.gs). They are the
   same values as ENDPOINT / SUBMIT_KEY in the main app's progress.html. Quiz results are sent there so the
   teacher dashboard and the student's My Progress page can show them. Leave CLASS_ENDPOINT empty to switch it off. */
window.GQ_CONFIG = {
  ENDPOINT: '',
  KEY: 'gq-change-me',
  CLASS_ENDPOINT: 'https://script.google.com/macros/s/AKfycbw8Dt3F9oG2PXg3pxHV4tdHS6VeNDLPiqYfS_Olt3QNjIKIn3tKrfno3MWC5MiKtr-I/exec',
  CLASS_KEY: 'mathreinf-7Kp29xQ'
};
