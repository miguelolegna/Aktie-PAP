import 'dotenv/config';
console.log("DEBUG: Chave detetada ->", process.env.GOOGLE_MAPS_API_KEY ? "SIM" : "NÃO");
export default {
  expo: {
    name: "Aktie",
    slug: "Aktie",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/logos/simpler_logo_vector.svg",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    extra: {
      eas: {
        projectId: "7896334b-67ff-4283-a517-e1dda62e27bd"
      }
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.miguell.aktie",
      config: {
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/logos/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.miguell.aktie", // Deve coincidir com a restrição na Google Cloud
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY
        }
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false
    },
    web: {
      favicon: "./assets/logos/adaptive-icon.png"
    },
    plugins: [
      "expo-video",
      "expo-asset",
      "expo-font",
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Permite que a Aktie aceda à tua localização para encontrar postos próximos."
        }
      ]
    ]
  }
};