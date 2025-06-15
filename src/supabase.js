import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://opmkvgvrrtdncyszmwwz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wbWt2Z3ZycnRkbmN5c3ptd3d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NjgxMjksImV4cCI6MjA2NDU0NDEyOX0.3FVIKnKd5xm_xJj7f2UbQRtPaUVfBSuF20QKg7Y61AQ';

const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
