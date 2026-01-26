import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../GlobalStyles';

export const BookingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Metrics.padding,
  },
  title: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  bookingCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: Metrics.radius,
    padding: 15,
    marginBottom: Metrics.spacing,
    borderLeftWidth: 4,
  },
  activeBorder: {
    borderLeftColor: Colors.primary,
  },
  finishedBorder: {
    borderLeftColor: Colors.gray,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  address: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  detailsText: {
    color: Colors.gray,
    fontSize: 13,
    marginLeft: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    color: Colors.gray,
    fontSize: 16,
    marginTop: 10,
  }
});