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
import {
  prettifyQueryManyResult,
  prettifyQueryResult,
  queryClient,
} from "shared/utils";

export const useGet<%=h.changeCase.pascalCase(name)%>s = (query: IGet<%=h.changeCase.pascalCase(name)%>sQuery) => {
  const resp = useQuery(
    ["get<%=h.changeCase.pascalCase(name)%>s", query],
    () => get<%= getManyName %>(query)
  );
  return prettifyQueryManyResult<I<%=h.changeCase.pascalCase(name)%>>(resp);
};

export const useGet<%=h.changeCase.pascalCase(name)%> = (id: string) => {
  const resp = useQuery(["get<%=h.changeCase.pascalCase(name)%>", id], () => get<%=h.changeCase.pascalCase(name)%>(id),
    {
      enabled: false,
    }
  );
  return prettifyQueryResult<I<%=h.changeCase.pascalCase(name)%>>(resp);
};

export const useCreate<%=h.changeCase.pascalCase(name)%> = () => {
  return useMutation(
    create<%=h.changeCase.pascalCase(name)%>,
    {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["get<%=h.changeCase.pascalCase(name)%>s"] });
      },
    }
  );
};

export const useUpdate<%=h.changeCase.pascalCase(name)%> = () => {
  return useMutation(
    (payload: {id:string, data:Partial<I<%=h.changeCase.pascalCase(name)%>>}) =>
      update<%=h.changeCase.pascalCase(name)%>(payload.id, payload.data),
    {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["get<%=h.changeCase.pascalCase(name)%>s"] });
      },
    }
  );
};

export const useDelete<%=h.changeCase.pascalCase(name)%> = () => {
  return useMutation(
    delete<%=h.changeCase.pascalCase(name)%>,
    {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["get<%=h.changeCase.pascalCase(name)%>s"] });
      },
    }
  );
};
