// eslint-disable-next-line import/no-extraneous-dependencies
import nodemailer from 'nodemailer';

export async function sendEmail({ data = {}, recipients = ['admin@webly.digital'] } = {}) {
  const auth = {
    user: 'serviece.webly@gmail.com', // Your email address
    pass: process.env.EMAIL_CRED, // Your email password or app-specific password
  };
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth,
  });

  const htmlTamplate = geminiTamplate(data)[1];
  // const htmlTamplate = gptTamplates(data)[1];

  if (process.env.NODE_ENV === 'production') {
    recipients.push('eranfark@gmail.com');
  }
  const toRecipients = recipients.join(', ');
  const mailOptions = {
    from: '"video-pro" <no-reply@VidePro>', // Sender address
    to: toRecipients, // Admin email address
    subject: data.totalPrice ? 'מנוי חדש' : 'משתמש חדש', // Subject line
    html: htmlTamplate,
  };
  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    // console.log(`Email sent: ${info.response}`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

// Gemini
const geminiTamplate = (data) => {
  const tamplate1 = `<div style="font-family: 'Alef', Arial, sans-serif; direction: rtl; text-align: right; line-height: 1.6; padding: 20px;">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Alef:wght@400;700&display=swap');
  </style>

  <h2 style="font-size: 20px; background: linear-gradient(to right, #2ecc71, #95dc4f); color: white; text-align: center; border-radius: 8px; margin: 0; padding: 10px;">
    הצטרפתם למשפחת Video-pro 😎
  </h2>

  <div style="display: flex; align-items: center; margin-top: 20px;">
    <div style="flex: 1;">
      ${data.name ? `<p style="margin: 10px; font-size: 14px;"><b>שם:</b> ${data.name}</p>` : ''}
      ${data.email ? `<p style="margin: 10px; font-size: 14px;"><b>אימייל:</b> ${data.email}</p>` : ''}
      ${data.age ? `<p style="margin: 10px; font-size: 14px;"><b>גיל:</b> ${data.age}</p>` : ''}
      ${data.gender ? `<p style="margin: 10px; font-size: 14px;"><b>מין:</b> ${data.gender}</p>` : ''}
      ${data.totalPrice ? `<p style="margin: 10px; font-size: 14px;"><b>סכום תשלום:</b> ₪${data.totalPrice}</p>` : ''}
      ${data.goals ? `<p style="margin: 10px; font-size: 14px;"><b>מטרות:</b> ${data.goals.join(', ')}</p>` : ''}
      ${data.message ? `<p style="margin: 10px; font-size: 14px;"><b>הודעה:</b> ${data.message}</p>` : ''}
    </div>

    <div style="margin-right: 50px; margin: 30px;">
      <img
        src="https://picsum.photos/seed/${Math.random()}/100/100"
        alt="User Image"
        style="
          width: 100px;
          height: 100px;
          border-radius: 15px;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
        "
      >
    </div>
  </div>

  <h3 style="margin: 16px;">
    נרגשים שאתם איתנו! 
    <br />
    צוות Video-pro
  </h3>
</div>`;

  const tamplate2 = `
    <div style="font-family: 'Alef', Arial, sans-serif; direction: rtl; text-align: right; line-height: 1.6; padding: 20px;">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Alef:wght@400;700&display=swap');
      </style>

      <h2 style="
        font-size: 24px;
        background: linear-gradient(to right, #4caf50, #8bc34a);
        color: white;
        text-align: center;
        border-radius: 8px;
        margin: 0;
        padding: 10px;
      "> חבר חדש נוסף לקהילה  🥳</h2>

      <h3 style="
        font-size: 20px;
        color: #333333;
        margin-bottom: 20px;">
      משתמש חדש נרשם לאתר:
      </h3>

      <div style="display: flex; align-items: center; margin-top: 20px;">
        <div style="flex: 1;">
          ${data.name ? `<p style="margin: 10px; font-size: 14px;"><b>שם:</b> ${data.name}</p>` : ''}
          ${data.email ? `<p style="margin: 10px; font-size: 14px;"><b>אימייל:</b> ${data.email}</p>` : ''}
          ${data.age ? `<p style="margin: 10px; font-size: 14px;"><b>גיל:</b> ${data.age}</p>` : ''}
          ${data.gender ? `<p style="margin: 10px; font-size: 14px;"><b>מין:</b> ${data.gender}</p>` : ''}
          ${data.totalPrice ? `<p style="margin: 10px; font-size: 14px;"><b>סכום תשלום:</b> ₪${data.totalPrice}</p>` : ''}
          ${data.goals ? `<p style="margin: 10px; font-size: 14px;"><b>מטרות:</b> ${data.goals.join(', ')}</p>` : ''}
          ${data.message ? `<p style="margin: 10px; font-size: 14px;"><b>הודעה:</b> ${data.message}</p>` : ''}
        </div>
      </div>
      <div>
        <h3 style="font-size: 16px; color: #333333; margin: 8px 0;">
        שמחים מאוד שהצטרפת אלינו,
        <br />
            צוות Video-Pro כאן כדי לתמוך בך בכל צעד בדרך להצלחה.
        </h3>
      <div>
    </div>
  `;

  return [tamplate1, tamplate2];
};

