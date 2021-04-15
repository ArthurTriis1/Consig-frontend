import { GeoJsonObject } from 'geojson'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'

export type MapProps = {
  geojsonLayers: GeoJsonObject[]
}

const Map = ({ geojsonLayers }: MapProps) => (
  <MapContainer
    center={[0, 0]}
    zoom={3}
    style={{ height: '100%', width: '100%' }}
  >
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {geojsonLayers.map((layer, i) => (
      <GeoJSON data={layer} key={i}></GeoJSON>
    ))}
  </MapContainer>
)
export default Map
