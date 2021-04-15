import { gql } from '@apollo/client'

export const QUERY_BY_SLUG = gql`
  query sigBySlug($slug: String) {
    sigBySlug(slug: $slug) {
      slug
      Layers {
        geo_json_layers {
          name
          GeoJSON
        }
      }
    }
  }
`
