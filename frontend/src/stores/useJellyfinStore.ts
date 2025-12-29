import type { Api, RecommendedServerInfo } from "@jellyfin/sdk";
import { create } from "zustand";

interface JellyfinStore {
  serverList: null | Array<RecommendedServerInfo>
  setServerList: (serverList: Array<RecommendedServerInfo> | null) => void;
  api: Api | null;
  setApi: (address: Api | null) => void;

}

export const useJellyfinStore = create<JellyfinStore>((set) => ({
  serverList: null,
  setServerList: (serverList) => set({ serverList: serverList }),
  api: null,
  setApi: (address) => set({ api: address }),
}));