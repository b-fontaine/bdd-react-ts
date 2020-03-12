import { getHeaders } from './authentication';

export interface User {
  id: string;
  displayName: string;
  emailAddress: string;
  domains: Array<string>;
  avatarUrl?: string;
}

const getDomains: (user: User) => Promise<Array<string>> = async (user) => {
  const domainsResponse = await fetch(
    `https://app.vssps.visualstudio.com/_apis/accounts?memberId=${user.id}&api-version=5.1`,
    { headers: await getHeaders() }
  );

  const result = await domainsResponse.json();
  return result.value.map((t: any) => t.accountName);
};

const getGravatar: (user: User) => Promise<string> = async (user) => {
  const descriptorResponse = await fetch(
    `https://vssps.dev.azure.com/${user.domains[0]}/_apis/graph/descriptors/${user.id}`,
    { headers: await getHeaders() }
  );

  const descriptor = await descriptorResponse.json();

  return `https://vssps.dev.azure.com/${user.domains[0]}/_apis/graph/Subjects/${descriptor.value}/avatars?size=medium&format=png`;
};

export const getUser: () => Promise<User> = async () => {
  const headers = await getHeaders();
  const profileResponse = await fetch(
    'https://vssps.dev.azure.com/_apis/profile/profiles/me',
    { headers }
  );
  const profile = await profileResponse.json();
  const user: User = {
    id: profile.id,
    displayName: profile.displayName,
    emailAddress: profile.emailAddress,
    domains: [], //domains.value.map((t: any) => t.accountName)
  };

  user.domains = await getDomains(user);

  const avatar = await getGravatar(user);

  if (avatar) {
    user.avatarUrl = avatar;
  }

  return user;
};
