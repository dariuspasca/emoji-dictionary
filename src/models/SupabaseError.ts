// TODO: generate types automatically

interface SupabaseError {
  code: string;
  detail: string | null;
  hint: string | null;
  message: string;
}

export default SupabaseError;
