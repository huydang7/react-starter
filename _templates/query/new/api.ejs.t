---
to: src/apis/<%=h.changeCase.kebabCase(name)%>.ts
---
import { IGet<%=h.changeCase.pascalCase(name)%>sQuery, I<%=h.changeCase.pascalCase(name)%> } from "@/interfaces/<%=h.changeCase.paramCase(name)%>";
import { stringify } from "qs";
import request from "@/services/http";

export const get<%=h.changeCase.pascalCase(name)%>s = (query: IGet<%=h.changeCase.pascalCase(name)%>sQuery) => {
  return request.get(`/v1/<%=h.changeCase.paramCase(name)%>?${stringify(query)}`);
};

export const get<%=h.changeCase.pascalCase(name)%> = (id: string) => {
  return request.get(`/v1/<%=h.changeCase.paramCase(name)%>/${id}`);
};

export const create<%=h.changeCase.pascalCase(name)%> = (payload: Omit<I<%=h.changeCase.pascalCase(name)%>, "id">) => {
  return request.post(`/v1/<%=h.changeCase.paramCase(name)%>`, payload);
};
export const update<%=h.changeCase.pascalCase(name)%> = (id: string, payload: Partial<I<%=h.changeCase.pascalCase(name)%>>) => {
  return request.patch(`/v1/<%=h.changeCase.paramCase(name)%>/${id}`, payload);
};

export const delete<%=h.changeCase.pascalCase(name)%> = (id: string) => {
  return request.delete(`/v1/<%=h.changeCase.paramCase(name)%>/${id}`);
};
