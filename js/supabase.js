import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://jhudhgyyqllganslxetg.supabase.co';

const SUPABASE_KEY = 'sb_publishable_Z8p928qmSWEQ_RzTj9RC5w_4DhI5ief';

export const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