// GPT
const gptTamplates = (data) => {
  const tamplate1 = ` 
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Alef:wght@400;700&display=swap');
  </style>
    <div style="font-family: 'Alef', Arial, sans-serif; direction: rtl; text-align: right; line-height: 1.6; padding: 20px;">
      <h2 style="
        font-size: 20px:
        margin-bottom: 20px;">
        היי, משתמש חדש נרשם לאתר
      </h2>
      
      <div style="display: flex; align-items: flex-start;">  
        <div style="flex: 1;">
          ${data.name ? `<p style="font-size: 16px; margin: 8px 0;"><strong>שם:</strong> ${data.name}</p>` : ''}
          ${data.email ? `<p style="font-size: 16px; margin: 8px 0;"><strong>אימייל:</strong> ${data.email}</p>` : ''}
          ${data.age !== undefined ? `<p style="font-size: 16px; margin: 8px 0;"><strong>גיל:</strong> ${data.age}</p>` : ''}
          ${data.gender ? `<p style="font-size: 16px; margin: 8px 0;"><strong>מין:</strong> ${data.gender}</p>` : ''}
          ${data.totalPrice !== undefined ? `<p style="font-size: 16px; margin: 8px 0;"><strong>סכום תשלום:</strong> ₪${data.totalPrice}</p>` : ''}
          ${data.goals && data.goals.length > 0 ? `<p style="font-size: 16px; margin: 8px 0;"><strong>מטרות:</strong> ${data.goals.join(', ')}</p>` : ''}
          ${data.message ? `<p style="font-size: 16px; margin: 8px 0;"><strong>הודעה:</strong> ${data.message}</p>` : ''}
        </div>

        <div style="margin: 20px;" >
          <img src="https://picsum.photos/seed/picsum/100" alt="Random User" style="
          margin-right: 50px;
          border-radius: 8px;
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
          width: 100px;
          height: 100px;
          object-fit: cover;">
          </div>
      </div>

      <p style="font-size: 16px; margin: 8px 0;">בברכה,</p>
      <p style="font-size: 16px; margin: 8px 0;">הנהלת Video-Pro</p>
    </div>
    `;

  const tamplate2 = `
     <div style="font-family: 'Alef', Arial, sans-serif; direction: rtl; text-align: right; line-height: 1.6; padding: 20px;">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Alef:wght@400;700&display=swap');
      </style>

      <h2 style="
        font-size: 20px;
        background: linear-gradient(to right, #ff9800, #ff5722);
        color: #0f2c46;
        text-align: center;
        border-radius: 8px;
        margin: 0;
        padding: 10px;
      "> ברוך הבא לקהילה המדהימה שלנו! 🎉</h2>

      <div style="display: flex; align-items: center; margin-top: 20px;">
        <div style="flex: 1;">
          ${data.name ? `<p style="margin: 10px; font-size: 14px;"><b>שם:</b> ${data.name}</p>` : ''}
          ${data.email ? `<p style="margin: 10px; font-size: 14px;"><b>אימייל:</b> ${data.email}</p>` : ''}
          ${data.age ? `<p style="margin: 10px; font-size: 14px;"><b>גיל:</b> ${data.age}</p>` : ''}
          ${data.gender ? `<p style="margin: 10px; font-size: 14px;"><b>מין:</b> ${data.gender}</p>` : ''}
          ${data.totalPrice ? `<p style="margin: 10px; font-size: 14px;"><b>סכום תשלום:</b> ₪${data.totalPrice}</p>` : ''}
          ${data.goals ? `<p style="margin: 10px; font-size: 14px;"><b>מטרות:</b> ${data.goals.join(', ')}</p>` : ''}
          ${data.message ? `<p style="margin: 10px; font-size: 14px;"><b>הודעה:</b> ${data.message}</p>` : ''}
        </div>

        <div style="margin-right:20px ; margin: 20px">
          <img 
          src="https://picsum.photos/seed/${Math.random()}/100/100" 
          alt="User Image" 
          style="
            width: 100px;
            height: 100px;
            border-radius: 20px;
            box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
            margin-right: 20px;
          ">
        </div>
      </div>

      <h3 style="font-size: 16px; margin: 10px;">
       אנחנו נרגשים לקבל אותך לשורותינו!
       <br />
        צוות Video-Pro כאן ללוות אותך בכל שלב במסע שלך להצלחה.
      </h3>
    </div>`;
  return [tamplate1, tamplate2];
};
