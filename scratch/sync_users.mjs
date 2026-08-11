import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rihltpxgyocqqjbspmrw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpaGx0cHhneW9jcXFqYnNwbXJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY0MzQ4NzMsImV4cCI6MjEwMjAxMDg3M30.yFulpm8YToLXTnPCZ5XKNCL907nduJvS6n8JeX0Aglg';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function syncUsers() {
  console.log('Fetching members from the database...');
  const { data: members, error: fetchError } = await supabase
    .from('members')
    .select('*');

  if (fetchError) {
    console.error('Error fetching members:', fetchError);
    return;
  }

  console.log(`Found ${members.length} members. Syncing to auth.users...`);

  let successCount = 0;
  let alreadyExistsCount = 0;
  let errorCount = 0;

  for (const member of members) {
    if (!member.email) continue;
    
    // We assign a default secure password. 
    // They won't know it, so they MUST use "Forgot Password" to get an OTP and set their own.
    const { data, error } = await supabase.auth.signUp({
      email: member.email.trim(),
      password: 'IBMSSP_DefaultUser#2026!',
      options: {
        data: { full_name: `${member.first_name} ${member.last_name}`.trim() }
      }
    });

    if (error) {
      if (error.message.toLowerCase().includes('already registered')) {
        alreadyExistsCount++;
        console.log(`[SKIPPED] ${member.email} is already in auth.users.`);
      } else if (error.message.toLowerCase().includes('rate limit')) {
        console.log(`[RATE LIMIT] Hit rate limit on ${member.email}, waiting 5 seconds...`);
        errorCount++;
        // If we hit rate limits on signUp, it's problematic but let's pause
        await new Promise(res => setTimeout(res, 5000));
      } else {
        console.error(`[ERROR] Failed to add ${member.email}:`, error.message);
        errorCount++;
      }
    } else {
      console.log(`[SUCCESS] Added ${member.email} to auth.users.`);
      successCount++;
    }
  }

  console.log('--- SYNC COMPLETE ---');
  console.log(`Successfully Added: ${successCount}`);
  console.log(`Already Existed: ${alreadyExistsCount}`);
  console.log(`Errors: ${errorCount}`);
}

syncUsers();
