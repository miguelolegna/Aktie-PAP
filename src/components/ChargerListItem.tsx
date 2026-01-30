import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { MyChargersStyles as styles } from '../styles/Screens/MyChargersStyles';
import { Colors } from '../styles/GlobalStyles';
import { getConnectorIcon } from '../utils/IconMapper';

interface ChargerListItemProps {
  charger: any;
  onDelete: () => void;
  onEdit: () => void;
}

const ChargerListItem = ({ charger, onDelete, onEdit }: ChargerListItemProps) => {
  const isActive = charger.is_active !== false;

  return (
    <View style={styles.card}>
      {/* Badge de Estado: Feedback visual imediato */}
      <View style={[
        styles.statusBadge, 
        { backgroundColor: isActive ? Colors.success : Colors.gray }
      ]}>
        <Text style={styles.statusText}>{isActive ? 'Ativo' : 'Pausado'}</Text>
      </View>

      {/* Miniatura da Imagem */}
      <Image 
        source={{ uri: charger.image_url || 'https://via.placeholder.com/150' }} 
        style={styles.imagePreview} 
      />

      {/* Informação Centralizada */}
      <View style={styles.infoContainer}>
        <Text style={styles.address} numberOfLines={1}>{charger.morada}</Text>
        
        <View style={styles.specRow}>
          <FontAwesome6 name="bolt" size={10} color={Colors.primary} />
          <Text style={styles.specText}>{charger.potencia_kw} kW</Text>
        </View>

        <View style={styles.specRow}>
          <FontAwesome6 name="euro-sign" size={10} color={Colors.gray} />
          <Text style={styles.specText}>{charger.preco_kwh} €/kWh</Text>
        </View>

        <View style={styles.specRow}>
          <View style={{ width: 12, alignItems: 'center' }}>
            {getConnectorIcon(charger.tipo_tomada, 12, Colors.gray)}
          </View>
          <Text style={styles.specText}>{charger.tipo_tomada}</Text>
        </View>
      </View>

      {/* Coluna de Ações: Separação lógica de funções */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={onEdit}>
          <Ionicons name="create-outline" size={22} color={Colors.primary} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]} 
          onPress={onDelete}
        >
          <Ionicons name="trash-outline" size={22} color={Colors.danger} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChargerListItem;