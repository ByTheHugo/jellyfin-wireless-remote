export interface iSessionProvider {
  getSession: () => string | null;
  setSession: (session: string) => void;
  clearSession: () => void;
}