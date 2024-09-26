// /app/api/submit.js

'use server';

import { sendEmail, leadTemplate } from 'src/utils/email';
import { addLead, getAllDataFromCollection } from 'src/utils/firebaseFunctions';

const getLeads = async () => {
  try {
    const allLeads = await getAllDataFromCollection('leads');
    const emailsList = allLeads.map((data) => data.email);
    console.log('Leads list: ', allLeads);
    return {
      leads: allLeads,
      emails: emailsList,
    };
  } catch {
    return false;
  }
};

export async function POST(request) {
  try {
    const data = await request.json();
    data.email = data.email.toLowerCase();
    console.log('Message from client: ', data);
    const leadsData = await getLeads();
    if (leadsData && !leadsData.emails?.includes(data.email)) {
      const template = leadTemplate(data);
      await addLead(data);
      if (false) {
        await sendEmail({
          data,
          template,
          title: data.contactForm ? 'מתעניין חדש (טופס צרו קשר)' : 'מתעניין חדש (טופס הצטרפות)',
        });
      }
    } else {
      console.log('Lead already exist! ', data.email);
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



