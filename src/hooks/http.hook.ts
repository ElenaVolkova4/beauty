import { useCallback, useState } from "react";

// заранее известные значения, поэтому type
type HTTPRequestMethods = "GET" | "POST" | "PATCH" | "DELETE";

// заголовки - это объект, но неизвестно сколько может быть ключей, так что делаем interface через key или type через Record
interface HTTPHeaders {
  [key: string]: string;
}
// или можно создать через
// type HTTPHeaders2 = Record<string, string>;

interface RequestConfig {
  url: string;
  method?: HTTPRequestMethods;
  body?: string | null;
  headers?: HTTPHeaders;
}

export const useHttp = () => {
  const [loadingStatus, setLoadingStatus] = useState<string>("idle");

  // если в первоначальное значение нужно записать null, то пишем через или |
  //   const [error, setError] = useState<string | null>(null);
  //   если у нас есть интерфейс ошибки MyError, то можем обмануть компилятор, но берем ответственность на себя
  //   const [error2, setError2] = useState<MyError>({} as MyError);

  const request = useCallback(
    async ({
      url,
      method = "GET",
      body,
      headers = { "Content-Type": "application/json" },
    }: RequestConfig) => {
      setLoadingStatus("loading");

      try {
        const response = await fetch(url, { method, body, headers });

        if (!response.ok) {
          throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }

        const data = await response.json();

        setLoadingStatus("idle");
        return data;
      } catch (e) {
        setLoadingStatus("error");
        throw e;
      }
    },
    []
  );

  return { loadingStatus, request };
};
