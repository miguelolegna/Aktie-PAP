// src/screens/MapScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native'; // Hook de navegação
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { Colors } from '../styles/GlobalStyles';
import { MapScreenStyles, MapHtmlStyles } from '../styles/Screens/MapScreenStyles';

const MapScreen = () => {
  const [loading, setLoading] = useState(true);
  const [chargers, setChargers] = useState<any[]>([]);
  const navigation = useNavigation<any>(); // Instância da navegação

  // Região inicial (Lisboa)
  const initialRegion = { lat: 38.7369, lng: -9.1427, zoom: 14 };

  useEffect(() => {
    const fetchChargers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "chargers"));
        const data: any[] = [];
        querySnapshot.forEach((doc) => {
          const d = doc.data();
          let lat = null; let lng = null;
          
          if (d.localizacao && d.localizacao.latitude) { lat = d.localizacao.latitude; lng = d.localizacao.longitude; } 
          else if (d.latitude && d.longitude) { lat = d.latitude; lng = d.longitude; }

          if (lat && lng) {
            const isActive = d.is_active;
            data.push({ 
              id: doc.id, 
              lat: lat, lng: lng, 
              title: d.morada || "Carregador",
              power: d.potencia_kw || "?", 
              price: d.preco_kwh || "?", 
              type: d.tipo_tomada || "Type 2",
              status: isActive ? "Disponível" : "Indisponível",
              color: isActive ? Colors.primary : Colors.gray,
              rating: d.rating_medio || 0, 
              reviews: d.num_reviews || 0
            });
          }
        });
        setChargers(data);
      } catch (err) { console.error("Erro mapa:", err); } 
      finally { setLoading(false); }
    };
    fetchChargers();
  }, []);

  // Função para lidar com mensagens vindas do HTML (Bridge)
  const handleWebViewMessage = (event: any) => {
    const chargerId = event.nativeEvent.data;
    if (chargerId) {
        console.log("Navegar para detalhes do ID:", chargerId);
        navigation.navigate('ChargerDetails', { chargerId });
    }
  };

  const mapHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>${MapHtmlStyles}</style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var map = L.map('map', { zoomControl: false }).setView([${initialRegion.lat}, ${initialRegion.lng}], ${initialRegion.zoom});
          
          L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', { 
            attribution: '© OpenStreetMap', 
            maxZoom: 19 
          }).addTo(map);

          var chargers = ${JSON.stringify(chargers)};

          // DESIGN DO PINO COM RAIO (⚡)
          function getPinSvg(color) {
            return \`
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="44" height="44">
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="rgba(0,0,0,0.3)"/>
                </filter>
                
                <path 
                  fill="\${color}" 
                  filter="url(#shadow)" 
                  d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"
                />
                
                <path 
                  fill="white" 
                  d="M288 224H400L224 512V288H112L288 0V224z" 
                  transform="translate(75, 75) scale(0.45)"
                />
              </svg>
            \`;
          }

          function getStarsHtml(rating, reviews) {
            if (reviews === 0) return '<span class="new-badge">NOVO</span>';
            var stars = '';
            for (var i = 1; i <= 5; i++) { 
              stars += (rating >= i) ? '★' : '<span style="color:#e0e0e0">★</span>'; 
            }
            return '<div class="rating-row"><span class="stars">' + stars + '</span><span class="review-count">(' + reviews + ')</span></div>';
          }

          chargers.forEach(c => {
            var svgString = getPinSvg(c.color);
            var encodedSvg = encodeURIComponent(svgString);
            
            var myIcon = L.icon({
              iconUrl: 'data:image/svg+xml;charset=utf-8,' + encodedSvg,
              iconSize: [40, 52],
              iconAnchor: [20, 52],
              popupAnchor: [0, -55]
            });

            // NOVO: Adicionado onclick="window.ReactNativeWebView.postMessage(...)" no footer
            var popupContent = 
              '<div class="popup-header">' + c.title + '</div>' +
              '<div class="popup-body">' +
                getStarsHtml(c.rating, c.reviews) + 
                '<div class="info-row"><span class="info-label">Potência</span><span class="info-value">' + c.power + ' kW</span></div>' +
                '<div class="info-row"><span class="info-label">Preço</span><span class="info-value">' + c.price + ' €/kWh</span></div>' +
              '</div>' +
              '<div class="popup-footer" style="cursor: pointer;" onclick="window.ReactNativeWebView.postMessage(\\'' + c.id + '\\')">' +
                 '<span style="color: ' + c.color + '; flex: 1;">' + c.status + '</span>' +
                 '<span style="background-color: #00BFA5; color: white; padding: 4px 8px; border-radius: 4px; font-size: 10px;">VER ></span>' +
              '</div>';

            L.marker([c.lat, c.lng], { icon: myIcon }).addTo(map).bindPopup(popupContent);
          });
        </script>
      </body>
    </html>
  `;

  if (loading) return <View style={MapScreenStyles.center}><ActivityIndicator size="large" color={Colors.primary} /></View>;
  
  return (
    <View style={MapScreenStyles.container}>
      <WebView 
        source={{ html: mapHtml }} 
        style={{ flex: 1 }} 
        // LIGAÇÃO CRÍTICA: Recebe a mensagem do JS e executa a navegação
        onMessage={handleWebViewMessage}
      />
    </View>
  );
};

export default MapScreen;