export interface FetchApiInput {
  urlPath: string;
  method: string;
  body?: string;
}

export function fetchBookletApi(input: FetchApiInput): Promise<Response> {
  const endpointUrl = `${process.env.NEXT_PUBLIC_BOOKLET_API_URL}${input.urlPath}`;
  console.log(endpointUrl);
  return fetch(endpointUrl, {
    method: input.method,
    body: input.body,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
}
