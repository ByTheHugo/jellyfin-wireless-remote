import { getUserApi } from '@jellyfin/sdk/lib/utils/api'
import { PasswordInput } from "@/components/ui/password-input";
import useJellyfin from "@/hooks/useJellyfin";
import { useJellyfinStore } from "@/stores/useJellyfinStore";
import { Field } from "@ark-ui/react";
import { Box, Flex, IconButton, Input, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiKey } from "react-icons/bi";
import * as z from 'zod';
import useJellyfinPlayback from '@/hooks/useJellyfinPlayback';

const LoginFormSchema = z.object({
  username: z.string().min(1).max(255),
  password: z.string().min(1).max(255),
})

export type LoginForm = z.infer<typeof LoginFormSchema>;
const INPUT_WITH = '280px';

const JellyfinUserLoginForm = () => {
  const [loading, setLoading] = useState(false);
  // TODO: Remove right now its here for test purposes
  const { playback } = useJellyfinPlayback();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<LoginForm>({
    defaultValues: {
      username: "",
      password: '',
    },
    resolver: zodResolver(LoginFormSchema),
    mode: 'onChange',
  })
  const { serverAddress } = useParams({ from: "/login/server/$serverAddress" });
  const { getApi } = useJellyfin();
  const store = useJellyfinStore();

  useEffect(() => {
    getApi(serverAddress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(data: LoginForm) {
    setLoading(true)
    try {
      // await getServers(data.hostUrl);
      if (!store.api) {
        throw Error("API is not set or failed to be set")
      }
      const auth = await getUserApi(store.api).authenticateUserByName({
        authenticateUserByName: { Username: data.username, Pw: data.password }
      });
      // [AI]
      if (auth.data.AccessToken) {
        // TODO: Make this prettier
        // Fetch all active sessions
        const res = await fetch(`http://192.168.50.66:8096/Sessions`, {
          headers: { "X-Emby-Token": auth.data.AccessToken }
        });

        const sessions = await res.json();
        console.log(sessions[1])
        // Find the session for this user
        const userSession = sessions[1];

        if (userSession) {
          playback(auth.data.AccessToken, userSession.Id, 'Pause');
        } else {
          console.log("No active session found for this user.");
        }
      }
      // [AI]
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return <form onSubmit={handleSubmit(onSubmit)} data-testid='JellyfinUserLoginForm'>
    <Flex direction='column' gap='3' alignItems='center'>
      <Box w={INPUT_WITH}>
        <Field.Root>
          <Field.Label>
            Username <Field.RequiredIndicator />
          </Field.Label>
          <Input type='text' placeholder="Type your username" {...register('username')} variant='outline' borderColor={!isValid && errors.username ? 'red' : 'inherit'} />
        </Field.Root>
        {!isValid && errors.username && <Text color='red.500' fontSize='sm' textAlign='center'>You must provide a valid username</Text>}

      </Box>
      <Box w={INPUT_WITH}>
        <Field.Root>
          <Field.Label>
            Password <Field.RequiredIndicator />
          </Field.Label>
          <PasswordInput placeholder="Type your password" {...register('password')} variant='outline' borderColor={!isValid && errors.password ? 'red' : 'inherit'} />
        </Field.Root>
        {!isValid && errors.username && <Text color='red.500' fontSize='sm' textAlign='center'>You must provide a valid password</Text>}
      </Box>
      <IconButton w={INPUT_WITH} disabled={!isValid} type="submit" loading={loading}>
        <BiKey />
        Login
      </IconButton>
    </Flex>
  </form>;
};

export default JellyfinUserLoginForm;
