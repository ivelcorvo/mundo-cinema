export const apiRequest = async<T=any, B=any>(
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
  body?: B,
  token?: string
): Promise<T> =>{
  const options = {
    method,
    headers: {"Content-type":"application/json"},
    body: (body) ?JSON.stringify(body) :undefined,
  };

  if(token){
    url += `${url.includes("?")?"&":"?"}auth=${token}`;
  }

  const res = await fetch(url,options);
  return res.json();
};

// <T = any>  | T é genérico e, por padrão, é any (qualquer coisa).
// Promise<T> | a função retorna uma promessa que resolve para o tipo T.