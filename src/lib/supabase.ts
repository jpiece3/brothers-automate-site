import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nnxbgderdyjanzwgabxl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ueGJnZGVyZHlqYW56d2dhYnhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxODA3MzgsImV4cCI6MjA4NDc1NjczOH0.jpjZ_gH1-2GZgyhXPRzPrZzWWnJtAVgU4yui4KM6wZ8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
