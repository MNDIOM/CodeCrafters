// import React from 'react';
// import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

// const containerStyle = {
//   width: '100%',
//   height: '400px'
// };

// const center = {
//   lat: 40.7128, 
//   lng: -74.0060 
// };

// function MapComponent() {
  
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: import.meta.env.REACT_APP_GOOGLE_API_KEY 
//   });

//   if (loadError) return <div>Error loading maps</div>;
//   if (!isLoaded) return <div>Loading...</div>;

//   return (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={10}
//     >
//       <Marker position={center} />
//     </GoogleMap>
//   );
// }

// export default MapComponent;
