/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UsersPermissionsLoginInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MutationLogin
// ====================================================

export interface MutationLogin_login_user_sigsCanView {
  __typename: "Sig";
  slug: string | null;
}

export interface MutationLogin_login_user_sigsCanEdit {
  __typename: "Sig";
  slug: string | null;
}

export interface MutationLogin_login_user {
  __typename: "UsersPermissionsMe";
  id: string;
  sigsCanView: MutationLogin_login_user_sigsCanView[];
  sigsCanEdit: MutationLogin_login_user_sigsCanEdit[];
}

export interface MutationLogin_login {
  __typename: "UsersPermissionsLoginPayload";
  jwt: string | null;
  user: MutationLogin_login_user;
}

export interface MutationLogin {
  login: MutationLogin_login;
}

export interface MutationLoginVariables {
  input: UsersPermissionsLoginInput;
}
