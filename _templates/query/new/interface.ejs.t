---
to: src/interfaces/<%=h.changeCase.paramCase(name)%>.ts
---

import { ITimestamp, IPaginationQuery } from './base';

export interface I<%=h.changeCase.pascalCase(name)%> extends ITimestamp {
  id: string;
}

export interface IGet<%=h.changeCase.pascalCase(name)%>sQuery extends IPaginationQuery {}
