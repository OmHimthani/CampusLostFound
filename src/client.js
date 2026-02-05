
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hbxshrkhvznjowzofdeq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhieHNocmtodnpuam93em9mZGVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3NjE1OTAsImV4cCI6MjA4NTMzNzU5MH0.wPQ8xvg7V_gQXyOX8t0xjcuMs3bOiZHuaSgPQ43sElU';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase
        