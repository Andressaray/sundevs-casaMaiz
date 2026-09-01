import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import {
  GlassBadge,
  GlassButton,
  GlassCard,
  GlassContainer,
  GlassInput,
} from "./glasscomponents";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0E27",
  },
  scrollContent: {
    padding: 16,
    paddingTop: 32,
  },
  backgroundGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "50%",
    backgroundColor: "#1E3A8A",
    opacity: 0.2,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.6)",
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  cardText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  containerText: {
    fontSize: 14,
    color: "#FFFFFF",
    marginBottom: 12,
    lineHeight: 20,
  },
  badgesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
});
export default function GlassDemo() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundGradient} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {}
        <Text style={styles.title}>Glass Morphism</Text>
        <Text style={styles.subtitle}>React Native Components</Text>
        {}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cards</Text>
          <GlassCard intensity="light" style={{ marginBottom: 12 }}>
            <Text style={styles.cardText}>Light Glass Card</Text>
          </GlassCard>
          <GlassCard intensity="medium" style={{ marginBottom: 12 }}>
            <Text style={styles.cardText}>Medium Glass Card</Text>
          </GlassCard>
          <GlassCard intensity="dark">
            <Text style={styles.cardText}>Dark Glass Card</Text>
          </GlassCard>
        </View>
        {}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Login Form</Text>
          <GlassInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={{ marginBottom: 12 }}
          />
          <GlassInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{ marginBottom: 16 }}
          />
          <GlassButton
            title="Sign In"
            onPress={() => console.warn("Sign in pressed")}
            intensity="dark"
          />
        </View>
        {}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Buttons</Text>
          <GlassButton
            title="Light Button"
            onPress={() => console.warn("Light pressed")}
            intensity="light"
            style={{ marginBottom: 12 }}
          />
          <GlassButton
            title="Medium Button"
            onPress={() => console.warn("Medium pressed")}
            intensity="medium"
            style={{ marginBottom: 12 }}
          />
          <GlassButton
            title="Dark Button"
            onPress={() => console.warn("Dark pressed")}
            intensity="dark"
          />
        </View>
        {}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Container</Text>
          <GlassContainer>
            <Text style={styles.containerText}>
              This is a glass container with more padding and radius
            </Text>
            <View style={styles.badgesRow}>
              <GlassBadge text="React Native" />
              <GlassBadge text="Glass UI" />
            </View>
          </GlassContainer>
        </View>
        {}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Badges</Text>
          <View style={styles.badgesRow}>
            <GlassBadge text="Light" intensity="light" />
            <GlassBadge text="Medium" intensity="medium" />
            <GlassBadge text="Dark" intensity="dark" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
