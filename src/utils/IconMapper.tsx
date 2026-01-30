import React from 'react';
import Type2Icon from '../components/icons/Type2Icon';
import CCS2Icon from '../components/icons/CCS2Icon';
import SchukoIcon from '../components/icons/SchukoIcon';
import CHAdeMOIcon from '../components/icons/CHAdeMOIcon';

/**
 * Função Mapper: Converte strings da DB em componentes visuais.
 * @param type Nome do conetor vindo da base de dados.
 * @param size Tamanho do ícone (default 24).
 * @param color Cor do ícone (default preto).
 */
export const getConnectorIcon = (type: string, size = 24, color = "#000") => {
  // Normalização para evitar erros de case-sensitivity
  const normalizedType = type?.trim();

  switch (normalizedType) {
    case 'Tipo 2':
      return <Type2Icon width={size} height={size} color={color} />;
    case 'CCS':
      return <CCS2Icon width={size} height={size} color={color} />;
    case 'Schuko':
      return <SchukoIcon width={size} height={size} color={color} />;
    case 'CHAdeMO':
      return <CHAdeMOIcon width={size} height={size} color={color} />;
    default:
      // Fallback para evitar crashes por dados nulos ou errados
      return <SchukoIcon width={size} height={size} color={color} />;
  }
};