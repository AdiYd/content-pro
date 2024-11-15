// /app/api/submit.js

'use server';

import { sendEmail, leadTemplate } from 'src/utils/email';
import { addLead, getLeadByEmail, getAllDataFromCollection } from 'src/utils/firebaseFunctions';

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
    const lead = await getLeadByEmail(data.email);
    const isLead = Boolean(lead?.length);
    if (!isLead && process.env.NODE_ENV === 'production') {
      await addLead(data);
      const template = leadTemplate(data);
      await sendEmail({
        data,
        template,
        title: data.contactForm ? 'מתעניין חדש (עמוד לידים)' : 'מתעניין חדש (טופס הצטרפות)',
      });
    } else if (isLead) {
      console.log('Lead already exist: ', lead[0]);
    } else if (process.env.NODE_ENV === 'development'){
      const template = leadTemplate(data);
      await sendEmail({
        data,
        template,
        title: data.contactForm ? 'מתעניין חדש (טופס צרו קשר)' : 'מתעניין חדש (טופס הצטרפות)',
      });
    } else {
      console.log("Lead didn't saved", data?.email);
    }
    return new Response(JSON.stringify({ message: `Received: ${data.email}` }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
    console.log('There was an error with signing new lead', e);
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}



