# Contact Form API Documentation

## Overview
This document describes the API endpoint for handling contact form submissions from the FlexiBench website.

## Endpoint

**POST** `/api/contact`

## Request

### Headers
```
Content-Type: application/json
```

### Request Body

The API expects a JSON payload with the following structure:

```typescript
{
  type: "sales" | "demo",           // Required: Form type
  firstName: string,                // Required: User's first name
  lastName: string,                 // Required: User's last name
  email: string,                    // Required: User's email (must be valid format)
  phone: string | null,             // Optional: User's phone number
  company: string | null,           // Optional: User's company name
  message: string | null,           // Optional: User's message/inquiry
  timestamp: string                 // Required: ISO 8601 timestamp
}
```

### Field Details

| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| `type` | string | ✅ Yes | Must be "sales" or "demo" | Indicates the form type |
| `firstName` | string | ✅ Yes | Non-empty string | User's first name |
| `lastName` | string | ✅ Yes | Non-empty string | User's last name |
| `email` | string | ✅ Yes | Valid email format | User's email address |
| `phone` | string \| null | ❌ No | - | User's phone number |
| `company` | string \| null | ❌ No | - | User's company name |
| `message` | string \| null | ❌ No | - | User's message or inquiry |
| `timestamp` | string | ✅ Yes | ISO 8601 format | Submission timestamp |

### Example Request

```json
{
  "type": "sales",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1 (555) 123-4567",
  "company": "Acme Corporation",
  "message": "I'm interested in learning more about your data annotation platform for our AI training needs.",
  "timestamp": "2026-01-14T10:30:00.000Z"
}
```

## Response

### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Form submitted successfully",
  "data": {
    "id": "sales-1705233000000",
    "timestamp": "2026-01-14T10:30:00.000Z"
  }
}
```

### Error Responses

#### 400 Bad Request - Missing Required Fields
```json
{
  "error": "Missing required fields: firstName, lastName, and email are required"
}
```

#### 400 Bad Request - Invalid Email
```json
{
  "error": "Invalid email format"
}
```

#### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

## Server-Side Integration

### Current Implementation

The current API endpoint logs submissions to the console. For production use, you should implement one or more of the following:

### 1. Database Storage

Save submissions to your database for tracking and follow-up.

**Example with MongoDB:**
```typescript
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("flexibench");
const collection = db.collection("contact_submissions");

await collection.insertOne({
  ...body,
  createdAt: new Date(),
  status: "pending",
});
```

**Example with PostgreSQL:**
```typescript
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

await pool.query(
  `INSERT INTO contact_submissions 
   (type, first_name, last_name, email, phone, company, message, created_at)
   VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
  [
    body.type,
    body.firstName,
    body.lastName,
    body.email,
    body.phone,
    body.company,
    body.message,
    new Date(),
  ]
);
```

### 2. Email Notification

Send email notifications to your sales team.

**Example with SendGrid:**
```typescript
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

await sgMail.send({
  to: "sales@flexibench.com",
  from: "noreply@flexibench.com",
  subject: `New ${body.type} inquiry from ${body.firstName} ${body.lastName}`,
  html: `
    <h2>New Contact Form Submission</h2>
    <p><strong>Type:</strong> ${body.type}</p>
    <p><strong>Name:</strong> ${body.firstName} ${body.lastName}</p>
    <p><strong>Email:</strong> ${body.email}</p>
    <p><strong>Phone:</strong> ${body.phone || "Not provided"}</p>
    <p><strong>Company:</strong> ${body.company || "Not provided"}</p>
    <p><strong>Message:</strong></p>
    <p>${body.message || "No message provided"}</p>
  `,
});
```

**Example with Nodemailer:**
```typescript
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

await transporter.sendMail({
  from: '"FlexiBench Website" <noreply@flexibench.com>',
  to: "sales@flexibench.com",
  subject: `New ${body.type} inquiry from ${body.firstName} ${body.lastName}`,
  text: `
    New Contact Form Submission
    
    Type: ${body.type}
    Name: ${body.firstName} ${body.lastName}
    Email: ${body.email}
    Phone: ${body.phone || "Not provided"}
    Company: ${body.company || "Not provided"}
    Message: ${body.message || "No message provided"}
  `,
});
```

### 3. CRM Integration

Integrate with your CRM system.

**Example with HubSpot:**
```typescript
const hubspotClient = new HubSpotClient({
  accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
});

await hubspotClient.crm.contacts.basicApi.create({
  properties: {
    email: body.email,
    firstname: body.firstName,
    lastname: body.lastName,
    phone: body.phone,
    company: body.company,
    message: body.message,
    inquiry_type: body.type,
  },
});
```

**Example with Salesforce:**
```typescript
import jsforce from "jsforce";

const conn = new jsforce.Connection({
  loginUrl: process.env.SALESFORCE_LOGIN_URL,
});

await conn.login(
  process.env.SALESFORCE_USERNAME,
  process.env.SALESFORCE_PASSWORD
);

await conn.sobject("Lead").create({
  FirstName: body.firstName,
  LastName: body.lastName,
  Email: body.email,
  Phone: body.phone,
  Company: body.company,
  Description: body.message,
  LeadSource: `Website - ${body.type}`,
});
```

### 4. Slack Notification

Send notifications to Slack.

**Example:**
```typescript
await fetch(process.env.SLACK_WEBHOOK_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    text: `New ${body.type} inquiry from ${body.firstName} ${body.lastName}`,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*New Contact Form Submission*\n*Type:* ${body.type}\n*Name:* ${body.firstName} ${body.lastName}\n*Email:* ${body.email}\n*Company:* ${body.company || "N/A"}`,
        },
      },
    ],
  }),
});
```

## Environment Variables

Add these to your `.env.local` file based on your integration needs:

```env
# Database (choose one)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/flexibench
DATABASE_URL=postgresql://username:password@localhost:5432/flexibench

# Email Service (choose one)
SENDGRID_API_KEY=your_sendgrid_api_key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# CRM Integration (optional)
HUBSPOT_ACCESS_TOKEN=your_hubspot_token
SALESFORCE_LOGIN_URL=https://login.salesforce.com
SALESFORCE_USERNAME=your_username
SALESFORCE_PASSWORD=your_password_and_security_token

# Slack Notification (optional)
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

## Testing

### Using cURL

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "type": "sales",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1 (555) 123-4567",
    "company": "Acme Corp",
    "message": "Interested in your platform",
    "timestamp": "2026-01-14T10:30:00.000Z"
  }'
```

### Using Postman

1. Create a new POST request to `http://localhost:3000/api/contact`
2. Set header: `Content-Type: application/json`
3. Add the JSON body as shown in the example above
4. Send the request

## Security Considerations

1. **Rate Limiting**: Implement rate limiting to prevent spam
2. **CAPTCHA**: Consider adding reCAPTCHA for production
3. **Input Sanitization**: Sanitize all inputs before storing or sending
4. **CORS**: Configure CORS appropriately for your domain
5. **Honeypot Field**: Add hidden fields to catch bots

## Support

For questions or issues with the API, contact the development team.
