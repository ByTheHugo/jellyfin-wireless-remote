import useJellyfin from "@/hooks/useJellyfin";
import { useParams } from "@tanstack/react-router";
import { useEffect } from "react";

const JellyfinUserLoginForm = () => {
  const { serverAddress } = useParams({ from: "/login/server/$serverAddress" });
  const { getApi } = useJellyfin();

  useEffect(() => {
    getApi(serverAddress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return <form data-testid='JellyfinUserLoginForm'>JellyfinUserLoginForm</form>;
};

export default JellyfinUserLoginForm;
