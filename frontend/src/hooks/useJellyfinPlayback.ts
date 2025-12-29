export type Command =
  | "Stop"
  | "Pause"
  | "Unpause"
  | "NextTrack"
  | "PreviousTrack"
  | "Seek"
  | "Rewind"
  | "FastForward"
  | "PlayPause";
const useJellyfinPlayback = () => {
  async function playback(token: string, session: string, command: Command) {
    try {
      const res = await fetch(`http://192.168.50.66:8096/Sessions/${session}/Playing/${command}`, {
        method: 'POST',
        headers: {
          "X-Emby-Token": token
        }
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(JSON.stringify(error));
      }

      console.log("Playback stopped successfully!");
    } catch (err) {
      console.error("Failed to stop playback:", err);
    }
  }

  return { playback }
}
export default useJellyfinPlayback