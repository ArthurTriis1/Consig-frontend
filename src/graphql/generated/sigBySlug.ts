/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: sigBySlug
// ====================================================

export interface sigBySlug_sigBySlug_Layers_geo_json_layers {
  __typename: "GeoJsonLayer";
  name: string | null;
  GeoJSON: any | null;
}

export interface sigBySlug_sigBySlug_Layers {
  __typename: "ComponentSigLayers";
  geo_json_layers: sigBySlug_sigBySlug_Layers_geo_json_layers[];
}

export interface sigBySlug_sigBySlug {
  __typename: "Sig";
  slug: string | null;
  Layers: sigBySlug_sigBySlug_Layers | null;
}

export interface sigBySlug {
  sigBySlug: sigBySlug_sigBySlug | null;
}

export interface sigBySlugVariables {
  slug?: string | null;
}
