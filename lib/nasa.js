// Obtiene fotos del rover Curiosity
export async function getMarsPhotos(earthDate, page = 1) {
  const NASA_API = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${earthDate}&page=${page}&api_key=7LaBFkiLlQfJwdRgIg0Ux0so29Yrh8QdQLVQHB25
`;

  const response = await fetch(NASA_API);
  const data = await response.json();

  return data.photos.map((photo) => ({
    id: photo.id,
    sol: photo.sol,
    earthDate: photo.earth_date,
    camera: {
      id: photo.camera.id,
      name: photo.camera.name,
      fullName: photo.camera.full_name,
      roverId: photo.camera.rover_id,
    },
    rover: {
      id: photo.rover.id,
      name: photo.rover.name,
      landingDate: photo.rover.landing_date,
      launchDate: photo.rover.launch_date,
      status: photo.rover.status,
      maxSol: photo.rover.max_sol,
      maxDate: photo.rover.max_date,
      totalPhotos: photo.rover.total_photos,
    },
    imageUrl: photo.img_src,
  }));
}

// Obtiene información del rover Curiosity
export async function getRoverInfo() {
  const ROVER_API = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity?api_key=7LaBFkiLlQfJwdRgIg0Ux0so29Yrh8QdQLVQHB25
`;

  const response = await fetch(ROVER_API);
  const data = await response.json();

  return {
    id: data.rover.id,
    name: data.rover.name,
    landingDate: data.rover.landing_date,
    launchDate: data.rover.launch_date,
    status: data.rover.status,
    maxSol: data.rover.max_sol,
    maxDate: data.rover.max_date,
    totalPhotos: data.rover.total_photos,
    cameras: data.rover.cameras.map((camera) => ({
      id: camera.id,
      name: camera.name,
      fullName: camera.full_name,
      roverId: camera.rover_id,
    })),
  };
}