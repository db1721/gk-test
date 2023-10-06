import { createClient} from "@supabase/supabase-js";

// const supabaseUrl = process.env.VUE_APP_SUPABASE_URL;
// const supabaseKey = process.env.VUE_APP_SUPABASE_ANON_KEY;
const supabaseUrl = "https://supabase.com/dashboard/project/gcvcybahnjpzxtbvhusr";
const supabaseKey = "sbp_f0988040d9c70726aa8cc05a0bce5236ca4eedda"

console.log('url:', supabaseUrl)

export const supabase = createClient(supabaseUrl, supabaseKey);