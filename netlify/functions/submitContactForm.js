const { GoogleSpreadsheet } = require('google-spreadsheet')

const headerValues = [
  'time',
  'name',
  'email',
  'phoneNumber',
  'zipCode',
  'message',
]

// Google sheets uses a weird epoch time format starting at November 30, 1899
//   Times are "XXXX.YYYY" where XXXX is the number of days since November 30, 1899
//   and YYYY is the fraction of the remaining day that has passed
//   (e.g. for November 31, 1899 at 12 noon, XXXX = 1.0 and YYYY = 0.5, so the
//   google sheets approved date is "1.5")
const epochMillisToGoogleSheetsDateFormat = (ts) => {
  const sheetsEpoch = new Date(1899, 11, 30)
  const secondsInDay = 24 * 60 * 60 * 1000

  const convert = new Date(ts)

  const midnightOfTimestampDay = new Date(convert.getFullYear(), convert.getMonth(), convert.getDate())
  const secondsPassedOfTimestampDay = convert.getTime() - midnightOfTimestampDay.getTime();

  const daysSinceEpoch = Math.round(Math.abs((sheetsEpoch.getTime() - convert.getTime()) / (secondsInDay))) - 1;
  const fractionOfRemainingDay = secondsPassedOfTimestampDay / secondsInDay;

  return daysSinceEpoch + fractionOfRemainingDay;
}

exports.handler = async function (event, context) {
  // authenticate to google sheets and load our form response "database" sheet
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  })

  await doc.loadInfo()
  const sheet = doc.sheetsByIndex[0]

  // if no header row, we're setting up a new sheet (or a broken one)
  try {
    await sheet.loadHeaderRow()
  } catch (e) {
    if (e.message.includes('No values in the header row')) {
      sheet.setHeaderRow(headerValues)
    }
  }
  
  // get form responses from request
  const { name, email, phoneNumber, zipCode, message } = JSON.parse(event.body);

  // add row to our sheet
  await sheet.addRow({
    time: epochMillisToGoogleSheetsDateFormat(Date.now()),
    name: name,
    email: email,
    phoneNumber: phoneNumber,
    zipCode: zipCode,
    message: message,
  })

  // great success (if not, any uncaught exceptions will 500 with a stack trace)
  return {
    statusCode: 200,
  }
}