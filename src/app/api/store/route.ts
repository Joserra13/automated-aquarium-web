import { NextResponse } from 'next/server'
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function POST(request: Request){
    try {
        const formData = await request.formData();
        const firstName = formData.get('firstName') as string;
        const email = formData.get('email') as string;
        const body = formData.get('body') as string;
    
        if (!firstName || !email || !body) {
        return NextResponse.json({ success: false, error: 'All fields are required' }, { status: 400 });
        }

        const cetDate = new Date().toISOString();
        const cetTime = new Date().toLocaleTimeString('es-ES', { hour12: false });
        await sql`INSERT INTO contact (name, email, date, timestamp) VALUES (${firstName}, ${email}, ${cetDate}, ${cetTime})`;
    
        return NextResponse.json({ success: true });
    
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unexpected error occurred';
        return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
    }
}