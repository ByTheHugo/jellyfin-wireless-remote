import type { iSessionProvider } from "./iSessionProvider";

export class UserSession {
  private readonly provider: iSessionProvider;

  constructor(provider: iSessionProvider) {
    this.provider = provider
  }

  getSession(): string | null {
    return this.provider.getSession();
  }

  setSession(session: string): void {
    this.provider.setSession(session);
  }

  clearSession(): void {
    this.provider.clearSession();
  }

}
