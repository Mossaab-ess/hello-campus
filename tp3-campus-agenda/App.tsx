import React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
interface Evenement {
  id: string;
  titre: string;
  categorie: string;
  capacite: number;
  inscrits: number;
}
const evenements: Evenement[] = [
  { id: "E01", titre: "Atelier React", categorie: "Atelier", capacite: 25, inscrits: 25 },
  { id: "E02", titre: "Conférence IA", categorie: "Conférence", capacite: 70, inscrits: 52 },
  { id: "E03", titre: "Sécurité mobile", categorie: "Atelier", capacite: 20, inscrits: 17 },
  { id: "E04", titre: "Design UI", categorie: "Atelier", capacite: 18, inscrits: 9 },
  { id: "E05", titre: "Forum projets", categorie: "Rencontre", capacite: 50, inscrits: 49 },
  { id: "E06", titre: "Découverte Git", categorie: "Atelier", capacite: 24, inscrits: 24 }
];
const placesRestantes = (e: Evenement): number => {
  return Math.max(0, e.capacite - e.inscrits);};
const statutEvenement = (e: Evenement): string => {
  const r = placesRestantes(e);
  if (r === 0) {
    return "Complet";
  } else if (r >= 1 && r <= 3) {
    return "Presque complet";
  } else {
    return "Ouvert";
  }};
interface BadgeProps {
  statut: string;}
const BadgeEtat = ({ statut }: BadgeProps) => {
  let badgeStyle = styles.badgeOuvert;
  let textStyle = styles.textOuvert;
  if (statut === "Complet") {
    badgeStyle = styles.badgeComplet;
    textStyle = styles.textComplet;
  } else if (statut === "Presque complet") {
    badgeStyle = styles.badgePresque;
    textStyle = styles.textPresque;
  }
  return (
    <View style={[styles.badge, badgeStyle]}>
      <Text style={[styles.badgeText, textStyle]}>{statut}</Text>
    </View>
  );
};

interface CarteProps {
  evenement: Evenement;
}

const CarteEvenement = ({ evenement }: CarteProps) => {
  const restantes = placesRestantes(evenement);
  const statut = statutEvenement(evenement);

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{evenement.titre}</Text>
        <BadgeEtat statut={statut} />
      </View>
      <Text style={styles.cardCat}>{evenement.categorie}</Text>
      <Text style={styles.cardText}>Places restantes : {restantes}</Text>
    </View>
  );
};
interface BlocProps {
  libelle: string;
  valeur: number | string;
}
const BlocStatistique = ({ libelle, valeur }: BlocProps) => {
  return (
    <View style={styles.statBloc}>
      <Text style={styles.statLibelle}>{libelle}</Text>
      <Text style={styles.statValeur}>{valeur}</Text>
    </View>
  );
};
export default function App() {
  const mode: 'tous' | 'ateliers' = 'tous'; 
  const donneesAffichees = mode === 'tous' 
    ? evenements 
    : evenements.filter(e => e.categorie === 'Atelier' && placesRestantes(e) > 0);
  const totalEvenements = evenements.length;
  const totalPlacesRestantes = evenements.reduce((acc, e) => acc + placesRestantes(e), 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Campus Agenda</Text>
        <Text style={styles.headerSubtitle}>Événements du campus</Text>
      </View>

      <View style={styles.statsContainer}>
        <BlocStatistique libelle="Total Événements" valeur={totalEvenements} />
        <BlocStatistique libelle="Places Libres" valeur={totalPlacesRestantes} />
      </View>
      <Text style={styles.modeTitle}>
        Mode : {mode === 'tous' ? 'Tous les événements' : 'Ateliers disponibles'} ({donneesAffichees.length})
      </Text>
      <FlatList
        data={donneesAffichees}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CarteEvenement evenement={item} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Aucun événement disponible pour le moment.</Text>
        }
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 40,
  },
  header: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statBloc: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statLibelle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  statValeur: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0055ff',
  },
  modeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222',
    flex: 1,
    marginRight: 8,
  },
  cardCat: {
    fontSize: 13,
    color: '#777',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#444',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeComplet: {
    backgroundColor: '#ffe6e6',
  },
  textComplet: {
    color: '#d93838',
  },
  badgePresque: {
    backgroundColor: '#fff3e0',
  },
  textPresque: {
    color: '#e69500',
  },
  badgeOuvert: {
    backgroundColor: '#e8f8f0',
  },
  textOuvert: {
    color: '#10b981',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 30,
    fontSize: 16,
  },
});