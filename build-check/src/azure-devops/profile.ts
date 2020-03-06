import { getHeaders } from "./authentication";

export interface User {
  id: string;
  displayName: string;
  emailAddress: string;
  domains: Array<string>;
  avatarUrl?: string;
}

export const getUser = async () => {
  const headers = await getHeaders();
  const profileResponse = await fetch(
    "https://vssps.dev.azure.com/axafrance/_apis/profile/profiles/me",
    { headers }
  );
  const profile = await profileResponse.json();

  console.log(profile);

  const domainsResponse = await fetch(
    `https://app.vssps.visualstudio.com/_apis/accounts?memberId=${profile.id}&api-version=5.1`,
    { headers }
  );

  const domains = await domainsResponse.json();
  console.log(domains);

  const user: User = {
    id: profile.id,
    displayName: profile.displayName,
    emailAddress: profile.emailAddress,
    domains: domains.value.map((t: any) => t.accountName)
  };
  console.log(user);
  const descriptorResponse = await fetch(
    `https://vssps.dev.azure.com/${user.domains[0]}/_apis/graph/descriptors/${user.id}`,
    { headers }
  );

  const descriptor = await descriptorResponse.json();

  user.avatarUrl = `https://vssps.dev.azure.com/${user.domains[0]}/_apis/graph/Subjects/${descriptor.value}/avatars?size=medium&format=png`;
  console.log(user.avatarUrl);

  return user;
};
