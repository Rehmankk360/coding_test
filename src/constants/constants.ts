export const MOJANG_API_ENDPOINTS = {
  GET: {
    PROFILE: (username: string) =>
      `/users/profiles/minecraft/${username}` as const,
  },
} as const;

export const MINOTOR_API_ENDPOINTS = {
  GET: {
    PROFILE: (id: string) => `/avatar/user/${id}` as const,
  },
};
