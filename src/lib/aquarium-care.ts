import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function getLatestWaterCare() {
  try {
    const result = await sql`SELECT * FROM aquariumcare`;
    return result;
  } catch (error) {
    console.error('Error fetching latest water care data:', error);
    return null;
  }
}