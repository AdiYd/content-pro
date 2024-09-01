import fs from 'fs';
import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import puppeteer from 'puppeteer';

import { sendEmail } from './email';

// Function to generate the HTML template for the invoice
const generateInvoiceTemplate = (data) => {
  const currentDate = new Date().toLocaleDateString('he-IL');
  const timeStamp = new Date().toLocaleTimeString('he-IL', {
    hour: '2-digit',
    minute: '2-digit',
  });
  data.businessName = data.businessName || 'Video-pro';
  data.businessID = data.businessID || '201432912';
  data.products = data.products || [{ name: 'קורס יצירת תוכן', price: data.totalPrice }];
  data.currency = data.currency || '₪';
  process.env.INVOICE_ID = Number(process.env.INVOICE_ID) + 1;

  const productRows = data.products
    .map(
      (product) => `
      <tr>
        <td>${product.name}</td>
        <td>${product.price} ${data.currency}</td>
      </tr>`
    )
    .join('');

  const vatAmount = data.vat ? (data.totalPrice * data.vat) / 100 : 0;
  const totalAmount = data.totalPrice;

  return `
    <!DOCTYPE html>
    <html lang="he">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>חשבונית עסקה</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Alef:wght@400;600;700&display=swap');

            body {
                direction: rtl;
                font-family: 'Alef','Arial', sans-serif;    
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                margin-top:20px;
                background-color: #f9f9f9;
                border-radius: 8px;
                // box-shadow: 0px 4px 8px rgba(0,0,0,0.2);
            }
            .headerTitle{
                color: #004080;
                font-weight: 600;
                margin-bottom: 14px;
                // text-decoration: underline;
            }
            h2 {
                text-align: center;
                background-color: #4caf50;
                background-image: linear-gradient(to right,#8bc34a, #4caf50, #8bc34a);
                color: white;
                padding: 10px;
                border-radius: 8px;
            }
            h4 {
                margin-bottom: 5px;
            }
            .section {
                border-bottom: 1px solid #ddd;
                padding-bottom: 10px;
                margin-bottom: 20px;
            }
            .signature {
                text-align: right;
                padding-top: 10px;
            }
            table {
                width: 100%;
                // border: 1px solid grey;
                border-collapse: collapse;
                padding: 8px;
                margin-bottom: 20px;
                box-shadow: 0 0 2px 0 rgba(0 0 0 / 0.2), 0 12px 24px -4px rgba(0 0 0 / 0.12);
            }
            th, td {
                border: 0.7px solid grey;
                padding: 8px;
            }
            th {
                background:  #e4f0f5;
            }
        </style>
    </head>
    <body>
            <h2>חשבונית עסקה מס' ${process.env.INVOICE_ID}</h2>

            <div class="section">
                <h4 class="headerTitle">פרטי העסק</h4>
                <div style="display: flex; justify-content: start; gap: 40px; margin: 0px 0px 10px 0px; padding: 0px;">
                    <p style="padding: 0px; margin: 0px;"><b>שם: </b> ${data.businessName}</p>
                    <p style="padding: 0px; margin: 0px;"><b>ח.פ: </b> ${data.businessID}</p>
                </div>
                <p><b>תאריך: </b> ${currentDate}   (${timeStamp})</p>
            </div>

            <div class="section">
                <h4 class="headerTitle">פרטי לקוח</h4>
                <p><b>שם מלא:</b> ${data.name}</p>
                <p><b>אימייל:</b> ${data.email}</p>
            </div>

            <div class="section">
                <h4 class="headerTitle">פרטי מוצרים</h4>
                <table>
                    <thead>
                        <tr>
                            <th>מוצר</th>
                            <th>מחיר</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${productRows}
                    </tbody>
                </table>
            
                ${
                  data.vat
                    ? `
                    <p><b>מחיר השירות:</b> ${(data.totalPrice - vatAmount).toFixed(2)} ${data.currency}</p>
                    <p><b>מע"מ (${data.vat}%):</b> ${vatAmount.toFixed(2)} ${data.currency}</p>`
                    : ''
                }
                <p><b>סכום כולל:</b> ${totalAmount.toFixed(2)} ${data.currency}</p>
            </div>

            <div class="signature">
                <p>תודה על הרכישה,</p>
                <p><b>${data.businessName}</b></p>
            </div>
    </body>
    </html>
  `;
};

// Function to create a PDF from the HTML template
const createPDF = async (htmlContent, outputPath) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  await page.pdf({ path: outputPath, format: 'A4', printBackground: true });
  await browser.close();
};

// Function to send the invoice email with the PDF attachment
export const sendInvoiceEmail = async (data) => {
  const pdfPath = path.join(process.cwd(), 'Invoice.pdf');
  const htmlContent = generateInvoiceTemplate(data);

  // Create the PDF from the HTML content
  await createPDF(htmlContent, pdfPath);

  const attachments = [
    {
      filename: 'invoice.pdf',
      path: pdfPath,
      contentType: 'application/pdf',
    },
  ];
  sendEmail({
    data,
    recipients: [data.email],
    title: 'ברוכים הבאים ל Video-Pro',
    attachments,
  }).finally(() => {
    fs.unlinkSync(pdfPath);
  });

  //   Configure the Nodemailer transporter
  //   const transporter = nodemailer.createTransport({
  //     service: 'gmail',
  //     auth: {
  //       user: 'your-email@gmail.com',
  //       pass: 'your-email-password',
  //     },
  //   });

  // Prepare the email options
  //   const mailOptions = {
  //     from: '"Your Business" <your-email@gmail.com>',
  //     to: data.email,
  //     subject: 'חשבונית עבור הרכישה שלך',
  //     text: 'תודה על הרכישה, מקווים שתהנה מהשירות שלנו.\nהחשבונית שלך מצורפת.',
  //     attachments: [
  //       {
  //         filename: 'invoice.pdf',
  //         path: pdfPath,
  //         contentType: 'application/pdf',
  //       },
  //     ],
  //   };

  // Send the email
  try {
    // await transporter.sendMail(mailOptions);
    // console.log('Invoice sent successfully!');
  } catch (error) {
    console.error('Error sending invoice:', error);
  } finally {
    // Remove the PDF file after sending
  }
};

// Example usage in a Next.js server component
// export default async function handler(req, res) {
//   const { name, email, totalPrice, vat, businessName, businessID, products, currency } = req.body;

//   const invoiceData = {
//     name,
//     email,
//     totalPrice,
//     vat,
//     businessName,
//     businessID,
//     products,
//     currency,
//   };

//   await sendInvoiceEmail(invoiceData);

//   res.status(200).json({ message: 'Invoice generated and sent successfully' });
// }