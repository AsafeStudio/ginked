
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';

/**
 * Utilitário robusto para buscar variáveis de ambiente.
 * Verifica import.meta.env (Vite) e process.env (Node/Ambientes de IA).
 * Também lida com a presença ou ausência do prefixo 'VITE_'.
 */
const getEnvVar = (key: string): string => {
  const viteKey = `VITE_${key}`;
  
  // 1. Tenta import.meta.env (Vite)
  const metaEnv = (import.meta as any).env;
  if (metaEnv) {
    if (metaEnv[viteKey]) return metaEnv[viteKey];
    if (metaEnv[key]) return metaEnv[key];
  }

  // 2. Tenta process.env (Injeção de ambiente de IA/Node)
  const procEnv = (process as any).env;
  if (procEnv) {
    if (procEnv[viteKey]) return procEnv[viteKey];
    if (procEnv[key]) return procEnv[key];
  }

  return '';
};

const supabaseUrl = getEnvVar('SUPABASE_URL');
const supabaseAnonKey = getEnvVar('SUPABASE_ANON_KEY');

// Usamos fallbacks para evitar o crash 'supabaseUrl is required' durante o load inicial.
// Se as variáveis estiverem vazias, o app renderiza mas as chamadas de API falharão com erro 401.
const finalUrl = supabaseUrl || 'https://placeholder-id.supabase.co';
const finalKey = supabaseAnonKey || 'placeholder-key';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "GINKED_SYSTEM_ALERT: Credenciais Supabase não detectadas no ambiente.\n" +
    "Verifique seu arquivo .env e certifique-se de que as chaves VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY estão presentes."
  );
}

export const supabase = createClient(finalUrl, finalKey);
