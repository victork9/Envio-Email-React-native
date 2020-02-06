import qs from 'qs';
import { Linking } from 'react-native';


export async function sendEmail(to, subject, body, options = {}) {
    const { cc, bcc } = options;

    let url = `mailto:${to}`;

    // Create email link query
    const query = qs.stringify({
        subject: subject,
        body: body,
        cc: cc,
        bcc: bcc
    });

    if (query.length) {
        url += `?${query}`;
    }

    // check if we can use this link
    const canOpen = await Linking.canOpenURL(url);

    if (!canOpen) {
        throw new Error('Provided URL can not be handled');
    }

    return Linking.openURL(url);
}


// example.js

import { sendEmail } from './send-email';

sendEmail(
    'victorklippel0123@gmail.com',
    'Greeting!',
    'I think you are fucked up how many letters you get.'
).then(() => {
    console.log('Our email successful provided to device mail ');
});