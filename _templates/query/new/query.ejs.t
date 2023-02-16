---
to: src/hooks/use<%=h.changeCase.pascalCase(name)%>Query.ts
---
<%
  getManyName = h.changeCase.pascalCase(name) + 's'
%>

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  create<%=h.changeCase.pascalCase(name)%>,
  get<%=h.changeCase.pascalCase(name)%>s,
  update<%=h.changeCase.pascalCase(name)%>,
  delete<%=h.changeCase.pascalCase(name)%>,
  get<%=h.changeCase.pascalCase(name)%>,
} from "apis/<%=h.changeCase.paramCase(name)%>";

import { I<%=h.changeCase.pascalCase(name)%> } from "interfaces/<%=h.changeCase.paramCase(name)%>";
import { prettifyQueryMany, prettifyResult, queryClient } from "shared/query";

export const useGet<%=h.changeCase.pascalCase(name)%>s = (query: any) => {
  const resp = useQuery(
    ["get<%=h.changeCase.pascalCase(name)%>s", query],
    () => get<%= getManyName %>(query),
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
  return prettifyQueryMany<I<%=h.changeCase.pascalCase(name)%>>(resp);
};

export const useGet<%=h.changeCase.pascalCase(name)%> = (query: any) => {
  const resp = useQuery(
    ["get<%=h.changeCase.pascalCase(name)%>"],
    () => get<%=h.changeCase.pascalCase(name)%>(query?.id),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      retry: false,
    }
  );
  return prettifyResult<I<%=h.changeCase.pascalCase(name)%>>(resp);
};

export const useCreate<%=h.changeCase.pascalCase(name)%> = () => {
  return useMutation(
    ["create<%=h.changeCase.pascalCase(name)%>"],
    (payload: Omit<I<%=h.changeCase.pascalCase(name)%>, "id">) => create<%=h.changeCase.pascalCase(name)%>(payload),
    {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries({ queryKey: ["get<%=h.changeCase.pascalCase(name)%>s"] });
      },
    }
  );
};

export const useUpdate<%=h.changeCase.pascalCase(name)%> = () => {
  return useMutation(
    ["update<%=h.changeCase.pascalCase(name)%>"],
    (payload: Partial<I<%=h.changeCase.pascalCase(name)%>> & { id: string }) =>
      update<%=h.changeCase.pascalCase(name)%>(payload.id, payload),
    {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries({ queryKey: ["get<%=h.changeCase.pascalCase(name)%>s"] });
      },
    }
  );
};

export const useDetele<%=h.changeCase.pascalCase(name)%> = () => {
  return useMutation(
    ["useDetele<%=h.changeCase.pascalCase(name)%>"],
    (payload: string) => delete<%=h.changeCase.pascalCase(name)%>(payload),
    {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries({ queryKey: ["get<%=h.changeCase.pascalCase(name)%>s"] });
      },
    }
  );
};
