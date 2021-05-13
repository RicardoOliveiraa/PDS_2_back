const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

const SCOPES = "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.profile";
const TOKEN_PATH = './resources/oAuth/token.json';

async function readTokenFile(callback, oAuth2Client) {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(TOKEN_PATH, async (err, token) => {
                if (err) return getAccessToken(oAuth2Client, callback);
        
                oAuth2Client.setCredentials(JSON.parse(token));
                const response = callback(oAuth2Client)

                resolve(response);
            })
        }
    )
}

async function readCredentialsFile(videoObject) {
    return new Promise(
        (resolve, reject) => {
            fs.readFile('./resources/oAuth/credentials.json', (err, content) => {
                if (err) return console.log('Erro tentando carregar o arquivo do segredo do cliente D=', err);
                const response = authorize(JSON.parse(content), sendVideo(videoObject));

                resolve(response)
            });
        }
    )
}




/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
async function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, 
        client_secret, 
        redirect_uris[0]
    );

    const response = await readTokenFile(callback, oAuth2Client)

    return response
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });


    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();

        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

const sendVideo = (videoObject) => 
    async (auth) => {
        const drive = google.drive({ version: 'v3', auth });

        try {
            const media = {
                mimeType: videoObject.type,
                body:  fs.ReadStream(videoObject.body.path)
            }
            const response = await drive.files.create({
                requestBody: {
                    name: videoObject.name,
                    parents: ["1EFlg7wyVttYjCrra0WUyEShLkWx00Ee5"]
                },
                media
            })

            const fileUrl = await drive.files.get({ fileId: response.data.id, fields: 'webViewLink'})
            return fileUrl.data.webViewLink
        } catch (err) {
            console.log(err)
            console.log("Deu treta pra enviar o video cpx")
        }
    }

/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listFiles(auth) {
    const drive = google.drive({version: 'v3', auth});
    drive.files.list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name)',
    }, 
    (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const files = res.data.files;
        if (files.length) {
            console.log('Files:');
            files.map((file) => {
                console.log(`${file.name} (${file.id})`);
            });
        } else {
            console.log('No files found.');
        }
    });
}

module.exports = async (videoObject) => {
    const response = await readCredentialsFile(videoObject)

    return response
}