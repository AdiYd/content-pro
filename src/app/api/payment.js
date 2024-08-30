// /app/api/submit.js

'use server';

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('Message from client: ', body);
    return new Response(JSON.stringify({ message: `Received: ${body.data}` }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}



