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

import { IGet<%=h.changeCase.pascalCase(name)%>sQuery, I<%=h.changeCase.pascalCase(name)%> } from "interfaces/<%=h.changeCase.paramCase(name)%>";
import { prettifyQueryMany, prettifyResult, queryClient } from "shared/query";

export const useGet<%=h.changeCase.pascalCase(name)%>s = (query: IGet<%=h.changeCase.pascalCase(name)%>sQuery) => {
  const resp = useQuery(
    ["get<%=h.changeCase.pascalCase(name)%>s", query],
    () => get<%= getManyName %>(query)
  );
  return prettifyQueryMany<I<%=h.changeCase.pascalCase(name)%>>(resp);
};

export const useGet<%=h.changeCase.pascalCase(name)%> = (id: string) => {
  const resp = useQuery(["get<%=h.changeCase.pascalCase(name)%>", id], () => get<%=h.changeCase.pascalCase(name)%>(id),
    {
      enabled: false,
    }
  );
  return prettifyResult<I<%=h.changeCase.pascalCase(name)%>>(resp);
};

export const useCreate<%=h.changeCase.pascalCase(name)%> = () => {
  return useMutation(
    (payload: Omit<I<%=h.changeCase.pascalCase(name)%>, "id">) => create<%=h.changeCase.pascalCase(name)%>(payload),
    {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["get<%=h.changeCase.pascalCase(name)%>s"] });
      },
    }
  );
};

export const useUpdate<%=h.changeCase.pascalCase(name)%> = () => {
  return useMutation(
    (payload: {id:string, <%=h.changeCase.camel(name)%>:Partial<I<%=h.changeCase.pascalCase(name)%>>}) =>
      update<%=h.changeCase.pascalCase(name)%>(payload.id, payload.<%=h.changeCase.camel(name)%>),
    {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["get<%=h.changeCase.pascalCase(name)%>s"] });
      },
    }
  );
};

export const useDelete<%=h.changeCase.pascalCase(name)%> = () => {
  return useMutation(
    (payload: string) => delete<%=h.changeCase.pascalCase(name)%>(payload),
    {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["get<%=h.changeCase.pascalCase(name)%>s"] });
      },
    }
  );
};
