// /app/api/submit.js

'use server';

import { sendEmail, leadTemplate } from 'src/utils/email';
import { addLead, getAllDataFromCollection } from 'src/utils/firebaseFunctions';

const getLeads = async () => {
  try {
    const allLeads = await getAllDataFromCollection('leads');
    console.log('Leads list: ', allLeads.emails);
    return allLeads;
  } catch {
    return false;
  }
};

export async function POST(request) {
  try {
    const data = await request.json();
    data.email = data.email.toLowerCase();
    console.log('Leads - Message from client: ', data);
    const leadsData = await getLeads();
    if (leadsData && !leadsData.emails?.includes(data.emails)) {
      const template = leadTemplate(data);
      if (true) {
        await addLead(data);
        await sendEmail({
          data,
          template,
          title: data.contactForm ? 'מתעניין חדש (טופס צרו קשר)' : 'מתעניין חדש (טופס הצטרפות)',
        });
      }
    } else if (leadsData && leadsData.emails?.includes(data.email)) {
      console.log('Lead already exist! ', data.email);
    } else {
      console.log("Lead didn't saved");
    }
    return new Response(JSON.stringify({ message: `Received: ${data.email}` }), {
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



