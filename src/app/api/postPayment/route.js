// /app/api/submit.js

'use server';

import { sendInvoiceEmail } from 'src/utils/invoice';
import { addUser } from 'src/utils/firebaseFunctions';

import { PayersDict } from '../payersTemp';

export async function POST(request) {
  try {
    const data = await request.json();
    const { Id, Fild1, Fild2, CCode } = data;
    const name = Fild1?.toLowerCase();
    const email = Fild2?.toLowerCase();
    console.log('PayersDict: ', PayersDict, email);
    // console.log('postPayment - Message from client: ', data);
    if (email && PayersDict[email] && Number(CCode) === 0) {
      const user = PayersDict[email];
      // const approve = await fetch();
      if (true) {
        await addUser(data);
        await sendInvoiceEmail(data);
      }
      console.log("This is new user's details: ", user);
      delete PayersDict[email];
      return new Response(JSON.stringify({ message: `Message Received`, payment: true }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    return new Response(JSON.stringify({ message: `Message Received`, payment: false }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // console.log('This is email response: ', res);
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid request', log: error }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
