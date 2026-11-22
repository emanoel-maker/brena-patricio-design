import { supabase } from './supabase.js';

export async function signUp(name, email, password) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: name
            }
        }
    });

    if (error) throw error;

    return data;
}

export async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) throw error;

    return data;
}

export async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
}

export async function getCurrentUser() {
    const { data, error } = await supabase.auth.getUser();

    if (error) throw error;

    return data.user;
}

export async function getUserProfile() {
    const user = await getCurrentUser();

    if (!user) return null;

    const { data, error } = await supabase
        .from('profiles')
        .select('full_name, role')
        .eq('user_id', user.id)
        .single();

    if (error) throw error;

    return data;
}

export async function signInWithGoogle() {
    return await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: 'https://emanoel-maker.github.io/brena-patricio-design/'
        }
    });
}
