// /app/api/submit.js

'use server';

import { sendInvoiceEmail } from 'src/utils/invoice';
import { addUser, deletePrePayer, getPrePayerByEmail } from 'src/utils/firebaseFunctions';

export async function POST(request) {
  try {
    const data = await request.json();
    const { Id, Fild1, Fild2, CCode, Amount, Order } = data;
    const name = Fild1?.toLowerCase();
    const email = Order?.toLowerCase().trim();
    const prePayer = await getPrePayerByEmail(email);
    const isValid = Boolean(prePayer.length) || process.env.NODE_ENV === 'development';
    console.log('Query prePayer resulted with: ', isValid, email, Fild1, Fild2, prePayer);
    if (email && isValid && Number(CCode) === 0 && process.env.NODE_ENV === 'production') {
      // const approve = await fetch();

      await addUser({ ...prePayer[0], payment: Amount || prePayer[0].payment });
      await deletePrePayer(prePayer[0]?.id);
      await sendInvoiceEmail(prePayer[0]);

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
    console.log('There was an error with postPayment: ', error);
    return new Response(JSON.stringify({ error: 'Invalid request', log: error }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
