---
to: src/apis/<%=h.changeCase.paramCase(name)%>.ts
---

import { stringify } from "qs";
import request from "services/request";

export const get<%=h.changeCase.pascalCase(name)%>s = (query: any) => {
  return request.get(`/v1/<%=h.changeCase.paramCase(name)%>?${stringify(query)}`);
};

export const get<%=h.changeCase.pascalCase(name)%> = (id: any) => {
  return request.get(`/v1/<%=h.changeCase.paramCase(name)%>/${id}`);
};

export const create<%=h.changeCase.pascalCase(name)%> = (payload: any) => {
  return request.post(`/v1/<%=h.changeCase.paramCase(name)%>`, payload);
};
export const update<%=h.changeCase.pascalCase(name)%> = (id: string, payload: any) => {
  return request.patch(`/v1/<%=h.changeCase.paramCase(name)%>/${id}`, payload);
};

export const delete<%=h.changeCase.pascalCase(name)%> = (id: string) => {
  return request.delete(`/v1/<%=h.changeCase.paramCase(name)%>/${id}`);
};
