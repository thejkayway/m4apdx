import GoogleSpreadsheet from 'google-spreadsheet'

exports.handler = async function (event, context) {
  // authenticate to google sheets and load our form response "database" sheet
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  })
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];

  // get form responses from request
  const { name, email, phoneNumber, zipCode, message } = JSON.parse(event.body);

  // add row to our sheet
  const appendedRow = await sheet.addRow({
    time: Date.now(),
    name: name,
    email: email,
    phoneNumber: phoneNumber,
    zipCode: zipCode,
    message: message,
  })

  // great success (if not, any uncaught exceptions will 500 with a stack trace)
  return {
    statusCode: 200,
    body: JSON.stringify(appendedRow)
  };
}