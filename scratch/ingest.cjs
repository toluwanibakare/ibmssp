const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Parse command line arguments or default
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://rihltpxgyocqqjbspmrw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpaGx0cHhneW9jcXFqYnNwbXJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY0MzQ4NzMsImV4cCI6MjEwMjAxMDg3M30.yFulpm8YToLXTnPCZ5XKNCL907nduJvS6n8JeX0Aglg'; 

const supabase = createClient(supabaseUrl, supabaseKey);

async function importCsv() {
  const csvPath = path.join(__dirname, '..', 'admin', 'members_registry_2026-08-11.csv');
  const fileContent = fs.readFileSync(csvPath, 'utf8');
  
  // Basic CSV Parser
  const lines = fileContent.split('\n').filter(line => line.trim() !== '');
  const headers = lines[0].split(',');
  
  console.log('Starting member ingestion...');
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    
    // Parse line respecting quotes
    const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
    const values = matches.map(val => val.replace(/^"|"$/g, '').trim());
    
    if (values.length < 8) continue;
    
    const rawMemberId = values[0];
    const firstName = values[1];
    const lastName = values[2];
    const email = values[3];
    const phone = values[4] === 'None' ? '' : values[4];
    const category = values[5];
    const regStatus = values[6];
    const paymentStatus = values[7];
    const gender = values[8] || null;
    const country = values[9] || 'Nigeria';
    const state = values[10] || null;
    const address = values[11] || null;
    const registeredDate = values[12];
    
    // Parse Date
    let parsedDate = new Date().toISOString();
    if (registeredDate) {
      const parts = registeredDate.split('/');
      if (parts.length === 3) {
        parsedDate = new Date(parts[2], parts[0] - 1, parts[1]).toISOString();
      }
    }

    try {
      // 1. Create the user in auth.users (this also logs them in)
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email,
        password: 'IBMSSP_User@2026!',
        options: {
          data: { full_name: `${firstName} ${lastName}`.trim() }
        }
      });

      if (authError) {
        if (authError.message.includes('already registered')) {
          console.log(`User ${email} already in auth.users, trying to insert member anyway...`);
        } else {
          console.error(`Error signing up ${email}: ${authError.message}`);
          continue;
        }
      }

      // 2. Insert into members table
      const dbCategory = category.toLowerCase();
      const { data: member, error: memberError } = await supabase
        .from('members')
        .insert({
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone,
          category: dbCategory,
          registration_status: regStatus === '1' ? 'approved' : 'pending',
          payment_status: paymentStatus === '1' ? 'completed' : 'pending',
          gender: gender,
          country: country,
          state: state,
          address: address,
          created_at: parsedDate
        })
        .select()
        .single();
        
      if (memberError) {
        console.error(`Error inserting ${email}:`, memberError.message);
        continue;
      }
      
      const memberId = member.member_id;
      
      // 2. Insert minimal Category Details to preserve foreign keys
      if (category === 'student') {
        await supabase.from('student_details').insert({
          member_id: memberId,
          institution_name: 'Unknown',
          course_of_study: 'Unknown'
        });
      } else if (category === 'graduate') {
        await supabase.from('graduate_details').insert({
          member_id: memberId,
          institution: 'Unknown',
          qualification: 'Unknown'
        });
      } else if (category === 'individual') {
        await supabase.from('professional_details').insert({
          member_id: memberId,
          profession: 'Practitioner'
        });
      } else if (category === 'organization') {
        await supabase.from('organization_details').insert({
          member_id: memberId,
          organization_name: firstName || 'Company Name',
          company_email: email,
          company_phone: phone
        });
      }
      
      console.log(`Ingested: ${firstName} ${lastName} (${email}) - ${rawMemberId} -> Mapped ID: IBMSSP-${String(memberId).padStart(5, '0')}`);
      
    } catch (e) {
      console.error(`Unexpected exception on line ${i}:`, e);
    }
  }
  
  console.log('Ingestion finished.');
}

importCsv();
