import { JELLYFIN_ACCESS_TOKEN_KEY } from "@/constants/constants";
import type { iSessionProvider } from "./iSessionProvider";


export class LocalSession implements iSessionProvider {

  getSession(): string | null {
    const localSession = sessionStorage.getItem(JELLYFIN_ACCESS_TOKEN_KEY);
    if (!localSession) {
      return null;
    }
    return localSession;
  }
  setSession(session: string): void {
    sessionStorage.setItem(JELLYFIN_ACCESS_TOKEN_KEY, session);
  }
  clearSession(): void {
    sessionStorage.removeItem(JELLYFIN_ACCESS_TOKEN_KEY)
  }
}

