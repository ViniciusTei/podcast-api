import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

// Create a single supabase client for interacting with your database
const supabase = createClient('https://jklveowvlagblbzuiqco.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprbHZlb3d2bGFnYmxienVpcWNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE1NTg4MzEsImV4cCI6MjAwNzEzNDgzMX0.K58cqQIxdiL3hyPSQfCczKehmpkLKkms4UNAKPhvl4Y');

export default supabase;
