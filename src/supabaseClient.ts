import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zpajnxdijdmfyijoqolm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwYWpueGRpamRtZnlpam9xb2xtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5NzY2MzAsImV4cCI6MjA4MTU1MjYzMH0.ShkbS1BF37CXKwec5PuW4oyWUtNy_y8K7SiFNRfdez8";

export const supabase = createClient(supabaseUrl, supabaseKey);
