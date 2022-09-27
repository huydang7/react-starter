import { init, RematchDispatch, RematchRootState } from "@rematch/core";
import loadingPlugin, { ExtraModelsFromLoading } from "@rematch/loading";
import persistPlugin from "@rematch/persist";
import storage from "redux-persist/lib/storage";
import { models, RootModel } from "../models";

type FullModel = ExtraModelsFromLoading<RootModel, { type: "full" }>;

const persistConfig = {
  key: "root",
  storage,
  whitelist: [],
};

export const store = init<RootModel, FullModel>({
  plugins: [
    loadingPlugin({ type: "full" }),
    persistPlugin(persistConfig, {
      auth: {
        key: "auth",
        storage,
      },
    }) as any,
  ],
  models,
});
export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel, FullModel>;
