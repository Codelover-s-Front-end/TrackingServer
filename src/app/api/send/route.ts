'use server'
import {NextResponse} from 'next/server';
import supabase from '@/supabase/supaBaseClient';

const RESEND_API_KEY = "re_cVJtjzSZ_DsCaehHbaMswjaaxbiiVzjPP";

export async function POST(req : Request, params : {
  action: string
}) {
  try {
    const formData = await req.formData();
    const from = formData.get("from")
    const to = formData.get("to")
    const subject = formData.get("subject")
    const html = formData.get("html")
    console.log(from)
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Acme <onboarding@resend.dev>",
        to: to,
        subject: subject,
        html: html
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while sending the email.' });
  }
}
