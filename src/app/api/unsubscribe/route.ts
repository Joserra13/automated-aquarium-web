import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  const isValidEmail = (email: string | null) => {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isEmailValid = isValidEmail(email);

  if (!isEmailValid) {

    return NextResponse.redirect(new URL(`/unsubscribed?`, req.url));

  } else {
    try {

      const result = await sql`DELETE FROM newsletter WHERE email = ${email}`;
      if (result.count === 0) {
        return NextResponse.redirect(new URL(`/unsubscribed`, req.url));
      }


      const cetDate = new Date().toISOString();
      const cetTime = new Date().toLocaleTimeString('es-ES', { hour12: false });
      await sql`INSERT INTO unsuscribed_newsletter (email, date, timestamp) VALUES (${email}, ${cetDate}, ${cetTime})`;

      // Redirect the user to an empty page with a success message
      return NextResponse.redirect(new URL(`/unsubscribed?email=${email}`, req.url));

    } catch (error) {
      return NextResponse.redirect(new URL(`/unsubscribed`, req.url));
    }
  }


}