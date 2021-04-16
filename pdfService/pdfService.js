let fs = require('fs');
let constant = require('../constants/constant');
let environment = require('../environments/environment');

exports.getHtmlForPdf = function(zone, id, url){
  let mailBody = fs.readFileSync(__dirname+`/../pdfTemplate/${id}.html`).toString();
  mailBody = mailBody.replace(/{{apiUrl}}/g, environment.api_url);
  mailBody = mailBody.replace(/{{zone}}/g, zone);
  mailBody = mailBody.replace(/{{url}}/g, url);
 
  return mailBody;
}